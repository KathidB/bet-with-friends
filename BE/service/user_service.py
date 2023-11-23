import jwt
from entity.users import Users
from shared.base import session_factory
import bcrypt
import uuid
from sqlalchemy import update
from sqlalchemy.exc import IntegrityError
from service.email_service import send_activation_mail
from service.activation_service import create_activation,activate
from configuration.configuration_manager import ConfigurationManager
from datetime import datetime, timedelta
from exceptions.user_alredy_exist_email_exception import UserAlredyExistEmailException
from exceptions.user_alredy_exist_name_exception import UserAlredyExistNameException
from exceptions.user_not_activated_exception import UserNotActivatedException
from exceptions.password_or_login_incorrect_exception import PasswordOrLoginIncorrectException


config = ConfigurationManager.get_instance()
def create_user(user:Users):
    if user.password:
        salt = bcrypt.gensalt()
        password = user.password.encode('utf-8')
        hashed_password = bcrypt.hashpw(password, salt)
        user.password = hashed_password
        user.admin = False
        user.salt = salt
        user.isActive = False
        user.public_id = str(uuid.uuid4())
    with session_factory() as session:
        try:
            session.add(user)
            session.commit()
            session.refresh(user)
            create_activation(user_id=user.id)
            send_activation_mail(user.email)
        except IntegrityError as e:
             if 'UNIQUE constraint failed' in str(e.orig):
                if 'users.name' in str(e.orig):
                    raise UserAlredyExistNameException(user.name)
                elif 'users.email' in str(e.orig):
                    raise UserAlredyExistEmailException(user.email)
            

def activate_user(code:str):
    user_id = activate(code)
    if user_id:
        with session_factory() as session:
            stmt = update(Users).where(Users.id == user_id).where(Users.isActive == False).values(isActive=True)
            session.execute(stmt)
            session.commit()

def login(user:Users):
    with session_factory() as session:
        userdb = session.query(Users).filter_by(name=user.name).first()
        if not userdb:
           raise PasswordOrLoginIncorrectException()
        elif not userdb.isActive:
            raise UserNotActivatedException()
        password = user.password.encode('utf-8')
        password = bcrypt.hashpw(password,userdb.salt)
        expiry_time = datetime.utcnow() + timedelta(minutes=config.get_config_by_key("jwt.exp.authorization"))
        expiry_refresh = datetime.utcnow() + timedelta(minutes=config.get_config_by_key("jwt.exp.refresh"))
        if password == userdb.password:
            authorize = jwt.encode({'exp':expiry_time,'user_uid': userdb.public_id,'isAdmin':userdb.admin,'isActive':userdb.isActive,'date':str(datetime.now())},config.get_config_by_key("SECRET_KEY"),algorithm="HS256")
            refresh = jwt.encode({'exp':expiry_refresh,'user_uid': userdb.public_id,'date':str(datetime.now())},config.get_config_by_key("SECRET_KEY"),algorithm="HS256")
            return authorize, refresh
        raise PasswordOrLoginIncorrectException()



