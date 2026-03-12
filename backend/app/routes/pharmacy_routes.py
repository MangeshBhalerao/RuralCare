from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Medicine

router = APIRouter(prefix="/medicines", tags=["Medicines"])


class MedicineIn(BaseModel):
    name: str
    brand: str = ""
    category: str = ""
    dose: str = ""
    form: str = ""          # Tablet | Capsule | Syrup | Injection | Ointment …
    price: float = 0.0
    stock: int = 0
    min_stock: int = 20
    manufacturer: str = ""
    expiry: str = ""        # "YYYY-MM"
    prescription_required: bool = False


class MedicineOut(MedicineIn):
    id: int

    class Config:
        from_attributes = True


# List MUST come before /{id} to avoid FastAPI routing ambiguity
@router.get("/", response_model=list[MedicineOut])
def list_medicines(db: Session = Depends(get_db)):
    return db.query(Medicine).all()


@router.post("/", response_model=MedicineOut, status_code=201)
def create_medicine(data: MedicineIn, db: Session = Depends(get_db)):
    med = Medicine(**data.model_dump())
    db.add(med)
    db.commit()
    db.refresh(med)
    return med


@router.get("/{medicine_id}", response_model=MedicineOut)
def get_medicine(medicine_id: int, db: Session = Depends(get_db)):
    med = db.query(Medicine).filter(Medicine.id == medicine_id).first()
    if not med:
        raise HTTPException(status_code=404, detail="Medicine not found")
    return med


@router.put("/{medicine_id}", response_model=MedicineOut)
def update_medicine(medicine_id: int, data: MedicineIn, db: Session = Depends(get_db)):
    med = db.query(Medicine).filter(Medicine.id == medicine_id).first()
    if not med:
        raise HTTPException(status_code=404, detail="Medicine not found")
    for key, value in data.model_dump().items():
        setattr(med, key, value)
    db.commit()
    db.refresh(med)
    return med


@router.delete("/{medicine_id}", status_code=204)
def delete_medicine(medicine_id: int, db: Session = Depends(get_db)):
    med = db.query(Medicine).filter(Medicine.id == medicine_id).first()
    if not med:
        raise HTTPException(status_code=404, detail="Medicine not found")
    db.delete(med)
    db.commit()
