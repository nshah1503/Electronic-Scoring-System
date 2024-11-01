from flask import Blueprint, jsonify
from models.scoreboard import get_all_scores
from config import performers_table, judges_table, scoreboard_table
from boto3.dynamodb.conditions import Key

scoreboard_routes = Blueprint('scoreboard', __name__)

# @scoreboard_routes.route('/final-scores', methods=['GET'])
# def final_scores():
#     scores = get_all_scores()
#     # Here, you could add additional logic to aggregate or process the scores
#     return jsonify(scores)


@scoreboard_routes.route('/final-scores', methods=['GET'])
def final_scores():
    scores = get_all_scores()
    
    results = []
    for score in scores:
        performer_id = score['performerId']
        judge_id = score['judgeId']
        category_scores = score['scores']
        
        # Retrieve performer and judge names based on IDs
        performer_name = get_name_from_table(performers_table, performer_id, 'performerId', 'name')
        judge_name = get_name_from_table(judges_table, judge_id, 'judgeId', 'name')
        
        # Calculate the total score if needed
        total_score = sum(category_scores.values())
        
        results.append({
            "performerId": performer_id,
            "performerName": performer_name,
            "judgeId": judge_id,
            "judgeName": judge_name,
            "scores": list(category_scores.values()),  # converting scores to a list for frontend
            "finalScore": total_score
        })

    return jsonify(results)

def get_all_scores():
    response = scoreboard_table.scan()
    return response.get('Items', [])

def get_name_from_table(table, id_value, id_key, name_key):
    response = table.get_item(Key={id_key: id_value})
    return response.get('Item', {}).get(name_key, "Unknown")

