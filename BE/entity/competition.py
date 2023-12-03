from shared.base import Base
from sqlalchemy import Column,String,Integer
from dataclasses import dataclass
import json

@dataclass(order=True)
class Competition(Base):
    __tablename__ = 'competition'

    id = Column(Integer,primary_key=True)
    public_id = Column(Integer)
    name = Column(String)
    code = Column(String)
    type = Column(String)
    emblem = Column(String)

    def to_json(self):
        return {
            "public_id":self.public_id,
            "name":self.name,
            "code":self.code,
            "type":self.type,
            "emblem":self.emblem
        }