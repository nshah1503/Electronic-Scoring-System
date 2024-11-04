import boto3
from flask import Blueprint, request, jsonify
from config import get_dynamodb_resource
from flask_cors import cross_origin
from models.judges import get_judges

admin_routes = Blueprint("admin_routes", __name__)

dynamodb = get_dynamodb_resource()
performers_table = dynamodb.Table("Performers")
judges_table = dynamodb.Table("Judges")

@admin_routes.route("/update-status", methods=["POST"])
def update_performer_status():
    data = request.get_json()
    performer_id = data.get("performerId")
    new_status = data.get("status")

    if not performer_id or not new_status:
        return jsonify({"error": "performerId and status are required"}), 400

    # Update performer status
    try:
        response = performers_table.update_item(
            Key={"performerId": performer_id},
            UpdateExpression="SET #s = :status",
            ExpressionAttributeNames={"#s": "status"},
            ExpressionAttributeValues={":status": new_status},
            ReturnValues="UPDATED_NEW"
        )
        return jsonify(response.get("Attributes", {})), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_routes.route("/performers", methods=["GET"])
def get_performers():
    try:
        response = performers_table.scan()
        performers = response.get("Items", [])
        return jsonify(performers), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_routes.route('/judges', methods=['GET'])
def get_judges():
    try:
        response = judges_table.scan()
        judges = response.get("Items", [])
        return jsonify(judges), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_routes.route('/add-performer', methods=['POST'])
def add_performer():
    data = request.json
    performer_id = data.get('performerId')
    name = data.get('name')
    email_id = data.get('emailId')
    status = data.get('status', 'not performed')
    
    if not performer_id or not name or not email_id:
        return jsonify({"error": "Performer ID, name, and email are required"}), 400

    new_performer = {
        'performerId': performer_id,
        'name': name,
        'emailId': email_id,
        'status': status
    }

    # Add to the database
    performers_table.put_item(Item=new_performer)

    return jsonify(new_performer), 201

# New route to update the active voting judge
@admin_routes.route('/update-voting-judge', methods=['POST'])
def update_voting_judge():
    data = request.json
    judge_id = data.get('judgeId')

    if not judge_id:
        return jsonify({"error": "judgeId is required"}), 400

    # Reset isVotingNow to false for all judges
    try:
        # First, scan and get all judges
        response = judges_table.scan()
        for judge in response.get("Items", []):
            judges_table.update_item(
                Key={"judgeId": judge['judgeId']},
                UpdateExpression="SET isVotingNow = :val",
                ExpressionAttributeValues={":val": False}
            )

        # Set isVotingNow to true for the specified judge
        judges_table.update_item(
            Key={"judgeId": judge_id},
            UpdateExpression="SET isVotingNow = :val",
            ExpressionAttributeValues={":val": True}
        )

        return jsonify({"message": f"Judge {judge_id} is now the active voting judge"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# New route to get the active voting judge
@admin_routes.route('/active-voting-judge', methods=['GET'])
def get_active_voting_judge():
    try:
        response = judges_table.scan(
            FilterExpression="isVotingNow = :val",
            ExpressionAttributeValues={":val": True}
        )
        active_judges = response.get("Items", [])
        if active_judges:
            return jsonify({"judgeId": active_judges[0]["judgeId"], "name": active_judges[0]["name"]}), 200
        else:
            return jsonify({"message": "No active voting judge"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
