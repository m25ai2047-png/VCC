from flask import Flask
import multiprocessing

app = Flask(__name__)

def load_test():
    while True:
        pass

@app.route("/")
def home():
    return "Hybrid Scaling"

@app.route("/load")
def load():
    p = multiprocessing.Process(target=load_test)
    p.start()

    return "CPU load started"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
