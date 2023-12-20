from flask import Blueprint, request, Response, make_response
from service.ranking_service import get_ranking,get_ranking_competetition
from entity.profile import Profile
import json
from security.token_validator import update_token


ranking_blueprint = Blueprint('ranking_blueprint', __name__)

@ranking_blueprint.route('/ranking', methods=['GET'])
@update_token
def ranking_list(response:Response):
    page = 1 
    limit = 5
    if request.args.get('page'):
        page = request.args.get('page')
    if request.args.get('limit'):
        limit = request.args.get('limit')
    if request.args.get('competetition'):
        comp = request.args.get('competetition')
        (ranking,count) = get_ranking_competetition(page=int(page),limit=int(limit),competetition=comp)
        response.set_data(json.dumps([obj.to_json() for obj in ranking],indent=4))
        response.headers['X-Total-Count'] = count
        return response,200
    (ranking,count) = get_ranking(page=int(page),limit=int(limit))
    response.set_data(json.dumps([obj.to_json() for obj in ranking],indent=4))
    response.headers['X-Total-Count'] = count
    return response,200
