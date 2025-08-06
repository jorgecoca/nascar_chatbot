from langchain_core.tools import Tool, tool

from services.documents_loader_service import DocumentsLoaderService

nascar_rag = DocumentsLoaderService()
print("NASCAR data loaded:", len(nascar_rag.nascar_data), "documents.")

@tool
def nascar_rag_tool(query: str) -> str:
  """Custom RAG tool with NASCAR information about its rules and schedule."""
  result = nascar_rag.get_nascar_data(query)
  if isinstance(result, str):
    return result
  elif isinstance(result, dict):
    return result.get("answer", str(result))
  else:
    return str(result)
