from config import judges_table

def get_judge_weight(judge_id):
    response = judges_table.get_item(Key={'judgeId': judge_id})
    return response.get('Item', {}).get('weight', 1)

def get_judges():
    response = judges_table.scan()
    return response.get('Items', [])

