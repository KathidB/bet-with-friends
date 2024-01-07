from sqlalchemy import Column, String, Integer, ForeignKey, Double
from sqlalchemy.orm import relationship
from dataclasses import dataclass
from shared.base import Base
from entity.users import Users
from entity.rating import Rating
from entity.ranking import Ranking
import json

@dataclass(order=True)
class Profile(Base):
    __tablename__ = 'profiles'

    id = Column(Integer, primary_key=True)
    public_id = Column(String)
    name = Column(String(50),unique=True)
    points = Column(Double)
    avatar = Column(String(255))
    ranking_id = Column(Integer, ForeignKey("rankings.id"))
    rating_id = Column(Integer,ForeignKey('ratings.id'))
    user_id = Column(Integer,ForeignKey('users.id'))
    experience = Column(Integer,default=0)
    level = Column(Integer,default=1)
    ranking = relationship(Ranking,foreign_keys=[ranking_id],lazy='joined')
    user = relationship(Users,foreign_keys=[user_id])
    rating = relationship(Rating,foreign_keys=[rating_id],lazy='joined')
    ranking_competetition = []
    achievements = []


    def to_json(self):
        return {
            "public_id": self.public_id,
            "name": self.name,
            "points": self.points,
            "avatar": self.avatar,
            "ranking": json.loads(self.ranking.to_json()),
            "rating": json.loads(self.rating.to_json()),
            "ranking_competetition": self.ranking_competetition,
            "achievements": self.achievements,
            "experience": self.experience,
            "level": self.level
        }

    