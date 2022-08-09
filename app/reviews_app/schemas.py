from pydantic import BaseModel
from app.record.schemas import RatingValidatorModel


class UserAuthModel(BaseModel):
    username: str
    email: str
    password: str
    is_admin: bool

    class Config:
        orm_mode = True


class UserModel(BaseModel):
    user_name: str

    class Config:
        orm_mode = True


class AdminUserModel(BaseModel):
    admin_name: str

    class Config:
        orm_mode = True


class HRUserModel(BaseModel):
    hr_name: str
    company_id: int

    class Config:
        orm_mode = True


class CompanyModel(RatingValidatorModel):
    company_name: str
    rating: float

    class Config:
        orm_mode = True


class HREmailModel(BaseModel):
    company_id: int
    email: str

    class Config:
        orm_mode = True
