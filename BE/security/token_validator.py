from functools import wraps
from flask import make_response, request
import jwt
from entity.response import Response
from entity.users import Users
from configuration.configuration_manager import ConfigurationManager
from datetime import datetime, timedelta
from service.user_service import find_user_by_uid
from exceptions.user_not_activated_exception import UserNotActivatedException
from exceptions.user_dont_exist_exception import UserDontExistException

config = ConfigurationManager.get_instance()

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        refresh_token= None
        response = make_response()
        response.headers['Content-Type'] = 'application/json'
        response.headers['Accept-Encoding'] = 'gzip, compress, br'
        if 'Authorization' in request.cookies:
            token = request.cookies['Authorization']
        if 'Refresh' in request.cookies:
            refresh_token =  request.cookies['Refresh']
        if not token and not refresh_token:
            response = make_response(Response('Session expired','T1').__dict__)
            response.status_code = 401
            return response
        try:
            current_user = validate_token(token)
        except:
            try:
                current_user = validate_token(refresh_token)
                milliseconds_per_minute = float(1000 * 60)
                expiry_time = datetime.utcnow() + timedelta(minutes=float(config.get_config_by_key("jwt.exp.authorization"))*milliseconds_per_minute)
                expiry_refresh = datetime.utcnow() + timedelta(minutes=float(config.get_config_by_key("jwt.exp.refresh"))*milliseconds_per_minute)
                authorize = jwt.encode({'exp':expiry_time,'user_uid': current_user.public_id,'isAdmin':current_user.admin,'isActive':current_user.isActive,'date':str(datetime.now())},config.get_config_by_key("SECRET_KEY"),algorithm="HS256")
                refresh = jwt.encode({'exp':expiry_refresh,'user_uid': current_user.public_id,'date':str(datetime.now())},config.get_config_by_key("SECRET_KEY"),algorithm="HS256")
                expiration = datetime.utcnow() + timedelta(minutes=float(config.get_config_by_key("jwt.exp.authorization")))
                response.set_cookie('Authorization',authorize,expires=expiration.timestamp(),httponly=False)
                expiration = datetime.utcnow() + timedelta(minutes=float(config.get_config_by_key("jwt.exp.refresh")))
                response.set_cookie('Refresh',refresh,expires=expiration.timestamp(),httponly=False)
            except (UserNotActivatedException, UserDontExistException) as e:
                response = make_response(Response(e.message,e.code).__dict__)
                response.status_code = 401
                return response
            except Exception as e:
                print(e)
                response = make_response(Response('Session expired','T1').__dict__)
                response.status_code = 401
                return response
        return f(current_user,response, *args, **kwargs)
    
    return decorator

def update_token(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        refresh_token = None
        response = make_response()
        response.headers['Content-Type'] = 'application/json'
        response.headers['Accept-Encoding'] = 'gzip, compress, br'
        if 'Authorization' in request.cookies:
            token = request.cookies['Authorization']
        if 'Refresh' in request.cookies:
            refresh_token =  request.cookies['Refresh']
        if token or refresh_token:
            try:
                validate_token(token)
            except:
                try:
                    current_user = validate_token(refresh_token)
                    milliseconds_per_minute = float(1000 * 60)
                    expiry_time = datetime.utcnow() + timedelta(minutes=float(config.get_config_by_key("jwt.exp.authorization"))*milliseconds_per_minute)
                    expiry_refresh = datetime.utcnow() + timedelta(minutes=float(config.get_config_by_key("jwt.exp.refresh"))*milliseconds_per_minute)
                    authorize = jwt.encode({'exp':expiry_time*60*1000,'user_uid': current_user.public_id,'isAdmin':current_user.admin,'isActive':current_user.isActive,'date':str(datetime.now())},config.get_config_by_key("SECRET_KEY"),algorithm="HS256")
                    refresh = jwt.encode({'exp':expiry_refresh*60*1000,'user_uid': current_user.public_id,'date':str(datetime.now())},config.get_config_by_key("SECRET_KEY"),algorithm="HS256")
                    expiration = datetime.utcnow() + timedelta(minutes=int(config.get_config_by_key("jwt.exp.authorization")))
                    response.set_cookie('Authorization',authorize,expires=expiration.timestamp(),httponly=False)
                    expiration = datetime.utcnow() + timedelta(minutes=int(config.get_config_by_key("jwt.exp.refresh")))
                    response.set_cookie('Refresh',refresh,expires=expiration.timestamp(),httponly=False)
                except (UserNotActivatedException, UserDontExistException) as e:
                    response = make_response(Response(e.message,e.code).__dict__)
                    response.status_code = 401
                    return response
                except Exception as e:
                    response = make_response(Response('Session expired','T1').__dict__)
                    response.status_code = 401
                    return response
        return f(response, *args, **kwargs)
    return decorator

def validate_token(token):
    data = jwt.decode(token, config.get_config_by_key('SECRET_KEY'),algorithms="HS256")
    return find_user_by_uid(uuid=data['user_uid'])