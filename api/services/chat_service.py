from http.client import HTTPException
from agent import Agent 
from langchain_core.messages import BaseMessage, HumanMessage, SystemMessage, ToolMessage

from models.agent_state import AgentState
from prompts.prompts import SYSTEM_PROMPT

class ChatService():
  def __init__(self, agent: Agent):
    self.agent = agent

  async def chat(self, user_message: str):
    try:
      system_message = SystemMessage(content=SYSTEM_PROMPT)
      user_message = HumanMessage(content=user_message)
      inputs = AgentState(
        query=user_message,
        current_messages=[system_message, user_message],
        memory=[],
        context={},
      )
      final_response = ""
      tool_calls = []
      final_current_messages = []

      if self.agent.graph:
        async for chunk in self.agent.graph.astream(inputs, stream_mode="updates"):
          for node, values in chunk.items():
              if "current_messages" in values:
                for msg in values["current_messages"]:
                  final_current_messages.append(msg)
                  # Extract tool calls if they exist in AssistantMessage
                  if hasattr(msg, "tool_calls") and msg.tool_calls:
                    tool_calls.extend(msg.tool_calls)
              if "response" in values:
                final_response = values["response"]
      return {
        "response": final_response,
        "messages": final_current_messages,
        "tool_calls": tool_calls,
      }
    except Exception as e:
      raise HTTPException(status_code=500, detail=f"Chat Service: {str(e)}")