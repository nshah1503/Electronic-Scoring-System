from flask import Flask
from flask_cors import CORS
from routes.admin_routes import admin_routes
from routes.judge_routes import judge_routes
from routes.scoreboard_routes import scoreboard_routes

app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:5174"]}})
# CORS(app, supports_credentials=True, headers="Content-Type")

# Register blueprints
app.register_blueprint(admin_routes, url_prefix="/admin")
app.register_blueprint(judge_routes, url_prefix="/judge")
app.register_blueprint(scoreboard_routes, url_prefix="/scoreboard")

if __name__ == '__main__':
    app.run(debug=True)



# curl -X POST http://127.0.0.1:5000/admin/update-status -H "Content-Type: application/json" -d '{"performer_id": "1", "status": "performing"}'
# curl http://127.0.0.1:5000/admin/performers
# curl -X POST http://127.0.0.1:5000/judge/submit-score -H "Content-Type: application/json" -d '{
#   "performerId": "performer1",
#   "judgeId": "judge2",
#   "scores": {
#     "category1": 2,
#     "category2": 5,
#     "category3": 3,
#     "category4": 5,
#     "category5": 4
#   }
# }'
# curl http://127.0.0.1:5000/scoreboard/final-scores

# i also want that once all judges have voted, the status of performer who was performing should change to "performed"
