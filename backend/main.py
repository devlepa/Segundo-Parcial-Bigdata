from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime
import models
import schemas
import crud
from database import get_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://ec2-18-234-101-246.compute-1.amazonaws.com:5173",  # Frontend Domain
        "http://localhost:5173",  # For local development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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


@app.get(
    "/check_availability/{film_title}", response_model=list[schemas.FilmAvailability]
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


@app.post("/rent_movie/", response_model=schemas.RentalOut)
def rent_movie(
    rental: schemas.RentalCreate,
    db: Session = Depends(get_db),
):
    """
    Endpoint para alquilar una película.
    Verifica si el inventario existe, si pertenece a la tienda y si no está alquilado.
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
        print(f"Error al alquilar la película: {str(e)}")  # Agregar un log detallado
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while renting the movie: {str(e)}",  # Incluir el error original
        )


@app.post("/return_movie/")
def return_movie(
    request: schemas.ReturnMovieRequest,
    db: Session = Depends(get_db),
):
    """
    Endpoint para devolver una película.
    Actualiza el registro de alquiler correspondiente y establece la fecha de devolución.
    """
    print(
        f"Solicitud recibida en /return_movie/: inventory_id={request.inventory_id}, customer_id={request.customer_id}"
    )

    # Verificar si existe un alquiler activo para el inventario y el cliente
    rental = (
        db.query(models.Rental)
        .filter(
            models.Rental.inventory_id == request.inventory_id,
            models.Rental.customer_id == request.customer_id,
            models.Rental.return_date == None,  # Alquiler activo (sin devolver)
        )
        .first()
    )
    if not rental:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No active rental found for the specified inventory and customer",
        )

    # Actualizar la fecha de devolución
    try:
        rental.return_date = datetime.utcnow()
        db.commit()
        db.refresh(rental)

        print(f"Película devuelta exitosamente: rental_id={rental.rental_id}")
        return {"message": "Movie returned successfully", "rental_id": rental.rental_id}
    except Exception as e:
        db.rollback()
        print(f"Error al devolver la película: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while returning the movie: {str(e)}",
        )
