from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

from app.routers import requests, auth, analytics

app = FastAPI(title="Access Portal API")

# -----------------------
# CORS CONFIG
# -----------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------
# CREATE DATABASE TABLES
# -----------------------
Base.metadata.create_all(bind=engine)

# -----------------------
# ROUTES
# -----------------------
app.include_router(auth.router)
app.include_router(requests.router)
app.include_router(analytics.router)

# -----------------------
# ROOT TEST
# -----------------------
@app.get("/")
def root():
    return {"message": "Access Portal API is running"}