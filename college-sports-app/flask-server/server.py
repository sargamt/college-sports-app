from flask import Flask, jsonify
import requests

app = Flask(__name__)

@app.route('/football/data', methods=['GET'])
def get_football_data():
    try:
        response = requests.get('https://ncaa-api.henrygd.me/rankings/football/fbs/associated-press')
        response.raise_for_status() # Raise HTTPError for bad responses
        data = response.json()
        return jsonify(data)
    
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

# # NCAA API Route Football
# @app.route("/football")
# def football():
#     return {"football": ["Football1", "Football2", "Football3"]}

if __name__ == "__main__":
    app.run(debug=True)

