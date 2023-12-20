from sqlalchemy import Column,String, Integer, ForeignKey
from dataclasses import dataclass
from shared.base import Base
import json

@dataclass(order=True)
class Ranking(Base):
    __tablename__ = 'rankings'

    id = Column(Integer,primary_key=True)
    public_id = Column(String,unique=True)
    place = Column(Integer)
    tendency = Column(Integer,default=0)
    profile_id = Column(Integer,ForeignKey("profiles.id")) 

    def to_json(self):
        return json.dumps({
            "public_id": self.public_id,
            "place": self.place,
            "tendency": self.tendency
        }, indent= 4)
