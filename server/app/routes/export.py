from flask import jsonify, send_file
from flask_cors import cross_origin
from app.routes import api
from app import db
from datetime import datetime
from sqlalchemy import text
import pandas as pd
import io
import xlsxwriter

@api.route('/export', methods=['GET'])
@cross_origin()
def export_current_month():
  try:
    # Get current month's data
    sql = text("""
      SELECT * FROM health_data 
      WHERE EXTRACT(MONTH FROM timestamp) = EXTRACT(MONTH FROM CURRENT_DATE)
      AND EXTRACT(YEAR FROM timestamp) = EXTRACT(YEAR FROM CURRENT_DATE)
      ORDER BY timestamp DESC
    """)
    
    result = db.session.execute(sql)
    rows = result.fetchall()
    
    # Convert to list of dictionaries
    data = []
    for row in rows:
      data.append({
        'timestamp': (row.timestamp + pd.Timedelta(hours=7)).isoformat(),
        'pregnancies': row.pregnancies,
        'glucose': row.glucose,
        'blood_pressure': row.blood_pressure,
        'skin_thickness': row.skin_thickness,
        'insulin': row.insulin,
        'bmi': row.bmi,
        'diabetes_pedigree': row.diabetes_pedigree,
        'age': row.age,
        'prediction_result': row.prediction_result,
        'recommendation': row.recommendation
      })
      
    if not data:
      return jsonify({'error': 'No data found for current month'}), 404

    # Create DataFrame and export to Excel
    df = pd.DataFrame(data)
    
    # Create Excel file in memory
    output = io.BytesIO()
    with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
      df.to_excel(writer, index=False, sheet_name='Health Data')
    output.seek(0)
    
    # Generate filename with current month and year
    filename = f"health_data_{datetime.now().strftime('%B_%Y')}.xlsx"
    
    return send_file(
      output,
      mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      as_attachment=True,
      download_name=filename
    )

  except Exception as e:
    return jsonify({'error': str(e)}), 500