import jwt
from entity.users import Users
from entity.password_reset import PasswordReset
from shared.base import session_factory
import bcrypt
import uuid
from sqlalchemy import update
from sqlalchemy.exc import IntegrityError
from service.email_service import send_activation_mail,send_reset_mail
from service.activation_service import create_activation,activate
from configuration.configuration_manager import ConfigurationManager
from datetime import datetime, timedelta
from exceptions.user_alredy_exist_email_exception import UserAlredyExistEmailException
from exceptions.user_alredy_exist_name_exception import UserAlredyExistNameException
from exceptions.user_not_activated_exception import UserNotActivatedException
from exceptions.password_or_login_incorrect_exception import PasswordOrLoginIncorrectException
from exceptions.user_dont_exist_exception import UserDontExistException
from exceptions.user_dont_exist_or_code_expire_exception import UserDontExistOrCodeExpireException
from service.profile_service import create_profile

config = ConfigurationManager.get_instance()
def create_user(user:Users):
    if user.password:
        salt = bcrypt.gensalt()
        password = user.password.encode('utf-8')
        hashed_password = bcrypt.hashpw(password, salt)
        user.password = hashed_password.decode('utf-8')
        user.admin = False
        user.salt = salt
        user.isActive = False
        user.public_id = str(uuid.uuid4())
    with session_factory() as session:
        try:
            session.add(user)
            session.commit()
            session.refresh(user)
            code = create_activation(user_id=user.id)
            send_activation_mail(user.email,code=code)
            create_profile(user=user)
        except IntegrityError as e:
            if 'already exists.' in str(e.orig):
                if 'name' in str(e.orig):
                    raise UserAlredyExistNameException(user.name)
                elif 'email' in str(e.orig):
                    raise UserAlredyExistEmailException(user.email)
        except:
            session.rollback()

def activate_user(code:str):
    user_id = activate(code)
    with session_factory() as session:
        stmt = update(Users).where(Users.id == user_id).where(Users.isActive == False).values(isActive=True)
        session.execute(stmt)
        session.commit()

def login(user:Users):
    with session_factory() as session:
        userdb = session.query(Users).filter_by(email=user.email).first()
        if not userdb:
           raise PasswordOrLoginIncorrectException()
        elif not userdb.isActive:
            raise UserNotActivatedException()
        password = user.password.encode('utf-8')
       
        if bcrypt.checkpw(password, userdb.password.encode('utf-8')):
            expiry_time = datetime.utcnow() + timedelta(minutes=int(config.get_config_by_key("jwt.exp.authorization")))
            expiry_refresh = datetime.utcnow() + timedelta(minutes=int(config.get_config_by_key("jwt.exp.refresh")))
            authorize = jwt.encode({'exp':expiry_time.timestamp(),'user_uid': userdb.public_id,'isAdmin':userdb.admin,'isActive':userdb.isActive,'date':str(datetime.now())},config.get_config_by_key("SECRET_KEY"),algorithm="HS256")
            refresh = jwt.encode({'exp':expiry_refresh.timestamp(),'user_uid': userdb.public_id,'date':str(datetime.now())},config.get_config_by_key("SECRET_KEY"),algorithm="HS256")
            return authorize, refresh
        raise PasswordOrLoginIncorrectException()

def find_user_by_uid(uuid):
    with session_factory() as session:
        user = session.query(Users).filter_by(public_id=uuid).first()
        if not user:
           raise UserDontExistException()
        elif not user.isActive:
            raise UserNotActivatedException()
        return user

def create_password_reset(email:str):
    with session_factory() as session:
       user = session.query(Users).filter(Users.email == email,Users.isActive == True).first()
       if user:
           password_reset = PasswordReset(code=uuid.uuid4(),user_id=user.id,expires=(datetime.utcnow() + timedelta(seconds=3600+3600)))
           session.add(password_reset)
           session.commit()
           send_reset_mail(reciver=user.email,code=password_reset.code)
           return password_reset.code
       raise UserDontExistException()
    

def reset_password(password:str, code:str):
    with session_factory() as session:
        salt = bcrypt.gensalt()
        password = password.encode('utf-8')
        hashed_password = bcrypt.hashpw(password, salt).decode('utf-8')
        user:Users = session.query(Users).join(PasswordReset).filter(PasswordReset.code == code,PasswordReset.expires >= datetime.now()).first()
        if user:
            session.query(Users).filter(Users.id == user.id).update({'password':hashed_password,'salt':salt})
            session.commit()
            session.query(PasswordReset).filter(PasswordReset.code == code).delete()
            session.commit()
            return
        raise UserDontExistOrCodeExpireException()
    

def remove_reset_passwords():
    with session_factory() as session:
        expired_resets = session.query(PasswordReset).filter(PasswordReset.expires < datetime.now()).all()
        for reset in expired_resets:
            session.delete(reset)
        session.commit()