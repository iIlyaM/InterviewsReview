from typing import Optional
from pydantic import BaseModel

from app.users.schemas import Role


class Login(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[Role] = None
