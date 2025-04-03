# Dockerfile

FROM python:3.12-slim

WORKDIR /app

COPY . /app

# Instalamos los paquetes Python desde requirements.txt
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Comando para iniciar la aplicación
CMD ["uvicorn", "main:app", "--host", "ec2-3-87-13-80.compute-1.amazonaws.com", "--port", "8000"]

