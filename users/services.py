from . import models
from reviews_app.models import User, AdminUser, HRUser
from .models import UserAuth
from .schemas import Role
from typing import List
from core.utils import add_entity


async def new_user_register(request, database, role: Role) -> models.UserAuth:
    new_user = models.UserAuth(
        username=request.name,
        email=request.email,
        password=request.password,
        role=role
    )
    add_entity(database, new_user)

    if new_user.role == Role.admin:
        __add_superuser(database, new_user)

    if new_user.role == Role.applicant:
        __add_user(database, new_user)

    if new_user.role == Role.hr:
        __add_hr(database, new_user)
    return new_user


async def get_users(database) -> List[User]:
    users = database.query(User).all()
    return users


async def get_user(user_id, database) -> User:
    return database.query(User).get(user_id)


async def delete_user_by_id(user_auth_id, database):
    database.query(UserAuth).filter(UserAuth.id == user_auth_id).delete()
    database.commit()


def __add_user(database, received_user):
    user = User(user_id=received_user.id, user_name=received_user.username)
    add_entity(database, user)


def __add_superuser(database, received_user):
    superuser = AdminUser(admin_id=received_user.id, admin_name=received_user.username)
    add_entity(database, superuser)


def __add_hr(database, received_user):
    superuser = HRUser(hr_user_id=received_user.id, hr_name=received_user.username)
    add_entity(database, superuser)
