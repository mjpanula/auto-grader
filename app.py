from flask import Flask, render_template, request, jsonify
from question_generator import generate_question_data

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    data = request.get_json()
    question = data.get('question', '')
    
    # For now, just echo the input
    processed_text = generate_question_data(question)
    
    return jsonify({'result': processed_text})

if __name__ == '__main__':
    app.run(debug=True)
