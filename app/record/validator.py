from sqlalchemy.orm import Session

from app.users.services import __get_role_by_email, __get_user_id_by_email
from app.users.schemas import Role
from .models import UserRecord


async def verify_title_exist(title: str, db_session: Session):
    return db_session.query(UserRecord).filter(UserRecord.record_title == title).first()


# def check_user_record_access(user_email: str, username: str, database):
#     curr_role = __get_role_by_email(user_email, database)
#     curr_user_id = __get_user_id_by_email(user_email, database)
#
#
#     if curr_role == Role.applicant:
#         if()
