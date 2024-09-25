from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template(redirect(url_for("home.html")))

@app.route('/<gamename>')
def pre_game1(gamename):
    return render_template(redirect(url_for("pre_game1.html")), gamename="Aritra's Game")

@app.route('/<gamename>')
def pre_game2(gamename):
    return render_template(redirect(url_for("pre_game2.html")), gamename="Space Invaders")

@app.route('/<gamename>')
def pre_game3(gamename):
    return render_template(redirect(url_for("pre_game3.html")), gamename="Flappy Bird")

@app.route('/<gamename>')
def pre_game4(gamename):
    return render_template(redirect(url_for("pre_game4.html")), gamename='Feed The "Python"')

@app.route('/<gamename>')
def pre_game5(gamename):
    return render_template(redirect(url_for("pre_game5.html")), gamename="Memory Mayhem")

@app.route('/<gamename>')
def pre_game6(gamename):
    return render_template(redirect(url_for("pre_game6.html")), gamename="Tetris")

if __name__ == '__main__':
    app.run(debug=True)
