from flask import jsonify, request
from flask_cors import cross_origin
from app.routes import api
from app import db 
from datetime import datetime
from sqlalchemy import text

@api.route('/logs', methods=['GET'])
@cross_origin()
def get_logs():
  try:
    limit = request.args.get('limit', default=10, type=int)
    current_page = request.args.get('currentPage', default=1, type=int)
    
    # Calculate offset from page number
    offset = (current_page - 1) * limit
    
    # Get total count
    count_sql = text("SELECT COUNT(*) FROM health_data")
    total_count = db.session.execute(count_sql).scalar()
    
    # Get paginated data
    sql = text("""
      SELECT * FROM health_data 
      ORDER BY timestamp DESC
      LIMIT :limit OFFSET :offset
    """)
    
    result = db.session.execute(sql, {'limit': limit, 'offset': offset})
    rows = result.fetchall()
    
    logs = []
    for row in rows:
      logs.append({
        'id': row.id,
        'timestamp': row.timestamp.isoformat(),
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
      
    return jsonify({
      'data': logs,
      'limit': limit,
      'currentPage': current_page,
      'total': total_count
    })

  except Exception as e:
    return jsonify({'error': str(e)}), 500