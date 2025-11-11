from google import genai

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client()

def generate_question_data(question: str) -> str:
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=question
    )
    return response.text
