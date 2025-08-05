import os
from langchain_core.tools import Tool
from langchain_tavily import TavilySearch

def _tavily_search(query: str, max_results: int = 5) -> str:
  _client = TavilySearch(api_key=os.environ.get("NEXT_PUBLIC_TAVILY_KEY"))
  results = _client.search(query=query, max_results=max_results)
  if not results["results"]:
      return "No results were found for your query when using Tavily."
  summaries = []
  for index, result in enumerate(results["results"]):
      title = result.get("title", "Untitled")
      url = result.get("url", "No URL")
      snippet = result.get("content", result.get("snippet", "No content available."))
      summaries.append(f"{index + 1}. {title}\n{snippet}\nSource: {url}")
  return "\n\n".join(summaries)

tavily_web_search_tool = Tool.from_function(
  func=_tavily_search,
  name="tavily_web_search",
  description="Search the web using Tavily. This is very helpful for finding " \
  "recent information that is not included in the training data of the model.",
)
