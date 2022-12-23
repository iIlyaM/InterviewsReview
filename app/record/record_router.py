from fastapi import APIRouter, Depends, status, Response
from sqlalchemy.orm import Session

from app.core.utils import get_db
from app.auth.jwt import get_current_user
from app.users.schemas import CurrentUser
from app.users.services import check_user_access, check_admin_access
from . import schemas
from .services import *
from .validator import check_user_record_access

record_router = APIRouter(
    tags=['Users records']
)


@record_router.post('/{user_id}/{company_name}/{title}/record', status_code=status.HTTP_201_CREATED)
async def add_user_record(
        user_id: int,
        company_name: str,
        title: str,
        request: schemas.RecordModel,
        database: Session = Depends(get_db),
        # curr_user: EmailRecordModel = Depends(get_current_user)
):
    check_user_access("applicant", database)
    await check_title(title, database)
    return await create_user_record(user_id, company_name, title, request, database)


@record_router.get('/record/{title}', response_model=schemas.DisplayUserRecordModel)
async def get_user_record_by_title(
        title: str,
        database: Session = Depends(get_db),
):
    return await get_record_by_title(title, database)


@record_router.get('/record/{company}/records', response_model=List[schemas.DisplayUserRecordModel])
async def get_records_by_company_name(
        company: str,
        database: Session = Depends(get_db)
):
    return await get_records_by_com_name(company, database)


@record_router.get('/record', response_model=List[schemas.DisplayUserRecordModel])
async def get_all_records(
        database: Session = Depends(get_db)
):
    return await get_records(database)


@record_router.put('/item/{username}/{title}', response_model=schemas.UserRecordModel, status_code=status.HTTP_200_OK)
async def update_record(
        username: str,
        title: str,
        record: schemas.RecordModel,
        database: Session = Depends(get_db),
        curr_user: CurrentUser = Depends(get_current_user)
):
    check_user_record_access(curr_user.email, curr_user.role, username, database)
    return await update(username, title, record, database)


@record_router.delete(
    '/record/{id}',
    status_code=status.HTTP_204_NO_CONTENT,
    response_class=Response)
async def delete_record(
        id: int,
        database: Session = Depends(get_db),
        # curr_user: CurrentUser = Depends(get_current_user)
):
    # check_admin_access(curr_user.role, database)
    return await remove_record(id, database)
