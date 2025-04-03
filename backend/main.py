from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models
import schemas
import crud
import database
from models import *
from datetime import datetime
from typing import List

SessionLocal = database.SessionLocal
engine = database.engine
Base = database.Base


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://ec2-3-87-13-80.compute-1.amazonaws.com:5173",  # Dominio del frontend
        "http://localhost:5173",  # Para desarrollo local
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {
        "message": "Welcome to the Actors API. Use /actors to interact with the actors data."
    }


@app.get("/actors/", response_model=list[schemas.ActorOut])
def read_actors(db: Session = Depends(get_db)):
    return crud.get_actors(db)


@app.post("/actors/", response_model=schemas.ActorOut)
def create_actor(actor: schemas.ActorCreate, db: Session = Depends(get_db)):
    return crud.create_actor(db, actor)


@app.get("/check_film_exists/{film_title}")
def check_film_exists(film_title: str, db: Session = Depends(get_db)):
    film = db.query(models.Film).filter(models.Film.title == film_title).first()
    if film:
        return {"film_id": film.film_id, "title": film.title}
    else:
        return {"error": "Film not found"}


@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    """
    Endpoint para verificar la conexión con la base de datos.
    """
    try:
        # Intentar realizar una consulta simple
        db.execute("SELECT 1")
        return {"status": "ok", "message": "Database connection successful"}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Database connection error: {str(e)}"
        )


@app.get(
    "/check_availability/{film_title}", response_model=List[schemas.FilmAvailability]
)
def check_availability(film_title: str, db: Session = Depends(get_db)):
    try:
        # Buscar la película por título
        film = db.query(models.Film).filter(models.Film.title == film_title).first()

        if not film:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Film not found"
            )

        # Buscar inventarios relacionados con el film_id encontrado
        inventories = (
            db.query(models.Inventory)
            .filter(models.Inventory.film_id == film.film_id)
            .all()
        )

        if not inventories:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No inventories found for this film",
            )

        availability = []

        for inventory in inventories:
            # Consultar la tienda donde se encuentra el inventario
            store = (
                db.query(models.Store)
                .filter(models.Store.store_id == inventory.store_id)
                .first()
            )

            if not store:
                continue

            # Verificar si el inventario está alquilado actualmente
            rental = (
                db.query(models.Rental)
                .filter(
                    models.Rental.inventory_id == inventory.inventory_id,
                    models.Rental.return_date == None,
                )
                .first()
            )

            is_rented = rental is not None

            availability.append(
                {
                    "film_id": film.film_id,
                    "title": film.title,
                    "inventory_id": inventory.inventory_id,
                    "store_id": inventory.store_id,
                    "store_location": f"Store {store.store_id}",  # Convertimos a string
                    "is_rented": is_rented,
                }
            )

        return availability
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")


@app.post("/rent_movie/")
def rent_movie(
    inventory_id: int,
    customer_id: int,
    staff_id: int,
    db: Session = Depends(get_db),
):
    """
    Endpoint para alquilar una película.
    """
    print(
        f"Solicitud recibida en /rent_movie/: inventory_id={inventory_id}, customer_id={customer_id}, staff_id={staff_id}"
    )

    # Verificar si el inventario existe
    inventory = (
        db.query(models.Inventory)
        .filter(models.Inventory.inventory_id == inventory_id)
        .first()
    )
    if not inventory:
        print(f"Inventario no encontrado: inventory_id={inventory_id}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inventory not found",
        )

    # Verificar si la película ya está alquilada
    rental = (
        db.query(models.Rental)
        .filter(
            models.Rental.inventory_id == inventory_id,
            models.Rental.return_date == None,  # No ha sido devuelta
        )
        .first()
    )
    if rental:
        print(f"Película ya alquilada: inventory_id={inventory_id}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Movie is already rented",
        )

    # Crear un nuevo registro de alquiler
    try:
        new_rental = models.Rental(
            rental_date=datetime.utcnow(),
            inventory_id=inventory_id,
            customer_id=customer_id,
            staff_id=staff_id,
        )
        db.add(new_rental)
        db.commit()
        db.refresh(new_rental)

        print(f"Película alquilada exitosamente: rental_id={new_rental.rental_id}")
        return {
            "message": "Movie rented successfully",
            "rental_id": new_rental.rental_id,
            "rental_date": new_rental.rental_date,
        }
    except Exception as e:
        print(f"Error al alquilar la película: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while renting the movie.",
        )
