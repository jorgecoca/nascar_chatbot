import uvicorn
import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from agent import Agent
from services.chat_service import ChatService
from models.chat_request import ChatRequest

load_dotenv()
assert os.getenv("OPENAI_API_KEY"), "Missing OPENAI_API_KEY"
assert os.getenv("TAVILY_API_KEY"), "Missing TAVILY_API_KEY"

app = FastAPI(title="NASCAR Chatbot")

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

agent = Agent()
chat_service = ChatService(agent)

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.post("/api/chat")
async def chat(request: ChatRequest):
  try:
    return await chat_service.chat(request.user_message)
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Chat Endpoint: {str(e)}")

if __name__ == "__main__":
  uvicorn.run(app, host="0.0.0.0", port=8000)