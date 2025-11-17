from flask import Flask, render_template, request, jsonify
from question_generator import generoi_arviointikriteerit

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    try:
        data = request.get_json()
        question = data.get('question', '')
        
        if not question:
            return jsonify({'error': 'No question provided'}), 400
        
        # Generate question data using Gemini
        processed_text = generoi_arviointikriteerit(question)
        
        return jsonify({'result': processed_text})
    except Exception as e:
        app.logger.error(f"Error processing question: {str(e)}")
        return jsonify({'error': f'Error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
