# ./server/Dockerfile
FROM python:3.10-slim

# Install netcat
RUN apt-get update && apt-get install -y netcat-openbsd dos2unix

WORKDIR /app
COPY requirements.txt .
RUN pip install gunicorn psycopg2-binary xlsxwriter
RUN pip install -r requirements.txt

# Copy application files
COPY . .

# Fix script line endings and permissions
COPY entrypoint.sh .
RUN dos2unix entrypoint.sh && \
    chmod +x entrypoint.sh

EXPOSE 8000
ENTRYPOINT ["./entrypoint.sh"]