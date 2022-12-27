from . import models
from app.reviews_app.models import User, AdminUser, HRUser
from .models import UserAuth
from .schemas import Role
from typing import List
from app.core.utils import add_entity
from fastapi import HTTPException
from .validator import verify_email_exist, verify_name_exist


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


async def get_user_auth(user_id, database):
    return database.query(UserAuth).get(user_id)

async def get_users_auth(database):
    return database.query(UserAuth).all()

async def delete_user_by_id(user_auth_id, database):
    database.query(UserAuth).filter(UserAuth.id == user_auth_id).delete()
    database.commit()


async def update_user_mail(user_id, new_email, database):
    user_auth = database.query(UserAuth).get(user_id)
    user_auth.email = new_email

    database.commit()
    return user_auth


def __add_user(database, received_user):
    user = User(user_id=received_user.id, user_name=received_user.username)
    add_entity(database, user)


def __add_superuser(database, received_user):
    superuser = AdminUser(admin_id=received_user.id, admin_name=received_user.username)
    add_entity(database, superuser)


def __add_hr(database, received_user):
    superuser = HRUser(hr_user_id=received_user.id, hr_name=received_user.username)
    add_entity(database, superuser)


async def check_email_name_unique(email: str, name: str, database):
    user = await verify_email_exist(email, database)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    user = await verify_name_exist(name, database)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this name already exists in the system.",
        )


def __get_role_by_email(user_email: str, database):
    return database.query(UserAuth).filter(UserAuth.email == user_email).first().role


def __get_user_id_by_email(user_email: str, database):
    return database.query(UserAuth).filter(UserAuth.email == user_email).first().id


def check_user_access(user_role: str, database):
    if user_role == Role.hr:
        raise HTTPException(
            status_code=403,
            detail="You must have the 'user' or 'admin' role to use this method.",
        )


def check_admin_access(user_role: str, database):

    if user_role != Role.admin:
        raise HTTPException(
            status_code=403,
            detail="You must have the 'admin' role to use this method.",
        )


def check_hr_access(user_role: str, database):
    if user_role == Role.applicant:
        raise HTTPException(
            status_code=403,
            detail="You must have the 'hr' or 'admin' role to use this method.",
        )

