from typing import List

from fastapi import APIRouter, Depends, status, Response, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.core.utils import get_db
from . import schemas
from . import services
from . import validator
from .schemas import CreateUser
from app.auth.jwt import get_current_user

router = APIRouter(
    tags=['Users']
)


@router.post('/user', status_code=status.HTTP_201_CREATED)
async def create_user_registration(request: schemas.Applicant, database: Session = Depends(get_db)):
    await services.check_email_name_unique(request.email, request.name, database)
    new_user = await services.new_user_register(request, database, request.role)
    return new_user


@router.post('/superuser', status_code=status.HTTP_201_CREATED)
async def create_superuser(
        request: schemas.SuperUser,
        database: Session = Depends(get_db),
        curr_user: schemas.CurrentUser = Depends(get_current_user)
):
    services.check_admin_access(curr_user.role, database)
    await services.check_email_name_unique(request.email, request.name, database)
    new_user = await services.new_user_register(request, database, request.role)
    return new_user


@router.post('/superuser/new_user', status_code=status.HTTP_201_CREATED)
async def create_user_by_super_user(
        request: schemas.CreateUser,
        database: Session = Depends(get_db),
        # curr_user: schemas.CurrentUser = Depends(get_current_user)
):
    # services.check_admin_access(curr_user.role, database)
    await services.check_email_name_unique(request.email, request.name, database)
    new_user = await services.new_user_register(request, database, request.role)
    return new_user

# ,
#     dependencies=[Depends(get_current_user)]


@router.get('/', response_model=List[schemas.DisplayUser])
async def get_all_users(
        database: Session = Depends(get_db),
        # curr_user: schemas.CurrentUser = Depends(get_current_user)
):
    # services.check_user_access(curr_user.role, database)
    return await services.get_users(database)


@router.get('/{user_id}', response_model=schemas.DisplayUser)
async def get_user_by_id(
        user_id: int,
        database: Session = Depends(get_db),
        # curr_user: schemas.CurrentUser = Depends(get_current_user)
):
    # services.check_admin_access(curr_user.role, database)
    return await services.get_user(user_id, database)


@router.get('auth/{user_id}', response_model=schemas.DisplayUserAuth)
async def get_user_auth_by_id(
        user_id: int,
        database: Session = Depends(get_db),
        # curr_user: schemas.CurrentUser = Depends(get_current_user)
):
    # services.check_admin_access(curr_user.role, database)
    return await services.get_user_auth(user_id, database)


@router.get('/auth/users', response_model=List[schemas.DisplayUserAuth])
async def get_users_auth(
        database: Session = Depends(get_db),
        # curr_user: schemas.CurrentUser = Depends(get_current_user)
):
    # services.check_admin_access(curr_user.role, database)
    return await services.get_users_auth(database)


@router.delete('/{user_id}', status_code=status.HTTP_204_NO_CONTENT, response_class=Response)
async def remove_user_by_id(
        user_id: int,
        database: Session = Depends(get_db),
        # curr_user: schemas.CurrentUser = Depends(get_current_user)
):
    # services.check_admin_access(curr_user.role, database)
    return await services.delete_user_by_id(user_id, database)


@router.put('/{user_id}', status_code=status.HTTP_201_CREATED, response_model=schemas.UserEmailUpdate)
async def update_email(
        user_id: int,
        request: schemas.UserEmailUpdate,
        database: Session = Depends(get_db)
):
    # check_user_record_access(curr_user.email, curr_user.role, username, database)
    # updated_user:schemas.UserEmailUpdate = await services.update_user_mail(user_id, request.email, database)
    # print(jsonable_encoder(updated_user))
    return await services.update_user_mail(user_id, request.email, database)


@router.get('/me', response_model=schemas.DisplayCurrentUser)
async def get_current_user(curr_user: schemas.CurrentUser = Depends(get_current_user)):
    return await curr_user
