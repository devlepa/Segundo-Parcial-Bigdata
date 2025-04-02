from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, TIMESTAMP, SmallInteger
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Actor(Base):
    __tablename__ = "actor"

    actor_id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(45), nullable=False)
    last_name = Column(String(45), nullable=False)
    last_update = Column(TIMESTAMP, nullable=False)

##
class Film(Base):
    __tablename__ = 'film'

    film_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    description = Column(String)
    release_year = Column(Integer)
    language_id = Column(Integer, ForeignKey('language.language_id'))
    rental_duration = Column(Integer)
    rental_rate = Column(Integer)
    length = Column(Integer)
    replacement_cost = Column(Integer)
    rating = Column(String(10))
    special_features = Column(String(100))
    last_update = Column(DateTime, default=datetime.utcnow)

    inventories = relationship("Inventory", back_populates="film")


class Inventory(Base):
    __tablename__ = 'inventory'

    inventory_id = Column(Integer, primary_key=True, index=True)
    film_id = Column(Integer, ForeignKey('film.film_id'))
    store_id = Column(Integer, ForeignKey('store.store_id'))
    last_update = Column(DateTime, default=datetime.utcnow)

    film = relationship("Film", back_populates="inventories")
    rentals = relationship("Rental", back_populates="inventory")
    store = relationship("Store", back_populates="inventories")


class Rental(Base):
    __tablename__ = 'rental'

    rental_id = Column(Integer, primary_key=True, index=True)
    rental_date = Column(DateTime, default=datetime.utcnow)
    inventory_id = Column(Integer, ForeignKey('inventory.inventory_id'))
    customer_id = Column(Integer)
    return_date = Column(DateTime, nullable=True)
    staff_id = Column(Integer)
    last_update = Column(DateTime, default=datetime.utcnow)

    inventory = relationship("Inventory", back_populates="rentals")


class Store(Base):
    __tablename__ = 'store'

    store_id = Column(Integer, primary_key=True, index=True)
    manager_staff_id = Column(Integer)
    address_id = Column(Integer)
    last_update = Column(DateTime, default=datetime.utcnow)

    inventories = relationship("Inventory", back_populates="store")
