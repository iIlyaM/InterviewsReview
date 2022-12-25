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


@record_router.post('/new_record', status_code=status.HTTP_201_CREATED)
async def add_user_record(
        request: schemas.AddUserRecordModel,
        database: Session = Depends(get_db),
        curr_user: UserDataModel = Depends(get_current_user)
):
    # check_user_access("applicant", database)
    # await check_title(title, database)
    return await create_user_record(request, database)


@record_router.get('/record/{record_id}', response_model=schemas.DisplayUserRecordModel)
async def get_user_record_by_id(
        record_id: int,
        database: Session = Depends(get_db),
):
    return await get_record_by_title(record_id, database)


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


@record_router.put('/updated_record/{record_id}', response_model=schemas.UserRecordModel, status_code=status.HTTP_200_OK)
async def update_record(
        record_id: int,
        record: schemas.RecordModel,
        database: Session = Depends(get_db),
        # curr_user: CurrentUser = Depends(get_current_user)
):
    # check_user_record_access(curr_user.email, curr_user.role, username, database)
    return await update(record_id, record, database)


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
