from entity.profile import Profile
from shared.base import session_factory
from sqlalchemy import update
from exceptions.profile_dont_exist_exception import ProfileDontExistException
from sqlalchemy.orm.exc import NoResultFound
from service.raiting_service import create_raiting
from service.ranking_service import create_ranking,create_competetion_ranking
from entity.users import Users
from entity.rating import Rating
from shared.base import session_factory
import bcrypt
import uuid
from configuration.configuration_manager import ConfigurationManager

config = ConfigurationManager.get_instance()

def create_profile(user:Users):
    rating:Rating = create_raiting()
    with session_factory() as session:
        profile:Profile = Profile(public_id=uuid.uuid4(),name=user.name,points=0,avatar='ava1',rating_id=rating.id,user_id=user.id)
        session.add(profile)
        session.commit()
        session.refresh(profile)
        ranking = create_ranking(profile=profile)
        profile.ranking_id = ranking.id
        stmt = update(Profile).where(Profile.id == profile.id).values(ranking_id=ranking.id)
        session.execute(stmt)
        session.commit()


def get_profile_by_uid(uuid:str):
    with session_factory() as session:
        profile = session.query(Profile).filter_by(public_id=uuid).first()
        if profile:
           avatar_url = config.get_config_by_key('external.url')+"/api/v1/avatar/"+profile.avatar
           profile.avatar = avatar_url
           return profile
        raise ProfileDontExistException()

def get_profile_by_id(id:int):
    with session_factory() as session:
        profile = session.query(Profile).filter_by(user_id=id).first()
        if profile:
            avatar_url = config.get_config_by_key('external.url')+"/api/v1/avatar/"+profile.avatar
            profile.avatar = avatar_url
            return profile
        raise ProfileDontExistException()
    

def update_avatar(avatar:str,user_id:int):
    with session_factory() as session:
        try:
            session.query(Profile).filter(Profile.user_id == user_id).one()
            stmt = update(Profile).where(Profile.user_id == user_id).values(avatar=avatar)
            session.execute(stmt)
            session.commit()
        except NoResultFound:
            raise ProfileDontExistException()
        
def update_name(password:str,user_id:int):
    with session_factory() as session:
        try:
            session.query(Profile).filter(Profile.user_id == user_id).one()

            salt = bcrypt.gensalt()
            password = password.encode('utf-8')
            hashed_password = bcrypt.hashpw(password, salt)
            password = hashed_password.decode('utf-8')
            stmt = update(Users).where(Users.id == user_id).values(password=password)
            session.execute(stmt)
            session.commit()
        except NoResultFound:
            raise ProfileDontExistException()
    