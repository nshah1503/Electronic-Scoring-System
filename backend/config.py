import boto3
import os

# DynamoDB setup
dynamodb = boto3.resource(
    'dynamodb',
    region_name='us-west-1',       # e.g., 'us-west-2'
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")
)

def get_dynamodb_resource():
    # Initialize a DynamoDB resource
    return boto3.resource(
        'dynamodb',
        region_name=os.getenv('AWS_REGION'),
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
    )


# Table references
performers_table = dynamodb.Table('Performers')
judges_table = dynamodb.Table('Judges')
scoreboard_table = dynamodb.Table('Scoreboard')
