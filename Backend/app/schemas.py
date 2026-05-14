from pydantic import BaseModel
from datetime import date
from typing import Optional


class RequestCreate(BaseModel):
    employee_name: str
    request_title: str
    access_type: str
    reason: str
    priority: str
    requested_date: date


class RequestUpdate(BaseModel):
    status: str
    admin_remarks: Optional[str] = None


class RequestResponse(BaseModel):
    id: int
    employee_name: str
    request_title: str
    access_type: str
    reason: str
    priority: str
    status: str
    requested_date: date
    admin_remarks: Optional[str]

    class Config:
        from_attributes = True