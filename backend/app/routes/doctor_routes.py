from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Doctor

router = APIRouter(prefix="/doctors", tags=["Doctors"])


class DoctorIn(BaseModel):
    name: str
    qualification: str
    specialty: str
    experience: int = 0
    fee: float = 0.0
    hospital: str = ""
    city: str = ""
    state: str = ""
    phone: str = ""
    email: str = ""
    availability: str = "Available"   # Available | Busy | On Leave
    consult_mode: str = "Both"        # Video | In-Person | Both
    verified: bool = False
    certificate: Optional[str] = None


class DoctorOut(DoctorIn):
    id: int

    class Config:
        from_attributes = True


@router.get("/", response_model=list[DoctorOut])
def list_doctors(db: Session = Depends(get_db)):
    return db.query(Doctor).all()


@router.post("/", response_model=DoctorOut, status_code=201)
def create_doctor(data: DoctorIn, db: Session = Depends(get_db)):
    doc = Doctor(**data.model_dump())
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc


@router.get("/{doctor_id}", response_model=DoctorOut)
def get_doctor(doctor_id: int, db: Session = Depends(get_db)):
    doc = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return doc


@router.put("/{doctor_id}", response_model=DoctorOut)
def update_doctor(doctor_id: int, data: DoctorIn, db: Session = Depends(get_db)):
    doc = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Doctor not found")
    for key, value in data.model_dump().items():
        setattr(doc, key, value)
    db.commit()
    db.refresh(doc)
    return doc


@router.delete("/{doctor_id}", status_code=204)
def delete_doctor(doctor_id: int, db: Session = Depends(get_db)):
    doc = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Doctor not found")
    db.delete(doc)
    db.commit()
