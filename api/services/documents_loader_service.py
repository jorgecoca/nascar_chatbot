from langchain_community.document_loaders import DirectoryLoader
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_community.vectorstores import Qdrant
from langchain_core.prompts import ChatPromptTemplate
import tiktoken
from prompts.prompts import RAG_NASCAR_PROMPT
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.runnables import RunnablePassthrough
from operator import itemgetter
import tiktoken
from langchain.text_splitter import RecursiveCharacterTextSplitter

class DocumentsLoaderService:
  def __init__(self):
    directory_loader = DirectoryLoader("data", glob="**/*.pdf", loader_cls=PyMuPDFLoader)
    self.nascar_data = directory_loader.load()
    self.text_splitter = RecursiveCharacterTextSplitter(
      chunk_size=750,
      chunk_overlap=0,
      length_function=self.tiktoken_len,
    )
    self.chunks = self.text_splitter.split_documents(self.nascar_data)
    self.embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    self.vector_store = Qdrant.from_documents(
      self.chunks,
      self.embeddings,
      collection_name="NascarDocuments",
      location=":memory:",
    )
    self.naive_retriever = self.vector_store.as_retriever(search_kwargs={"k": 10})
    self.rag_prompt = ChatPromptTemplate.from_template(RAG_NASCAR_PROMPT)
    self.llm_model = ChatOpenAI(model="gpt-4.1-nano")
    self.naive_retrieval_chain = (
      {"context": itemgetter("question") | self.naive_retriever, "question": itemgetter("question")}
      | RunnablePassthrough.assign(context=itemgetter("context"))
      | {"response": self.rag_prompt | self.llm_model, "context": itemgetter("context")}
    )

  def get_nascar_data(self, query):
    self.naive_retrieval_chain.invoke({"question": query})

  def tiktoken_len(self, text):
    tokens = tiktoken.encoding_for_model("gpt-4o").encode(text)
    return len(tokens)