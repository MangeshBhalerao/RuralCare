from sqlalchemy import Column, Integer, Boolean, String, Numeric, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from app.database import Base


# -------------------------
# User Table (Auth)
# -------------------------

class User(Base):
    __tablename__ = "users"

    id       = Column(Integer, primary_key=True, index=True)
    name     = Column(String, nullable=False)
    email    = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    role     = Column(String, default="patient")   # patient / doctor / pharmacy


# -------------------------
# Doctor Table
# -------------------------

class Doctor(Base):
    __tablename__ = "doctors"

    id            = Column(Integer, primary_key=True, index=True)
    name          = Column(String, nullable=False)
    qualification = Column(String, nullable=False)
    specialty     = Column(String, nullable=False)
    experience    = Column(Integer, default=0)
    fee           = Column(Numeric(10, 2), default=0)
    hospital      = Column(String, default="")
    city          = Column(String, default="")
    state         = Column(String, default="")
    phone         = Column(String, default="")
    email         = Column(String, default="")
    availability  = Column(String, default="Available")   # Available / Busy / On Leave
    consult_mode  = Column(String, default="Both")        # Video / In-Person / Both
    verified      = Column(Boolean, default=False)
    certificate   = Column(String, nullable=True)         # filename or URL


# -------------------------
# Patient Table
# -------------------------

class Patient(Base):
    __tablename__ = "patients"

    id             = Column(Integer, primary_key=True, index=True)
    user_id        = Column(Integer, ForeignKey("users.id"), nullable=True)
    name           = Column(String, nullable=False)
    age            = Column(Integer, nullable=True)
    gender         = Column(String, nullable=True)
    phone          = Column(String, nullable=True)
    blood_group    = Column(String, nullable=True)
    symptoms       = Column(JSONB, default=list)
    health_metrics = Column(JSONB, default=dict)
    health_records = Column(JSONB, default=list)
    prescriptions  = Column(JSONB, default=list)


# -------------------------
# Medicine Table
# -------------------------

class Medicine(Base):
    __tablename__ = "medicines"

    id                   = Column(Integer, primary_key=True, index=True)
    name                 = Column(String, nullable=False)
    brand                = Column(String, default="")
    category             = Column(String, default="Other")
    dose                 = Column(String, default="")
    form                 = Column(String, default="Tablet")
    price                = Column(Numeric(10, 2), default=0)
    stock                = Column(Integer, default=0)
    min_stock            = Column(Integer, default=20)
    manufacturer         = Column(String, default="")
    expiry               = Column(String, default="")     # stored as "YYYY-MM"
    prescription_required = Column(Boolean, default=False)
