from config import performers_table

def update_performer_status(performer_id, status):
    response = performers_table.update_item(
        Key={'performerId': performer_id},
        UpdateExpression="SET #status = :status",
        ExpressionAttributeValues={
            ':status': status  # Define the actual value for :status
        },
        ExpressionAttributeNames={
            '#status': 'status'  # Use ExpressionAttributeNames to avoid reserved keyword conflict
        },
        ReturnValues="UPDATED_NEW"
    )
    return response

def get_performers():
    response = performers_table.scan()
    return response.get('Items', [])
