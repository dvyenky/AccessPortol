from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import AccessRequest
from app.schemas import (
    RequestCreate,
    RequestResponse,
    RequestUpdate
)

router = APIRouter(
    prefix="/requests",
    tags=["Requests"]
)


@router.post("/", response_model=RequestResponse)
def create_request(
    request: RequestCreate,
    db: Session = Depends(get_db)
):

    new_request = AccessRequest(
        employee_name=request.employee_name,
        request_title=request.request_title,
        access_type=request.access_type,
        reason=request.reason,
        priority=request.priority,
        requested_date=request.requested_date
    )

    db.add(new_request)
    db.commit()
    db.refresh(new_request)

    return new_request


@router.get("/", response_model=list[RequestResponse])
def get_requests(db: Session = Depends(get_db)):
    return db.query(AccessRequest).all()


@router.put("/{request_id}")
def update_request(
    request_id: int,
    update_data: RequestUpdate,
    db: Session = Depends(get_db)
):

    request = db.query(AccessRequest).filter(
        AccessRequest.id == request_id
    ).first()

    if not request:
        raise HTTPException(
            status_code=404,
            detail="Request not found"
        )

    request.status = update_data.status
    request.admin_remarks = update_data.admin_remarks

    db.commit()

    return {
        "message": "Request updated successfully"
    }