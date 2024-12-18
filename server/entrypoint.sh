#!/bin/sh

echo "Waiting for postgres..."
while ! nc -z db 5432; do
  sleep 0.1
done
echo "PostgreSQL started"

flask db init
flask db migrate -m "Initial migration"
flask db upgrade

exec gunicorn --bind 0.0.0.0:8000 run:app