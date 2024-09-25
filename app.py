from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template(redirect(url_for("home")))

@app.route('/<gamename>')
def pre_game1(gamename):
    return render_template(redirect(url_for("pre_game1")), gamename="Aritra's Game")

@app.route('/<gamename>')
def pre_game2(gamename):
    return render_template(redirect(url_for("pre_game2")), gamename="Space Invaders")

@app.route('/<gamename>')
def pre_game3(gamename):
    return render_template(redirect(url_for("pre_game3")), gamename="Flappy Bird")

@app.route('/<gamename>')
def pre_game4(gamename):
    return render_template(redirect(url_for("pre_game4")), gamename='Feed The "Python"')

@app.route('/<gamename>')
def pre_game6(gamename):
    return render_template(redirect(url_for("pre_game6")), gamename="Tetris")

if __name__ == '__main__':
    app.run(debug=True)