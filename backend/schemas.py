from pydantic import BaseModel
from datetime import datetime
from typing import Optional

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
    
class FilmAvailability(BaseModel):
    film_id: int
    title: str
    inventory_id: int
    store_id: int
    store_location: Optional[str] = None
    is_rented: bool

    class Config:
        from_attributes = True  # Pydantic v2 - Reemplazo de 'orm_mode'