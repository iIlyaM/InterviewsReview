from pydantic import BaseModel, constr, EmailStr
from enum import Enum


class Role(str, Enum):
    applicant = "applicant"
    admin = "admin"
    hr = "hr"


class User(BaseModel):
    name: constr(min_length=2, max_length=50)
    email: EmailStr
    password: str
    role: Role


class SuperUser(BaseModel):
    name: constr(min_length=2, max_length=50)
    email: EmailStr
    password: str
    role: Role = Role.admin


class DisplayUser(BaseModel):
    user_id: int
    user_name: str

    class Config:
        orm_mode = True
