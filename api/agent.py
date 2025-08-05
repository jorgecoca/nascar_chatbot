from models.agent_state import AgentState
from langchain_openai import ChatOpenAI
from tools.tavily_web_search import tavily_web_search_tool
from tools.nascar_rag_tool import nascar_rag_tool
from langchain_core.messages import ToolMessage
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode

class Agent():
  def __init__(self):
    self.tools = [tavily_web_search_tool, nascar_rag_tool]
    self.rag_llm_model = ChatOpenAI(model="gpt-4.1-nano")
    self.react_llm_model = ChatOpenAI(model="gpt-4.1-nano").bind_tools(self.tools)    
    self.graph = self._build_graph()

  def _build_graph(self):
    graph = StateGraph(AgentState, name="nascar-chatbot-agent")
    graph.add_node("agent", self._call_llm_node)
    graph.add_node("web_search", self._web_search_node)
    graph.add_node("custom_rag", self._custom_rag_node)
    graph.set_entry_point("agent")
    graph.add_conditional_edges("agent", self._should_continue)
    graph.add_edge("web_search", "agent")
    graph.add_edge("custom_rag", "agent")
    return graph.compile()

  def _should_continue(self, state: AgentState):
    current = state.get("current_messages", [])
    last_message = current[-1] if current else None
    if last_message and hasattr(last_message, "tool_calls"):
      for call in last_message.tool_calls:
        if call["name"] == "tavily_web_search":
          return "web_search"
        elif call["name"] == "custom_rag_tool":
          return "custom_rag"
    return END

  def _call_llm_node(self, state: AgentState):
    current_messages = state.get("current_messages", [])
    response = self.react_llm_model.invoke(current_messages)
    return {
      **state,
      "current_messages": [response],
      "response": response.content,
    }
  
  def _web_search_node(self, state: AgentState):
    query = state.get("query", "")
    result = tavily_web_search_tool.invoke(query.content)
    last_message = state.get("current_messages", [])[-1]
    tool_calls = getattr(last_message, "tool_calls", [])
    messages = [
      ToolMessage(
          tool_call_id=call["id"],
          content=result
      )
      for call in tool_calls
    ]
    return {
      **state,
      "current_messages": messages,
    }

  def _custom_rag_node(self, state: AgentState):
    query = state.get("query", "")
    result = nascar_rag_tool.invoke(query)
    last_message = state.get("current_messages", [])[-1]
    tool_calls = getattr(last_message, "tool_calls", [])
    messages = [
      ToolMessage(
          tool_call_id=call["id"],
          content=result
      )
      for call in tool_calls
    ]
    return {
      **state,
      "current_messages": messages,
    }  
    