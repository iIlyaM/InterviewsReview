from fastapi import APIRouter

from app.record import record_router
from app.users import users_router
from app.auth import router

routes = APIRouter()

routes.include_router(router.router, prefix="/reviews")
routes.include_router(users_router.router, prefix="/reviews/users")
routes.include_router(record_router.record_router, prefix="/users/records")


