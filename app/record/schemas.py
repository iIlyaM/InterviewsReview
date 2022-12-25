from pydantic import BaseModel, validator
from app.users.schemas import Role, DisplayUser


class RatingValidatorModel(BaseModel):
    rating: float

    @validator('rating')
    def validate_rating(cls, value):
        if value > 5 or value < 0:
            raise ValueError("Rating must be between 0 and 5")
        return value


class RecordModel(RatingValidatorModel):
    rating: float
    specialization: str
    review: str

    class Config:
        orm_mode = True


class AddUserRecordModel(RecordModel):
    rating: float
    specialization: str
    review: str
    company_name: str
    record_title: str
    user_id: int

    class Config:
        orm_mode = True


class UserRecordModel(BaseModel):
    record: RecordModel

    class Config:
        orm_mode = True


class DisplayUserRecordModel(UserRecordModel):
    company_name: str
    record_title: str
    record_id: int
    user: DisplayUser

    class Config:
        orm_mode = True


class EmailRecordModel(RecordModel):
    email: str
    role: Role


class UserDataModel(BaseModel):
    email: str
    role: Role
    id: int
