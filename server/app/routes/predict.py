from flask import jsonify, request
from flask_cors import cross_origin
from app.routes import api
from app import db
from datetime import datetime
from sqlalchemy import text

import pickle
import json
import requests
import time
import os

model = pickle.load(open("model.pkl", "rb"))
META_TOKEN = os.getenv('META_TOKEN')
META_URL = os.getenv('META_URL')

def save_health_data(features, prediction, recommendation):
    try:
        sql = text("""
        INSERT INTO health_data (
            timestamp, pregnancies, glucose, blood_pressure, 
            skin_thickness, insulin, bmi, diabetes_pedigree, 
            age, prediction_result, recommendation
        ) VALUES (
            :timestamp, :pregnancies, :glucose, :blood_pressure,
            :skin_thickness, :insulin, :bmi, :diabetes_pedigree,
            :age, :prediction_result, :recommendation
        )
        """)
        
        db.session.execute(sql, {
            'timestamp': datetime.now(),
            'pregnancies': features[0],
            'glucose': features[1],
            'blood_pressure': features[2],
            'skin_thickness': features[3],
            'insulin': features[4],
            'bmi': features[5],
            'diabetes_pedigree': features[6],
            'age': features[7],
            'prediction_result': "Positive" if prediction == 1 else "Negative",
            'recommendation': recommendation
        })
        
        db.session.commit()
        return True
    except Exception as e:
        print(f"Database error: {str(e)}")
        db.session.rollback()
        return False

@api.route('/predict', methods=['POST'])
@cross_origin()
def predict():
  try:
    data = request.get_json()
    features = [
      data.get('pregnancies'),
      data.get('glucose'),
      data.get('blood_pressure'), 
      data.get('skin_thickness'),
      data.get('insulin'),
      data.get('bmi'),
      data.get('diabetes_pedigree'),
      data.get('age')
    ]

    prediction = model.predict([features])[0]

    if prediction == 0:
      result_message = "Hasil Analisa Tidak Mengidap Diabetes"
    else:
      result_message = "Terindikasi Diabetes Melitus, Silahkan Lakukan Pemeriksaan Lebih Lanjut"

    recommendation = generate_recommendation(prediction)
    
    # if recommendation is "Rekomendasi tidak tersedia karena terjadi kesalahan.", do not save to database
    if recommendation != "Rekomendasi tidak tersedia karena terjadi kesalahan.": 
        save_health_data(features, prediction, recommendation)

    return jsonify({
      'prediction': int(prediction),
      'message': result_message,
      'recommendation': recommendation
    })

  except Exception as e:
    return jsonify({'error': str(e)}), 500
  
def generate_recommendation(prediction):
    if prediction == 0:
        prompt = "Beri rekomendasi kesehatan untuk seseorang yang tidak mengidap diabetes."
    elif prediction == 1:
        prompt = "Beri rekomendasi tindakan lanjutan untuk seseorang yang terindikasi mengidap diabetes."
    else:
        return "Prediksi tidak valid."

    try:
        url = META_URL
        headers = {
          "Authorization": f"Bearer {META_TOKEN}",
        }
        payload = json.dumps({
          "model": "google/learnlm-1.5-pro-experimental:free",
          "messages": [
            {
              "role": "system",
              "content": [{
                "type": "text",
                "text": "You are an AI Assistant that provides health recommendations in Indonesian. Please provide a health recommendation based on the following prompt with this criteria:"
              }]
            },
            {
              "role": "system",
              "content": [{
                "type": "text",
                "text": "The recommendation should be a paragraph of text and NOT list."
              }]  
            },
            {
              "role": "user",
              "content": [{
                "type": "text",
                "text": prompt
              }]
            }
          ]
        })
        response = send_api_request(url, headers, payload)
        if response is None:
            return "Error: API tidak merespons setelah beberapa percobaan. Menggunakan rekomendasi default."

        if response.status_code == 200:
            response_data = response.json()
            return response_data["choices"][0]["message"]["content"].strip()
        else:
            print(f"Error: Respon API tidak berhasil. Kode status: {response.status_code}.")
            return "Rekomendasi tidak tersedia karena terjadi kesalahan."

    except Exception as e:
        print(f"Error tidak dikenal: {str(e)}")
        return "Rekomendasi tidak tersedia karena terjadi kesalahan."

def send_api_request(url, headers, payload, retries=5, timeout=60):
    for attempt in range(retries):
        try:
            print(f"Attempt {attempt + 1}: Sending request to API...")
            response = requests.post(url, headers=headers, data=payload, timeout=timeout)
            return response
        except requests.exceptions.Timeout:
            print(f"Timeout on attempt {attempt + 1}. Retrying...")
            time.sleep(2 ** attempt)
        except Exception as e:
            print(f"Error on attempt {attempt + 1}: {str(e)}")
            break
    return None