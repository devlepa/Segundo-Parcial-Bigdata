from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime,
    Boolean,
    TIMESTAMP,
    SmallInteger,
    Text,
    DECIMAL,
    Enum,
)
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
import models, schemas
from database import get_db

app = FastAPI()


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
    special_features = Column(String(255))  # Reemplazo de SET por String
    last_update = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    inventories = relationship("Inventory", back_populates="film")
    language = relationship("Language", foreign_keys=[language_id])
    original_language = relationship("Language", foreign_keys=[original_language_id])


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
    customer_id = Column(Integer, ForeignKey("customer.customer_id"), nullable=False)
    return_date = Column(DateTime, nullable=True)
    staff_id = Column(Integer, ForeignKey("staff.staff_id"), nullable=False)
    last_update = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)


class Store(Base):
    __tablename__ = "store"

    store_id = Column(SmallInteger, primary_key=True, autoincrement=True)
    manager_staff_id = Column(SmallInteger, unique=True, nullable=False)
    address_id = Column(SmallInteger, nullable=False)
    last_update = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    inventories = relationship("Inventory", back_populates="store")


class Language(Base):
    __tablename__ = "language"

    language_id = Column(SmallInteger, primary_key=True, autoincrement=True)
    name = Column(String(20), nullable=False)
    last_update = Column(TIMESTAMP, nullable=False)


@app.post("/rent_movie/", response_model=schemas.RentalOut)
def rent_movie(
    rental: schemas.RentalCreate,
    db: Session = Depends(get_db),
):
    """
    Endpoint para alquilar una película.
    Verifica si el inventario existe, si pertenece a la tienda, si el cliente es válido y si el staff es válido.
    """
    print(
        f"Solicitud recibida en /rent_movie/: inventory_id={rental.inventory_id}, customer_id={rental.customer_id}, staff_id={rental.staff_id}, store_id={rental.store_id}"
    )

    # Verificar si el inventario existe y pertenece a la tienda especificada
    inventory = (
        db.query(models.Inventory)
        .filter(
            models.Inventory.inventory_id == rental.inventory_id,
            models.Inventory.store_id == rental.store_id,
        )
        .first()
    )
    if not inventory:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inventory not found or not available in the specified store",
        )

    # Verificar si el cliente existe
    customer = (
        db.query(models.Customer)
        .filter(models.Customer.customer_id == rental.customer_id)
        .first()
    )
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found",
        )

    # Verificar si el staff existe
    staff = (
        db.query(models.Staff).filter(models.Staff.staff_id == rental.staff_id).first()
    )
    if not staff:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Staff not found",
        )

    # Verificar si la película ya está alquilada
    rental_exists = (
        db.query(models.Rental)
        .filter(
            models.Rental.inventory_id == rental.inventory_id,
            models.Rental.return_date == None,  # No ha sido devuelta
        )
        .first()
    )
    if rental_exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Movie is already rented",
        )

    # Crear un nuevo registro de alquiler
    try:
        new_rental = models.Rental(
            rental_date=datetime.utcnow(),
            inventory_id=rental.inventory_id,
            customer_id=rental.customer_id,
            staff_id=rental.staff_id,
        )
        db.add(new_rental)
        db.commit()
        db.refresh(new_rental)

        return new_rental
    except Exception as e:
        db.rollback()
        print(f"Error al alquilar la película: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while renting the movie: {str(e)}",
        )
