from fastapi import APIRouter

from record import record_router
from users import users_router
from auth import router

routes = APIRouter()

routes.include_router(router.router, prefix="/reviews")
routes.include_router(users_router.router, prefix="/reviews/users")
routes.include_router(record_router.record_router, prefix="/users/records")


