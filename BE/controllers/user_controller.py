from flask import Blueprint, request, make_response
from configuration.configuration_manager import ConfigurationManager
from entity.users import Users
from entity.response import Response
from jsonschema.exceptions import ValidationError
from service import user_service,request_validator
from datetime import datetime, timedelta
from exceptions.user_alredy_exist_email_exception import UserAlredyExistEmailException
from exceptions.user_alredy_exist_name_exception import UserAlredyExistNameException
from exceptions.password_or_login_incorrect_exception import PasswordOrLoginIncorrectException
from exceptions.user_not_activated_exception import UserNotActivatedException
from exceptions.activation_code_invalid_exception import ActivationCodeInvalidException


user_blueprint = Blueprint('user_blueprint', __name__)
config = ConfigurationManager.get_instance()

@user_blueprint.route('/register', methods=['POST'])
def register():
    try:
        new_user = request_validator.register_validation()
        user_service.create_user(user=new_user)
        response = make_response(Response(message='The user has been created successfully.',code='OK').__dict__)
        response.status_code = 200
    except (UserAlredyExistEmailException, UserAlredyExistNameException) as e:
        response = make_response(Response(message=e.message,code=e.code).__dict__)
        response.status_code = 400
    except ValidationError as e:
        response = make_response(Response(message=e.message,code='R4').__dict__)
        response.status_code = 400
    return response 

@user_blueprint.route('/activate/<code>', methods=['POST'])
def activate(code:str):
    try:
        user_service.activate_user(code=code)
        response = make_response(Response(message='The user has been successfully activated.',code='OK').__dict__)
    except ActivationCodeInvalidException as e:
        response = make_response(Response(message=e.message,code=e.code).__dict__)
        response.status_code = 400
    return response

@user_blueprint.route('/login', methods=['POST'])
def login():
    try:
        user = request_validator.login_validation()
        jwtTokens = user_service.login(user)
        if jwtTokens:
            authorize, refresh = jwtTokens
            response = make_response(Response(message='The user has been successfully logged in.',code='OK').__dict__)
            expiration = datetime.utcnow() + timedelta(minutes=int(config.get_config_by_key("jwt.exp.authorization")))
            response.set_cookie('Authorization',authorize,expires=expiration.timestamp(),httponly=False)
            expiration = datetime.utcnow() + timedelta(minutes=int(config.get_config_by_key("jwt.exp.refresh")))
            response.set_cookie('Refresh',refresh,expires=expiration.timestamp(),httponly=False)
    except (PasswordOrLoginIncorrectException, UserNotActivatedException) as e:
         response = make_response(Response(message=e.message,code=e.code).__dict__)
         response.status_code = 400
    except ValidationError as e:
        response = make_response(Response(message=e.message,code='L4').__dict__)
        response.status_code = 400
    return response

@user_blueprint.route('/logout', methods=['GET'])
def logout():
    response = make_response(Response(message='The user has been successfully logout.',code='OK').__dict__)
    response.set_cookie('Authorization','',expires=0,httponly=False,path='/')
    response.set_cookie('Refresh','',expires=0,httponly=False)
    return response

