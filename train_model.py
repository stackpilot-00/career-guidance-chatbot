import os
import pickle
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Ensure models directory exists
os.makedirs('models', exist_ok=True)

# Load dataset
df = pd.read_csv('dataset/career_dataset.csv')

# Split features and target
X = df[['Logical_Thinking', 'Coding', 'Design', 'Communication', 'Management']]
y = df['Role']

# Train simple Random Forest Classifier
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save the trained model
with open('models/career_model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("Model successfully trained and saved to models/career_model.pkl!")
