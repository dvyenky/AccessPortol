from sqlalchemy import Column, Integer, String, Date, Text
from app.database import Base

class AccessRequest(Base):
    __tablename__ = "requests"

    id = Column(Integer, primary_key=True, index=True)
    employee_name = Column(String, index=True)
    request_title = Column(String)
    access_type = Column(String)
    reason = Column(Text)
    priority = Column(String)
    status = Column(String, default="PENDING")
    requested_date = Column(Date)
    admin_remarks = Column(Text, nullable=True)