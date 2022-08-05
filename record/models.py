from core.database import Base
from sqlalchemy import Column, String, Integer, Text, Boolean, ForeignKey, Float
from sqlalchemy.orm import relationship


class Record(Base):
    __tablename__ = "record"

    record_id = Column(Integer, primary_key=True, index=True, unique=True)
    rating = Column(Float())  # points(рейтинг)
    specialization = Column(String(100))
    review = Column(Text)

    user_record = relationship("UserRecord", uselist=False, back_populates="record")
    hr_record = relationship("HRRecord", uselist=False, back_populates="record")

    # def __init__(self, rating, specialization, review):
    #     self.rating = rating
    #     self.specialization = specialization
    #     self.review = review


class UserRecord(Base):
    __tablename__ = "user_record"

    user_id = Column(Integer, ForeignKey('user.user_id'), primary_key=True)
    company_name = Column(String(200), ForeignKey('company.company_name'))
    record_id = Column(Integer, ForeignKey('record.record_id'))
    record_title = Column(String(200))

    record = relationship("Record", back_populates="user_record")
    user = relationship("User")
    company = relationship("Company")


class HRRecord(Base):
    __tablename__ = "hr_record"

    hr_id = Column(Integer, ForeignKey('hr_user.hr_user_id'), primary_key=True)
    record_id = Column(Integer, ForeignKey('record.record_id'))
    record_title = Column(String(200))

    hr_user = relationship("HRUser")
    record = relationship("Record", back_populates="hr_record")
