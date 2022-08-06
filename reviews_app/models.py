from sqlalchemy import Column, String, Integer, ForeignKey, Float
from sqlalchemy.orm import relationship
from core.database import Base
from users.models import UserAuth
from record.models import *


class User(Base):
    __tablename__ = "user"

    user_id = Column(Integer, ForeignKey('user_auth.id', ondelete="CASCADE"), primary_key=True)
    user_name = Column(String(100), unique=True)
    user_auth = relationship("UserAuth", back_populates="user")


class AdminUser(Base):
    __tablename__ = "admin"

    admin_id = Column(Integer, ForeignKey('user_auth.id', ondelete="CASCADE"), primary_key=True)
    admin_name = Column(String(100), unique=True)

    user_auth = relationship("UserAuth", back_populates="admin")


class HRUser(Base):
    __tablename__ = "hr_user"

    hr_user_id = Column(Integer, ForeignKey('user_auth.id'), primary_key=True)
    hr_name = Column(String(100), unique=True)
    company_id = Column(Integer, ForeignKey('company.company_id'))

    user_auth = relationship("UserAuth", back_populates="hr")


class Company(Base):
    __tablename__ = "company"

    company_id = Column(Integer, primary_key=True, index=True, unique=True)
    company_name = Column(String(200), unique=True)
    rating = Column(Float)  # points(рейтинг)
    # email_id = Column(Integer, ForeignKey('companies.id'))

    hr_users = relationship("HRUser")


class HREmail(Base):
    __tablename__ = "hr_email"

    email_id = Column(Integer, primary_key=True, index=True, unique=True)
    company_id = Column(Integer, ForeignKey('company.company_id'))
    email = Column(String, unique=True)

    company = relationship("Company")
