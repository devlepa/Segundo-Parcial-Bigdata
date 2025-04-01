from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas, crud, database

SessionLocal = database.SessionLocal 
engine = database.engine 
Base = database.Base 

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://ec2-3-91-179-100.compute-1.amazonaws.com:5173",
    "http://ec2-3-91-179-100.compute-1.amazonaws.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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

@app.get("/actors", response_model=list[schemas.ActorOut])
def read_actors(db: Session = Depends(get_db)):
    return crud.get_actors(db)

@app.post("/actors", response_model=schemas.ActorOut)
def create_actor(actor: schemas.ActorCreate, db: Session = Depends(get_db)):
    return crud.create_actor(db, actor)
