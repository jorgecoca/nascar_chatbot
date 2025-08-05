from langchain_core.tools import Tool, tool

@tool
def nascar_rag_tool(query: str, retrieve_chain) -> str:
  """Custom RAG tool"""
  result = retrieve_chain(query)
  if isinstance(result, str):
    return result
  elif isinstance(result, dict):
    return result.get("answer", str(result))
  else:
    return str(result)
