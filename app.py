from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/<gamename>')
def game1(gamename):
    return render_template('game1.html', gamename="Flappy Bird")

@app.route('/<gamename>')
def game2(gamename):
    return render_template('game2.html', gamename ="Snake Game")

@app.route('/<gamename>')
def game3(gamename):
    return render_template('game3.html', gamename="Space Invaders")

@app.route('/<gamename>')
def game4(gamename):
    return render_template('game4.html', gamename ="no_name")

if __name__ == '__main__':
    app.run(debug=True)
