from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import time
from predict import predict_review_sentiment
from model_loader import load_sentiment_model_and_tokenizer

app = FastAPI(
    title="CNN-LSTM IMDb Movie Review Sentiment API",
    description="Production-ready FastAPI backend serving Deep Learning CNN-LSTM model for IMDb movie review classification.",
    version="1.0.0"
)

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ReviewRequest(BaseModel):
    review: str = Field(..., example="This movie was absolutely fantastic! Great acting and storytelling.")

class SentimentResponse(BaseModel):
    prediction: str
    sentiment: str
    confidence: float
    probability: float
    processing_time: str
    model: str = "CNN-LSTM Deep Learning"

@app.on_event("startup")
def startup_event():
    """Load TensorFlow model and Tokenizer once at server startup."""
    load_sentiment_model_and_tokenizer()

@app.get("/")
def read_root():
    return {
        "message": "CNN-LSTM Sentiment Analysis API is running.",
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model_loaded": True,
        "framework": "TensorFlow / Keras / FastAPI"
    }

@app.post("/api/predict", response_model=SentimentResponse)
def predict_sentiment(request: ReviewRequest):
    if not request.review.strip():
        raise HTTPException(status_code=400, detail="Review text cannot be empty.")
    
    start_time = time.time()
    result = predict_review_sentiment(request.review)
    elapsed_ms = round((time.time() - start_time) * 1000, 2)
    
    return SentimentResponse(
        prediction=result["prediction"],
        sentiment=result["sentiment"],
        confidence=result["confidence"],
        probability=result["probability"],
        processing_time=f"{elapsed_ms} ms",
        model="CNN-LSTM"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
