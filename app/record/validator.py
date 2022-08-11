from sqlalchemy.orm import Session

from fastapi import HTTPException
from app.users.services import __get_role_by_email, __get_user_id_by_email
from app.users.schemas import Role
from app.users.models import UserAuth
from .models import UserRecord


async def verify_title_exist(title: str, db_session: Session):
    return db_session.query(UserRecord).filter(UserRecord.record_title == title).first()

#
# def check_user_record_access(user_email: str, username: str, database):
#     curr_role = __get_role_by_email(user_email, database)
#     curr_user_id = __get_user_id_by_email(user_email, database)
#     author = database.query(UserAuth).filter(UserAuth.username == username).first()
#
#     if curr_role == Role.applicant and curr_user_id != author.id:
#         raise HTTPException(
#             status_code=403,
#             detail=
#             "You must be the author of this record or have the 'admin' role to make changes to this record",
#         )
#     if curr_role == Role.hr:
#         raise HTTPException(
#             status_code=403,
#             detail="You must have the 'user' or 'admin' role to use this method.",
#         )
