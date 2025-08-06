from typing import Annotated, Any, Dict, List, TypedDict, Optional
from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
  query: str
  response: str
  current_messages: Annotated[List[BaseMessage], add_messages]
