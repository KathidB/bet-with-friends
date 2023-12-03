from flask import Blueprint, request,Response
from security.token_validator import token_required
from service.match_service import get_competetition_list,get_matches_list
from entity.response import Response as CustomResponse
from entity.competition import Competition
import json

match_blueprint = Blueprint('match_blueprint', __name__)

@match_blueprint.route('/matches',methods=['GET'])
@token_required
def get_matches(current_user,response:Response):
    page = 1 
    limit = 5
    if request.args.get('page'):
        page = request.args.get('page')
    if request.args.get('limit'):
        limit = request.args.get('limit')
    if request.args.get('competetition'):
        competetition = request.args.get('competetition')
        response.set_data(json.dumps([obj.to_json() for obj in get_matches_list(page=int(page),limit=int(limit),competetition=competetition)],indent=4))
        return response,200
    response.set_data(CustomResponse(message="Parameter competetition is required",code="M1").to_json())
    return response,400

@match_blueprint.route('/competetition',methods=['GET'])
@token_required
def get_competetition(current_user,response:Response):
    comp:Competition = get_competetition_list()
    response.set_data(json.dumps([obj.to_json() for obj in comp],indent=4))
    return response

    
