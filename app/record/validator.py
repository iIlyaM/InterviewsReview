from sqlalchemy.orm import Session

from .models import UserRecord


async def verify_title_exist(title: str, db_session: Session):
    return db_session.query(UserRecord).filter(UserRecord.record_title == title).first()
