from fastapi import APIRouter
from .endpoints.auth import router as auth_router
from .endpoints.task import router as task_router
from .endpoints.user import router as user_router
from .endpoints.comment import router as comment_router



api_router = APIRouter()
api_router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
api_router.include_router(task_router, prefix="/tasks", tags=["Tasks"])
api_router.include_router(user_router, prefix="/users", tags=["Users"])
api_router.include_router(comment_router, prefix="/comments", tags=["Comments"])




