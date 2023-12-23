from sqlalchemy import Column,String, Integer, ForeignKey, Double
from entity.competition import Competition
from entity.profile import Profile
from dataclasses import dataclass
from shared.base import Base
from sqlalchemy.orm import relationship
import json


@dataclass(order=True)
class CompetetitionRanking(Base):
    __tablename__ = 'ranking_competetition'

    id = Column(Integer,primary_key=True)
    public_id = Column(String,unique=True)
    place = Column(Integer,default=0)
    competetition_id = Column(Integer,ForeignKey('competition.id'))
    points = Column(Integer,default=0)
    tendency = Column(Integer,default=0)
    bets = Column(Integer,default=0)
    wins = Column(Integer,default=0)
    rating = Column(Double)
    profile_id = Column(Integer,ForeignKey("profiles.id")) 
    
    competetition = relationship(Competition,foreign_keys=[competetition_id],lazy='joined')
    profile = relationship(Profile,foreign_keys=[profile_id],lazy='joined')

    def to_json(self):
        return {
            "public_id": self.public_id,
            "place": self.place,
            "points":self.points,
            "competetition": self.competetition.to_json(),
            "profile": self.profile.to_json(),
            "tendency": self.tendency,
            "bets": self.bets,
            "wins": self.wins,
            "rating":self.rating
        }
    

