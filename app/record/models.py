from app.core.database import Base
from sqlalchemy import Column, String, Integer, Text, ForeignKey, Float
from sqlalchemy.orm import relationship


class Record(Base):
    __tablename__ = "record"

    record_id = Column(Integer, primary_key=True, index=True, unique=True)
    rating = Column(Float)  # points(рейтинг)
    specialization = Column(String(100))
    review = Column(Text)
    company_name = Column(String(200))

    user_record = relationship("UserRecord", uselist=False, back_populates="record",
                               cascade="all, delete-orphan",
                               passive_deletes=True, )
    hr_record = relationship("HRRecord", uselist=False, back_populates="record")
    specialization_table = relationship("Specialization", uselist=False, back_populates="record")


class UserRecord(Base):
    __tablename__ = "user_record"

    id = Column(Integer, primary_key=True, index=True, unique=True)
    user_id = Column(Integer, ForeignKey('user.user_id', ondelete="SET NULL"), nullable=True)
    company_name = Column(String(200), ForeignKey('company.company_name'))
    record_id = Column(Integer, ForeignKey('record.record_id', ondelete="CASCADE"))
    record_title = Column(String(200), unique=True)

    record = relationship("Record", back_populates="user_record")
    user = relationship("User")
    company = relationship("Company")


class HRRecord(Base):
    __tablename__ = "hr_record"

    id = Column(Integer, primary_key=True, index=True, unique=True)
    hr_id = Column(Integer, ForeignKey('hr_user.hr_user_id', ondelete="SET NULL"), nullable=True)
    record_id = Column(Integer, ForeignKey('record.record_id', ondelete="CASCADE"))
    record_title = Column(String(200), unique=True)

    hr_user = relationship("HRUser")
    record = relationship("Record", back_populates="hr_record")


class Specialization(Base):
    __tablename__ = "specialization"

    id = Column(Integer, primary_key=True, index=True, unique=True)
    record_id = Column(Integer, ForeignKey('record.record_id', ondelete="CASCADE"))
    specialization = Column(String(100))
