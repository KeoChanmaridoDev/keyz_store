from app import app, render_template


@app.get('/product')
def product():
    return render_template('product.html')
