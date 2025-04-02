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
        "http://ec2-44-203-144-79.compute-1.amazonaws.com:5173",  # Dominio del frontend
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
    return {"message": "Welcome to the Actors API. Use /actors to interact with the actors data."}


@app.get("/actors/", response_model=list[schemas.ActorOut])
def read_actors(db: Session = Depends(get_db)):
    return crud.get_actors(db)


@app.post("/actors/", response_model=schemas.ActorOut)
def create_actor(actor: schemas.ActorCreate, db: Session = Depends(get_db)):
    return crud.create_actor(db, actor)

@app.get("/check_availability/{film_title}", response_model=List[schemas.FilmAvailability])
def check_availability(film_title: str, db: Session = Depends(get_db)):
    # Buscar la película por título
    film = db.query(models.Film).filter(models.Film.title == film_title).first()

    if not film:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Film not found")

    # Buscar inventarios relacionados con el film_id encontrado
    inventories = db.query(models.Inventory).filter(models.Inventory.film_id == film.film_id).all()

    if not inventories:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No inventories found for this film")

    availability = []

    for inventory in inventories:
        # Consultar la tienda donde se encuentra el inventario
        store = db.query(models.Store).filter(models.Store.store_id == inventory.store_id).first()

        if not store:
            continue

        # Verificar si el inventario está alquilado actualmente
        rental = db.query(models.Rental).filter(
            models.Rental.inventory_id == inventory.inventory_id,
            models.Rental.return_date == None
        ).first()

        is_rented = rental is not None

        availability.append({
            "film_id": film.film_id,
            "title": film.title,
            "inventory_id": inventory.inventory_id,
            "store_id": inventory.store_id,
            "store_location": store.store_id,  # Puedes agregar detalles de la tienda
            "is_rented": is_rented
        })

    return availability