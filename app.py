from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/Galaxy Impact')
def pre_game1():
    return redirect(url_for("pre_game1"))

@app.route('/Flappy Bird')
def pre_game2():
    return redirect(url_for("pre_game2"))

@app.route('/Feed The "Python"')
def pre_game3():
    return redirect(url_for("pre_game3"))

@app.route("/Black Jack")
def pre_game4():
    return redirect(url_for("pre_game4"))

@app.route('/About Us')
def about_us():
    return render_template('about_us.html')

@app.route('/Rate Us')
def rate_us():
    return render_template('rate_us.html')

if __name__ == '__main__':
    app.run(debug=True)