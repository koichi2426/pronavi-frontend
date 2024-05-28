from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # CORSを有効にする

# Generate random names for initial data
first_names = ["John", "Jane", "Alice", "Bob", "Charlie", "Daisy", "Edward", "Fiona", "George", "Hannah"]
last_names = ["Doe", "Smith", "Brown", "Johnson", "Taylor", "Wilson", "Evans", "Thomas", "Roberts", "Lewis"]

def generate_random_name():
    return f"{random.choice(first_names)} {random.choice(last_names)}"

# 初期データ
users = [
    {"User_id": "eAxVXJic5qdIJdmAEugPHxuti502", "User_name": generate_random_name(), "Department_id": random.randint(1, 6), "Status_id": random.randint(1, 6)}
] + [
    {"User_id": str(i), "User_name": generate_random_name(), "Department_id": random.randint(1, 6), "Status_id": random.randint(1, 6)}
    for i in range(1, 100)
]

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    new_user = {
        "User_id": str(len(users)),
        "User_name": data['User_name'],
        "Department_id": data['Department_id'],
        "Status_id": 1
    }
    users.append(new_user)
    return jsonify({"registration": True})

@app.route('/userget', methods=['GET'])
def user_get():
    return jsonify(users)

@app.route('/updatestatus', methods=['POST'])
def update_status():
    data = request.get_json()
    for user in users:
        if user["User_id"] == data["User_id"]:
            user["Status_id"] = data["Status_id"]
            return jsonify({"update": True})
    return jsonify({"update": False}), 404

if __name__ == '__main__':
    app.run(port=3001, debug=True)