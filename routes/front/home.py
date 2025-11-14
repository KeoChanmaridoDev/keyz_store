from app import app , render_template

@app.get('/')
def home():
    return render_template('index.html')
