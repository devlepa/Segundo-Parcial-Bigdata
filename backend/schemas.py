from pydantic import BaseModel
from datetime import datetime

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