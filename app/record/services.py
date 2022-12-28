from typing import List

from fastapi import HTTPException
from sqlalchemy.sql import func
from app.reviews_app.models import Company, User
from .models import *
from .schemas import *
from .validator import verify_title_exist
from app.core.utils import add_entity


async def create_user_record(
        request,
        database
):
    record = Record(
        rating=request.rating,
        specialization=request.specialization,
        review=request.review
    )
    record.company_name = request.company_name
    add_entity(database, record)
    rec_id = database.query(Record).order_by(Record.record_id.desc()).first().record_id

    user_record = UserRecord(
        user_id=request.user_id,
        company_name=request.company_name,
        record_id=rec_id,
        record_title=request.record_title,
    )
    add_entity(database, user_record)
    __update_company_rating(request.company_name, database)


async def get_record_by_id(record_id: int, database):
    return database.query(UserRecord).filter(UserRecord.record_id == record_id).first()


async def get_record(record_id: int, database):
    return database.query(Record).filter(Record.record_id == record_id).first()


async def get_records_by_com_name(company_name: str, database):
    return database.query(UserRecord).filter(UserRecord.company_name == company_name).all()


async def get_records(database):
    users_records = database.query(UserRecord).join(User).all()
    return users_records


async def update(received_id: int, record: RecordModel, database):
    # user_id = database.query(User).filter(User.user_name == received_id).first().user_id
    # new_user_record = database \
    #     .query(UserRecord) \
    #     .filter(UserRecord.user_id == user_id) \
    #     .filter(UserRecord.record_title == received_title) \
    #     .first()

    updated_record = database \
        .query(Record) \
        .filter(Record.record_id == received_id) \
        .first()

    updated_record.rating = record.rating
    updated_record.specialization = record.specialization
    updated_record.review = record.review

    database.commit()
    __update_company_rating(updated_record.company_name, database)


async def remove_record(received_id: int, database):
    # record = database.query(UserRecord).filter(UserRecord.record_title == received_title).first().record_id
    database.query(Record).filter(Record.record_id == received_id).delete()
    database.commit()


async def check_title(title: str, database):
    record = await verify_title_exist(title, database)
    if record:
        raise HTTPException(
            status_code=400,
            detail="The user record with this title already exists in the system.",
        )


def __update_company_rating(company_name: str, database):
    new_rating = database \
        .query(func.avg(Record.rating).label('average')) \
        .filter(Record.company_name == company_name)

    database.query(Company) \
        .filter(Company.company_name == company_name) \
        .update({Company.rating: new_rating})
    database.commit()
