# from sqlalchemy.orm import Session
# from users.models import UserAuth
# from .schemas import UserAuthModel
#
#
# def create_user(db: Session, item: UserAuthModel):
#     user_auth = UserAuth(**item.dict())
#     db.add(user_auth)
#     db.commit()
#     db.refresh(user_auth)
#     return user_auth
