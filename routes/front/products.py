
from app import app , render_template

@app.get('/products')
def products():
    return render_template('products.html')