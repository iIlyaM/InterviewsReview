from fastapi import APIRouter, Response, status

docker_router = APIRouter()


@docker_router.get("/healthcheck")
async def get(request, response_class=Response):
    return status.HTTP_200_OK
