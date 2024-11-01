from flask import Blueprint, request, jsonify
from models.judges import get_judge_weight, get_judges
from models.scoreboard import submit_scores, query_scoreboard
from models.scoreboard import submit_scores, get_scores_for_performer
from models.performers import update_performer_status
from config import judges_table
judge_routes = Blueprint('judge', __name__)

@judge_routes.route('/submit-score', methods=['POST'])
def submit_score():
    data = request.json
    performer_id = data.get('performerId')
    judge_id = data.get('judgeId')
    scores = data.get('scores')  # Expecting a dictionary of category scores

    # Get the weight for the judge
    weight = get_judge_weight(judge_id)

    # Apply weight to each score
    weighted_scores = {f"{category}": score * weight for category, score in scores.items()}
    
    # Submit the weighted scores
    submit_scores(performer_id, judge_id, weighted_scores)

    # Check if all judges have submitted scores for this performer
    all_judges = get_judges()
    submitted_scores = get_scores_for_performer(performer_id)
    
   # Get the unique set of judge IDs that have submitted scores for the performer
    judges_voted = {score['judgeId'] for score in submitted_scores}
    
    # Check if all judges have voted
    if set(judge['judgeId'] for judge in all_judges) == judges_voted:
        # Update performer status to 'performed'
        # Make sure you have a function to update performer status in your database
        update_performer_status(performer_id, 'performed & scored')

    return jsonify({"message": "Scores submitted successfully."})

@judge_routes.route('/check-score-exists', methods=['GET'])
def check_score_exists():
    performer_id = request.args.get('performerId')
    judge_id = request.args.get('judgeId')

    # Query the scoreboard table to check if a score entry exists
    score_entry = query_scoreboard(performer_id, judge_id)  # Implement this function to check the scoreboard

    if score_entry:
        return jsonify({"exists": True})
    else:
        return jsonify({"exists": False})

@judge_routes.route('/judge/verify', methods=['GET'])
def verify_judge():
    judge_id = request.args.get('judgeId')
    if not judge_id:
        return jsonify({"verified": False, "message": "Judge ID is missing"}), 400

    response = judges_table.get_item(Key={'judgeId': judge_id})
    judge_exists = 'Item' in response

    if judge_exists:
        return jsonify({"verified": True})
    else:
        return jsonify({"verified": False, "message": "Judge is not verified"}), 403