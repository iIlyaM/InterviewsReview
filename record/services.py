from typing import List

from .models import *
# from .schemas import *
from core.utils import add_entity


async def create_user_record(received_id: int, request, database):
    record = Record(
        rating=request.record.rating,
        specialization=request.record.specialization,
        review=request.record.review
    )
    add_entity(database, record)

    rec_id = database.query(Record).order_by(Record.record_id.desc()).first().record_id

    user_record = UserRecord(
        user_id=received_id,
        company_name=request.company_name,
        record_id=rec_id,
        record_title=request.record_title,
    )
    add_entity(database, user_record)


async def get_records(database) -> List[UserRecord]:
    users_records = database.query(UserRecord).all()
    return users_records
