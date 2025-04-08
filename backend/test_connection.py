from sqlalchemy.sql import text
from database import SessionLocal


def test_connection():
    """
    Test the database connection by executing a simple query.
    """
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        print("Database connection successful!")
    except Exception as e:
        print(f"Database connection failed: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    test_connection()
