from sqlalchemy import Column,String, Integer, ForeignKey
from entity.competition import Competition
from dataclasses import dataclass
from shared.base import Base
from sqlalchemy.orm import relationship
import json


@dataclass(order=True)
class CompetetitionRanking(Base):
    __tablename__ = 'ranking_competetition'

    id = Column(Integer,primary_key=True)
    public_id = Column(String,unique=True)
    place = Column(Integer)
    competetition_id = Column(Integer,ForeignKey('competition.id'))
    points = Column(Integer)
    profile_id = Column(Integer,ForeignKey("profiles.id")) 
    
    competetition = relationship(Competition,foreign_keys=[competetition_id],lazy='joined')

    def to_json(self):
        return json.dumps({
            "public_id": self.public_id,
            "place": self.place,
            "points":self.points,
            "competetition": self.competetition.to_json()
        }, indent= 4)
    

