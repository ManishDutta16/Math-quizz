from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin


from code_1 import misslen

app = Flask(__name__)

CORS(app, supports_credentials=True)

@app.route('/', methods = ['GET'])
@cross_origin(supports_credentials=True)
def check():
    if(request.method == "GET"):
        solutionSet = misslen()

        print(type(solutionSet))

        return jsonify(solutionSet), 200

# driver function
if __name__ == '__main__':
    app.run(debug = False, host='0.0.0.0')
    # serve(app, host="0.0.0.0", port=8080)