# Smart Career Guidance Chatbot

An ML-based web chatbot that analyzes professional traits and core skill levels to recommend ideal career path matches.

## Execution Guide

1. **Install Dependencies:**
```bash
pip install -r requirements.txt
```

2. **Train the Model:**
```bash
python train_model.py
```

3. **Run the App:**
```bash
python app.py
```

4. **Open in Browser:**
```
http://127.0.0.1:5000
```

## Project Structure

```
project/
├── dataset/
│   └── career_dataset.csv
├── models/               ← auto-created by train_model.py
├── static/
│   ├── style.css
│   └── script.js
├── templates/
│   ├── index.html
│   └── result.html
├── app.py
├── train_model.py
└── requirements.txt
```

## Tech Stack

- **Backend:** Flask
- **ML Model:** Scikit-learn (Random Forest Classifier)
- **Data Processing:** Pandas, NumPy
- **Frontend:** HTML, CSS, JavaScript
