from sqlalchemy import Column, Integer, String, TIMESTAMP, DateTime, SmallInteger
from database import Base

class Actor(Base):
    __tablename__ = "actor"

    actor_id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(45), nullable=False)
    last_name = Column(String(45), nullable=False)
    last_update = Column(TIMESTAMP, nullable=False)

##
class Rental(Base):
    __tablename__ = 'rental'
    rental_id = Column(Integer, primary_key=True, index=True)
    rental_date = Column(DateTime)
    inventory_id = Column(Integer)
    customer_id = Column(SmallInteger)
    return_date = Column(DateTime, nullable=True)
    staff_id = Column(Integer)
    last_update = Column(TIMESTAMP)
