from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from core.utils import get_db

from . import schemas
from .services import *
record_router = APIRouter()


@record_router.post('/{user_id}/record', status_code=status.HTTP_201_CREATED)
async def add_user_record(user_id: int, request: schemas.UserRecordModel, database: Session = Depends(get_db)):
    return await create_user_record(user_id, request, database)


@record_router.get('/record', response_model=List[schemas.UserRecordModel])
async def get_all_records(database: Session = Depends(get_db)):
    return await get_records(database)
