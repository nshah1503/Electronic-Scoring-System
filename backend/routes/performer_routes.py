# routes/performer_routes.py

from flask import Blueprint, jsonify, request
from models.performers import get_all_performers, get_performer_by_id, update_performer_status

performer_bp = Blueprint('performer_bp', __name__)

@performer_bp.route('/performers', methods=['GET'])
def all_performers():
    return jsonify(get_all_performers())

@performer_bp.route('/performer/<string:performer_id>', methods=['GET'])
def performer_detail(performer_id):
    return jsonify(get_performer_by_id(performer_id))

@performer_bp.route('/performer/<string:performer_id>/status', methods=['PUT'])
def performer_status(performer_id):
    status = request.json.get('status')
    return jsonify(update_performer_status(performer_id, status))
