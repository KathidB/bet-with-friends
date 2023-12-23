from sqlalchemy import Column, String, Integer,DateTime,ForeignKey,Boolean
from sqlalchemy.orm import relationship
from entity.profile import Profile
from shared.base import Base

class Achivments(Base):
    __tablename__ = 'achievement'
    id = Column(Integer,primary_key=True)
    uuid = Column(String)
    profile_id = Column(Integer,ForeignKey('profiles.id'))
    achivment_type_uuid = Column(String)
    achiv_name = Column(String)
    description = Column(String)
    image_url = Column(String)
    acquired = Column(DateTime)
    active = Column(Boolean,default=False)
    query_text = Column(String)


    match = relationship(Profile,foreign_keys=[profile_id],lazy='joined')


    
    def to_json(self):
        acquired_date = self.acquired.isoformat() if self.acquired else None
        return {
            "uuid": self.uuid,
            "achivment_type_uuid": self.achivment_type_uuid,
            "achiv_name": self.achiv_name,
            "description": self.description,
            "image_url": self.image_url,
            "acquired": acquired_date,
            "active": self.active
        }





    