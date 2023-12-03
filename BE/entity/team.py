from sqlalchemy import Column, String, Integer,ForeignKey
from shared.base import Base
from dataclasses import dataclass
import json

@dataclass(order=True)
class Team(Base):
    __tablename__ = 'team'

    id = Column(Integer, primary_key=True)
    public_id = Column(Integer)
    name = Column(String)
    short_name = Column(String)
    tla = Column(String)
    crest = Column(String)

    def to_json(self):
        return json.dumps({
            "public_id":self.public_id,
            "name":self.name,
            "short_name":self.short_name,
            "tla":self.tla,
            "crest":self.crest
        },indent=4)