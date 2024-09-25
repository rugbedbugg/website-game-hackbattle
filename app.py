import flask as Flask, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home_redir():
    return redirect(url_for('home.html'))

@app.route('/home')
def homepage():
    return 'home.html'

@app.route('/<gamename>')
def game1():
    return 'game1.html'

@app.route('/<gamename>')
def game2():
    return 'game2.html'

@app.route('/<gamename>')
def game3():
    return 'game3.html'

@app.route('/<gamename>')
def game4():
    return 'game4.html'

if __name__ == '__main__':
    app.run(debug=True)