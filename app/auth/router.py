from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.utils import get_db
from ..core import security
from app.users.models import UserAuth

from .jwt import create_access_token
from .schemas import Login

router = APIRouter(
    tags=['Auth']
)


@router.post('/login')
def login(request: Login, db: Session = Depends(get_db)):
    user = db.query(UserAuth).filter(UserAuth.email == request.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Invalid Credentials')

    if not security.verify_password(request.password, user.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Invalid Password')

    access_token = create_access_token(data={"sub": user.email})

    return {"access_token": access_token, "token_type": "bearer"}
