import json
from flask import Flask, render_template

app = Flask(__name__)

def load_projects():
    with open('data/projects.json') as f:
        return json.load(f)['projects']

@app.route('/')
def index():
    projects = load_projects()
    return render_template('index.html', projects=projects)

@app.route('/resume')
def resume():
    return render_template('resume.html')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
