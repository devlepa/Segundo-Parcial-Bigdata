from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ActorBase(BaseModel):
    first_name: str
    last_name: str


class ActorCreate(ActorBase):
    pass


class ActorOut(BaseModel):
    actor_id: int
    first_name: str
    last_name: str

    class Config:
        orm_mode = True


class RentalBase(BaseModel):
    inventory_id: int
    customer_id: int


class RentalCreate(RentalBase):
    staff_id: int  # Retain staff_id for now


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


class CustomerOut(BaseModel):
    customer_id: int
    first_name: str
    last_name: str
    email: Optional[str]
    active: bool

    class Config:
        orm_mode = True


class StaffOut(BaseModel):
    staff_id: int
    first_name: str
    last_name: str
    email: Optional[str]
    username: str

    class Config:
        orm_mode = True
