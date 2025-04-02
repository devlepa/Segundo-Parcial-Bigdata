    from fastapi import FastAPI, Depends
    from fastapi.middleware.cors import CORSMiddleware
    from sqlalchemy.orm import Session
    import models, schemas, crud, database
    from models import Rental
    from datetime import datetime

    SessionLocal = database.SessionLocal 
    engine = database.engine 
    Base = database.Base 

    Base.metadata.create_all(bind=engine)

    app = FastAPI()



    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://ec2-44-203-144-79.compute-1.amazonaws.com:5173",  # Dominio del frontend
            "http://localhost:5173"  # Para desarrollo local
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

    ##

    @app.post("/api/rentals")
    def create_rental(inventory_id: int, customer_id: int, staff_id: int, db: Session = Depends(get_db)):

        new_rental = Rental(
            rental_date=datetime.now(),
            inventory_id=inventory_id,
            customer_id=customer_id,
            staff_id=staff_id,
            return_date=None,
            last_update=datetime.now()
        )

        db.add(new_rental)
        db.commit()
        db.refresh(new_rental)
        return {"message": "Rental created successfully", "rental": new_rental}