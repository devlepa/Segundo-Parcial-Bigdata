from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas, crud, database

SessionLocal = database.SessionLocal 
engine = database.engine 
Base = database.Base 

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Permitir orígenes para CORS
origins = [
    "http://localhost:5173",
    "http://ec2-13-218-151-147.compute-1.amazonaws.com:5173",
    "http://ec2-13-218-151-147.compute-1.amazonaws.com",
    "http://172.31.82.184:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Ruta raíz para verificar que el backend está funcionando
@app.get("/")
def root():
    return {"message": "Welcome to the Actors API. Use /actors to interact with the actors data."}

# Ruta para obtener todos los actores
@app.get("/actors", response_model=list[schemas.ActorOut])
def read_actors(db: Session = Depends(get_db)):
    return crud.get_actors(db)

# Ruta para crear un nuevo actor
@app.post("/actors", response_model=schemas.ActorOut)
def create_actor(actor: schemas.ActorCreate, db: Session = Depends(get_db)):
    return crud.create_actor(db, actor)
