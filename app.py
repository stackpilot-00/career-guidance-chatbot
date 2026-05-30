import os
import pickle
import numpy as np
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Load the trained model
MODEL_PATH = 'models/career_model.pkl'
if os.path.exists(MODEL_PATH):
    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)
else:
    model = None

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if not model:
        return jsonify({'error': 'Model not trained yet. Please run train_model.py first.'}), 500
    
    try:
        data = request.json
        # Extract features sent by client
        features = [
            int(data.get('Logical_Thinking', 3)),
            int(data.get('Coding', 3)),
            int(data.get('Design', 3)),
            int(data.get('Communication', 3)),
            int(data.get('Management', 3))
        ]
        
        # Predict career role
        prediction = model.predict([features])[0]
        return jsonify({'recommended_role': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/result')
def result():
    role = request.args.get('role', 'Unknown Role')
    return render_template('result.html', role=role)

if __name__ == '__main__':
    app.run(debug=True)
