from typing import Optional

from pydantic import BaseModel, constr, EmailStr, validator
from enum import Enum


class Role(str, Enum):
    applicant = "applicant"
    admin = "admin"
    hr = "hr"


class BaseUser(BaseModel):
    name: constr(min_length=2, max_length=50)
    email: EmailStr
    password: str


class Applicant(BaseUser):
    role: Role = Role.applicant

    @validator('role')
    def set_role(cls, role):
        return Role.applicant


class SuperUser(BaseUser):
    role: Role = Role.admin


class DisplayUser(BaseModel):
    user_id: int
    user_name: str

    class Config:
        orm_mode = True
