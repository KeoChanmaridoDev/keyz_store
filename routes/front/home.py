from app import app , render_template

@app.get('/')
@app.get('/home')
def home():
    return render_template('index.html')
