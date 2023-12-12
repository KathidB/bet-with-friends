from entity.rating import Rating
from entity.profile import Profile
from sqlalchemy.orm.exc import NoResultFound
from exceptions.profile_dont_exist_exception import ProfileDontExistException
from shared.base import session_factory
from sqlalchemy import update
import uuid

def create_raiting():
    with session_factory() as session:
        rating = Rating(bets=0,public_id=uuid.uuid4(),wins=0,rating=0.00)
        session.add(rating)
        session.commit()
        session.refresh(rating)
    return rating

def update_raiting(id:int,isWin:bool):
    with session_factory() as session:
        rating:Rating = session.query(Rating).filter_by(id = id).first()
        rating.bets += 1
        if isWin:
            rating.wins += 1
        rate = calc_rating(rating=rating)
        rate = round(rate,2)
        stmt = update(Rating).where(Rating.id == rating.id).values(rating = rate)
        session.execute(stmt)
        session.commit()

def get_rating(profile_id:str):
    with session_factory() as session:
        try:
           profile = session.query(Profile).filter_by(public_id=profile_id).one()
           return session.query(Rating).filter_by(id=profile.rating_id).one()
        except NoResultFound:
            raise ProfileDontExistException()


def calc_rating(rating:Rating):
    try:
        return 100 * rating.wins / rating.bets
    except ZeroDivisionError:
        return 0