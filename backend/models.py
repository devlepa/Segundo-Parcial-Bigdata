from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime,
    TIMESTAMP,
    SmallInteger,
    Text,
    DECIMAL,
    Enum,
    Boolean,
    BLOB,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


class Actor(Base):
    __tablename__ = "actor"

    actor_id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(45), nullable=False)
    last_name = Column(String(45), nullable=False)
    last_update = Column(TIMESTAMP, nullable=False)


class Film(Base):
    __tablename__ = "film"

    film_id = Column(SmallInteger, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text)
    release_year = Column(Integer)
    language_id = Column(
        SmallInteger, ForeignKey("language.language_id"), nullable=False
    )
    original_language_id = Column(
        SmallInteger, ForeignKey("language.language_id"), nullable=True
    )
    rental_duration = Column(SmallInteger, nullable=False, default=3)
    rental_rate = Column(DECIMAL(4, 2), nullable=False, default=4.99)
    length = Column(SmallInteger)
    replacement_cost = Column(DECIMAL(5, 2), nullable=False, default=19.99)
    rating = Column(Enum("G", "PG", "PG-13", "R", "NC-17"))
    special_features = Column(String(255))  # Representamos el SET como String
    last_update = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    inventories = relationship("Inventory", back_populates="film")


class Inventory(Base):
    __tablename__ = "inventory"

    inventory_id = Column(Integer, primary_key=True, autoincrement=True)
    film_id = Column(SmallInteger, ForeignKey("film.film_id"), nullable=False)
    store_id = Column(SmallInteger, ForeignKey("store.store_id"), nullable=False)
    last_update = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    film = relationship("Film", back_populates="inventories")
    rentals = relationship("Rental", back_populates="inventory")
    store = relationship("Store", back_populates="inventories")


class Rental(Base):
    __tablename__ = "rental"

    rental_id = Column(Integer, primary_key=True, autoincrement=True)
    rental_date = Column(DateTime, nullable=False)
    inventory_id = Column(Integer, ForeignKey("inventory.inventory_id"), nullable=False)
    customer_id = Column(
        SmallInteger, ForeignKey("customer.customer_id"), nullable=False
    )
    return_date = Column(DateTime, nullable=True)
    staff_id = Column(SmallInteger, ForeignKey("staff.staff_id"), nullable=False)
    last_update = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    inventory = relationship("Inventory", back_populates="rentals")
    customer = relationship("Customer", back_populates="rentals")


class Store(Base):
    __tablename__ = "store"

    store_id = Column(SmallInteger, primary_key=True, autoincrement=True)
    manager_staff_id = Column(SmallInteger, unique=True, nullable=False)
    address_id = Column(SmallInteger, nullable=False)
    last_update = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    inventories = relationship("Inventory", back_populates="store")


class Customer(Base):
    __tablename__ = "customer"

    customer_id = Column(SmallInteger, primary_key=True, autoincrement=True)
    store_id = Column(SmallInteger, ForeignKey("store.store_id"), nullable=False)
    first_name = Column(String(45), nullable=False)
    last_name = Column(String(45), nullable=False)
    email = Column(String(50))
    address_id = Column(SmallInteger, nullable=False)
    active = Column(Boolean, nullable=False, default=True)
    create_date = Column(DateTime, nullable=False)
    last_update = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    rentals = relationship("Rental", back_populates="customer")


class Staff(Base):
    __tablename__ = "staff"

    staff_id = Column(SmallInteger, primary_key=True, autoincrement=True)
    first_name = Column(String(45), nullable=False)
    last_name = Column(String(45), nullable=False)
    address_id = Column(SmallInteger, nullable=False)
    picture = Column(BLOB, nullable=True)
    email = Column(String(50))
    store_id = Column(SmallInteger, ForeignKey("store.store_id"), nullable=False)
    active = Column(Boolean, nullable=False, default=True)
    username = Column(String(16), nullable=False)
    password = Column(String(40))
    last_update = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)


class Language(Base):
    __tablename__ = "language"

    language_id = Column(SmallInteger, primary_key=True, autoincrement=True)
    name = Column(String(20), nullable=False)
    last_update = Column(TIMESTAMP, nullable=False)
