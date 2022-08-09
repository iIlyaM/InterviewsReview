from typing import List

from fastapi import APIRouter, Depends, status, Response, HTTPException
from sqlalchemy.orm import Session

from core.utils import get_db
from . import schemas
from . import services
from . import validator
from auth.jwt import get_current_user
from .schemas import Role

router = APIRouter(
    tags=['Users']
)


@router.post('/user', status_code=status.HTTP_201_CREATED)
async def create_user_registration(request: schemas.Applicant, database: Session = Depends(get_db)):
    user = await validator.verify_email_exist(request.email, database)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )

    new_user = await services.new_user_register(request, database, request.role)
    return new_user


@router.post('/superuser', status_code=status.HTTP_201_CREATED)
async def create_superuser(request: schemas.SuperUser, database: Session = Depends(get_db)):
    user = await validator.verify_email_exist(request.email, database)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )

    new_user = await services.new_user_register(request, database, request.role)
    return new_user


@router.post('/superuser/new_user/{role}', status_code=status.HTTP_201_CREATED)
async def create_user_by_super_user(
        role: Role,
        request: schemas.BaseUser,
        database: Session = Depends(get_db)
):
    user = await validator.verify_email_exist(request.email, database)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )

    new_user = await services.new_user_register(request, database, role)
    return new_user

# ,
#     dependencies=[Depends(get_current_user)]


@router.get(
    '/',
    response_model=List[schemas.DisplayUser]
)
async def get_all_users(database: Session = Depends(get_db)):
    return await services.get_users(database)


@router.get('/{user_id}', response_model=schemas.DisplayUser)
async def get_user_by_id(user_id: int, database: Session = Depends(get_db)):
    return await services.get_user(user_id, database)


@router.delete('/{user_id}', status_code=status.HTTP_204_NO_CONTENT, response_class=Response)
async def remove_user_by_id(user_id: int, database: Session = Depends(get_db)):
    return await services.delete_user_by_id(user_id, database)
