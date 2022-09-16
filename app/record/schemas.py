from pydantic import BaseModel, validator
from app.users.schemas import Role


class RatingValidatorModel(BaseModel):
    rating: float

    @validator('rating')
    def validate_rating(cls, value):
        if value > 5 or value < 0:
            raise ValueError("Rating must be between 0 and 5")
        return value


# class Specialization(BaseModel):
#     specialization: str


class BriefRecordModel(RatingValidatorModel):
    rating: float
    review: str

    class Config:
        orm_mode = True


class RecordModel(RatingValidatorModel):
    rating: float
    review: str
    specialization: str

    class Config:
        orm_mode = True


class UserRecordModel(BaseModel):
    record: BriefRecordModel

    class Config:
        orm_mode = True


class DisplayUserRecordModel(UserRecordModel):
    company_name: str
    record_title: str


class EmailRecordModel(RecordModel):
    email: str
    role: Role
