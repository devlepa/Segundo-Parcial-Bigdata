from sqlalchemy.orm import Session
import models, schemas
from datetime import datetime

def get_actors(db: Session):
    return db.query(models.Actor).all()

def create_actor(db: Session, actor: schemas.ActorCreate):
    db_actor = models.Actor(**actor.dict(), last_update=datetime.utcnow())
    db.add(db_actor)
    db.commit()
    db.refresh(db_actor)
    return db_actor