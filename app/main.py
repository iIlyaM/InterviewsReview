import uvicorn
from fastapi import FastAPI
from starlette.requests import Request
from starlette.responses import Response
from app.routes import routes

from app.core.database import SessionLocal

app = FastAPI(title="InterviewsReviewApp")


from fastapi.middleware.cors import CORSMiddleware
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = SessionLocal()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response


app.include_router(routes)

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8001)
