from sqlalchemy import Column, String, Integer,ForeignKey
from shared.base import Base
from dataclasses import dataclass
import json

@dataclass(order=True)
class Score(Base):
    __tablename__ = 'score'

    id = Column(Integer,primary_key=True)
    public_id = Column(String)
    winner = Column(Integer,ForeignKey('team.id'),nullable=True)
    full_time = Column(String,nullable=True)
    half_time = Column(String,nullable=True)


    def to_json(self):
        return json.dumps({
            "public_id":self.public_id,
            "winner":self.winner,
            "full_time":self.full_time,
            "half_time":self.half_time
        },indent=4)