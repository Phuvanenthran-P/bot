from flask import Flask, request, jsonify
from gpt4all import GPT4All

app = Flask(__name__)
model = GPT4All("gpt4all-falcon-q4_0.gguf")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message")
    response = model.generate(user_input, max_tokens=100)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
