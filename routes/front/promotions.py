from flask import render_template

from app import app


@app.get('/promotions')
def promotions():
    return render_template('promotions.html')
