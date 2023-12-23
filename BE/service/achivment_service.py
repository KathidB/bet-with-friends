from service.achivment_repository import get_list_of_achiv
from sqlalchemy import func
from shared.base import session_factory
from entity.achivments import Achivments
from entity.profile import Profile


def insert_achivments(profile_id):
    with session_factory() as session:
        for achiv in get_list_of_achiv(profile_id=profile_id):
            session.add(achiv)
            session.commit()

def update_achivments_for_old_users():
    with session_factory() as session:
        profiles:[] = session.query(Achivments.profile_id).group_by(Achivments.profile_id).having(func.count() < 5).all()
        profiles+=(session.query(Profile.id).outerjoin(Achivments).all())
        for profile in profiles:
            for achiv in get_list_of_achiv(profile_id=profile[0]):
                if not session.query(Achivments).filter(Achivments.profile_id == profile[0], Achivments.achivment_type_uuid == achiv.achivment_type_uuid).first():
                    session.add(achiv)
                    session.commit()

def get_achivments_by_profile(profile_id:int):
    with session_factory() as session:
        achivments = session.query(Achivments).filter(Achivments.profile_id == profile_id).all()
        achivments_json_list = []
        for achievement in achivments:
            achivments_json_list.append(achievement.to_json())
    return achivments_json_list
