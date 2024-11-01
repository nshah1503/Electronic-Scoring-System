from config import scoreboard_table
from boto3.dynamodb.conditions import Key
from boto3.dynamodb.conditions import Key, Attr


def submit_scores(performer_id, judge_id, scores):
    item = {
        'performerId': performer_id,  # Make sure this is a string
        'judgeId': judge_id,          # Make sure this is a string
        'scores': scores              # This can be a map with category scores
    }
        # {'M': {f"category{idx+1}": {'N': str(score)} for idx, score in enumerate(scores.values())}}
    scoreboard_table.put_item(Item=item)
    return item

def get_all_scores():
    response = scoreboard_table.scan()
    return response.get('Items', [])


def get_scores_for_performer(performer_id):
    # Key={"performerId": performer_id}
    response = scoreboard_table.query(
        KeyConditionExpression=Key('performerId').eq(performer_id)
    )
    return response.get('Items', [])

def query_scoreboard(performer_id, judge_id):
    response = scoreboard_table.query(
        KeyConditionExpression=Key('performerId').eq(performer_id) & Key('judgeId').eq(judge_id)
    )
    
    # Check if any items were returned
    return len(response.get('Items', [])) > 0