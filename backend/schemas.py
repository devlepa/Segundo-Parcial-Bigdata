from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
import models, schemas
from database import get_db

app = FastAPI()


class ActorBase(BaseModel):
    first_name: str
    last_name: str


class ActorCreate(ActorBase):
    pass


class ActorOut(ActorBase):
    actor_id: int
    last_update: datetime

    class Config:
        orm_mode = True


class RentalBase(BaseModel):
    inventory_id: int
    customer_id: int
    staff_id: int


class RentalCreate(BaseModel):
    inventory_id: int
    customer_id: int
    staff_id: int
    store_id: int  # Agregado para verificar la tienda


class RentalOut(BaseModel):
    rental_id: int
    rental_date: datetime
    inventory_id: int
    customer_id: int
    staff_id: int

    class Config:
        orm_mode = True


class FilmAvailability(BaseModel):
    film_id: int
    title: str
    inventory_id: int
    store_id: int
    store_location: str
    is_rented: bool

    class Config:
        orm_mode = True


class RentMovieRequest(BaseModel):
    inventory_id: int
    customer_id: int
    staff_id: int


class RentMovieResponse(BaseModel):
    message: str
    rental_id: int
    rental_date: datetime


class ReturnMovieRequest(BaseModel):
    inventory_id: int
    customer_id: int


