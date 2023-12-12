from flask import Blueprint, request, Response, make_response
from security.token_validator import token_required
from entity.profile import Profile
from service.profile_service import get_profile_by_uid, get_profile_by_id,update_avatar, update_name
from entity.users import Users
from entity.response import Response as CustomResponse
from exceptions.profile_dont_exist_exception import ProfileDontExistException
import json

profile_blueprint = Blueprint('profile_blueprint', __name__)

@profile_blueprint.route('/profile',methods=['GET'])
@token_required
def get_matches(current_user:Users,response:Response):
    uuid = request.args.get('uuid')
    try:
        if uuid:
            profile:Profile = get_profile_by_uid(uuid)
        else: 
            profile:Profile = get_profile_by_id(current_user.id)
    except ProfileDontExistException as e:
        response.set_data(CustomResponse(e.message,e.code).to_json())
        return response
    response.set_data(json.dumps(profile.to_json(),indent=4))
    return response


@profile_blueprint.route('/profile', methods=['PATCH'])
@token_required
def update_profile(current_user:Users, response:Response):
    data = request.get_json()
    if not data.get('password') and not data.get('avatar'):
        response.set_data(CustomResponse("One field is required password or avatar","PR1").to_json())
        return response
    if data.get('avatar'):
        try:
            update_avatar(data.get('avatar'),user_id=current_user.id)
        except ProfileDontExistException as e:
            response.set_data(CustomResponse(e.message,e.code).to_json())
            return response
    else:
        try:
            update_name(data.get('password'),user_id=current_user.id)
        except ProfileDontExistException as e:
            response.set_data(CustomResponse(e.message,e.code).to_json())
            return response
    response.set_data(CustomResponse("Profile has been updated","OK").to_json())
    return response