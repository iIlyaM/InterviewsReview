from sqlalchemy import Column, String, Integer, Enum
from sqlalchemy.orm import relationship
from core.database import Base
from core.security import verify_password, get_password_hash
from .schemas import Role


class UserAuth(Base):
    __tablename__ = "user_auth"

    id = Column(Integer, primary_key=True, index=True, unique=True)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    password = Column(String)
    role = Column(Enum(Role), default="applicant")

    user = relationship("User", uselist=False, back_populates="user_auth", passive_deletes=True)
    admin = relationship("AdminUser", uselist=False, back_populates="user_auth", passive_deletes=True)
    hr = relationship("HRUser", uselist=False, back_populates="user_auth", passive_deletes=True)

    def __init__(self, username, email, password, role, *args, **kwargs):
        self.username = username
        self.email = email
        self.password = get_password_hash(password)
        self.role = role

    def check_password(self, password):
        return verify_password(self.password, password)


