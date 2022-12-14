from fastapi import APIRouter, Depends, status, Response
from sqlalchemy.orm import Session

from core.utils import get_db

from . import schemas
from .services import *

record_router = APIRouter(
    tags=['Users records']
)


@record_router.post('/{user_id}/{company}/{title}/record', status_code=status.HTTP_201_CREATED)
async def add_user_record(
        user_id: int,
        company_name: str,
        title: str,
        request: schemas.RecordModel,
        database: Session = Depends(get_db)
):
    return await create_user_record(user_id, company_name, title, request, database)


@record_router.get('/record/{title}', response_model=schemas.DisplayUserRecordModel)
async def get_user_record_by_title(title: str, database: Session = Depends(get_db)):
    return await get_record_by_title(title, database)


@record_router.get('/record/{company}/records', response_model=List[schemas.DisplayUserRecordModel])
async def get_records_by_company_name(company_name: str, database: Session = Depends(get_db)):
    return await get_records_by_com_name(company_name, database)


@record_router.get('/record', response_model=List[schemas.DisplayUserRecordModel])
async def get_all_records(database: Session = Depends(get_db)):
    return await get_records(database)


@record_router.put('/item/{author}/{title}', response_model=schemas.UserRecordModel, status_code=status.HTTP_200_OK)
async def update_record(
        username: str,
        title: str,
        record: schemas.RecordModel,
        database: Session = Depends(get_db)):
    return await update(username, title, record, database)

# @record_router.delete(
#     '/{company}/{author}/{title}/record',
#     status_code=status.HTTP_204_NO_CONTENT,
#     response_class=Response)
# async def delete_record(
#         company: str,
#         title: str,
#         database: Session = Depends(get_db)):
#     return await remove_record(company, title, database)
