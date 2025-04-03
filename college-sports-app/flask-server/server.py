from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/football/data', methods=['GET'])
def get_football_data():
    try:
        response = requests.get('https://ncaa-api.henrygd.me/rankings/football/fbs/associated-press')
        response.raise_for_status()  # Raise HTTPError for bad responses
        data = response.json()
        return jsonify(data)
    
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/basketball/data', methods=['GET'])
def get_basketball_data():
    try:
        response = requests.get('https://ncaa-api.henrygd.me/standings/basketball-men/d1/sec')
        response.raise_for_status()  # Raise HTTPError for bad responses
        data = response.json()
        return jsonify(data)
    
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/baseball/data', methods=['GET'])
def get_baseball_data():
    try:
        response = requests.get('https://ncaa-api.henrygd.me/rankings/baseball/d1/rpi')
        response.raise_for_status()  # Raise HTTPError for bad responses
        data = response.json()
        return jsonify(data)
    
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

# @app.route('/baseball/roster', methods=['GET'])
# def get_baseball_roster():
#     try:
#         response = requests.get('https://ncaa-api.henrygd.me/standings/basketball-men/d1/sec')
#         response.raise_for_status()  # Raise HTTPError for bad responses
#         data = response.json()
#         return jsonify(data)
    
#     except requests.exceptions.RequestException as e:
#         return jsonify({'error': str(e)}), 500

# @app.route('/schools-list', methods=['GET'])
# def get_schools_list():
#     try:
#         response = requests.get('https://ncaa-api.henrygd.me/schools-index')
#         response.raise_for_status()  # Raise HTTPError for bad responses
#         data = response.json()
#         return jsonify(data)
    
#     except requests.exceptions.RequestException as e:
#         return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)
