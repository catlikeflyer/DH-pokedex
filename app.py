from flask import Flask, redirect, url_for, render_template, request

app = Flask(__name__)

@app.route("/")
@app.route("/main")
def main():
    return render_template('index.html')

@app.route("/<pokemon>")
def pokemon(pokemon):
    pass

if __name__ == "__main__":
    app.run(debug=True)