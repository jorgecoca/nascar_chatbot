import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="NASCAR Chatbot")

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
  uvicorn.run(app, host="0.0.0", port=8000)