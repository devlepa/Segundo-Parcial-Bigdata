from fastapi import FastAPI, HTTPException
import mysql.connector
from pydantic import BaseModel

app = FastAPI()

# Configuración de la conexión a la base de datos
def get_db_connection():
    return mysql.connector.connect(
        host="database-parcial2.cqytnzdtjjo3.us-east-1.rds.amazonaws.com",
        user="admin",
        password="your_password",  # Reemplaza con tu contraseña
        database="sakila"
    )

# Pydantic model for data validation
class Category(BaseModel):
    category_id: int
    name: str
    last_update: str

# Endpoint to get categories
@app.get("/categories/")
def get_categories():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM category")
    categories = cursor.fetchall()
    cursor.close()
    connection.close()
    return categories

# Endpoint to add a new category
@app.post("/categories/")
def add_category(category: Category):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute(
        "INSERT INTO category (category_id, name, last_update) VALUES (%s, %s, %s)",
        (category.category_id, category.name, category.last_update)
    )
    connection.commit()
    cursor.close()
    connection.close()
    return {"message": "Category added successfully"}

