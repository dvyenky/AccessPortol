from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json
import os

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

USERS_FILE = os.path.join(
    BASE_DIR,
    "data",
    "users.json"
)


class LoginRequest(BaseModel):
    userId: str
    password: str


@router.post("/login")
def login(data: LoginRequest):

    with open(USERS_FILE, "r") as file:
        users = json.load(file)

    user = next(
        (
            u for u in users
            if u["userId"] == data.userId
            and u["password"] == data.password
        ),
        None
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    return {
        "message": "Login successful",
        "user": {
            "userId": user["userId"],
            "role": user["role"]
        }
    }