import pymysql

conn = pymysql.connect(
    host="database-parcial2.cqytnzdtjjo3.us-east-1.rds.amazonaws.com",
    user="admin",
    password="20022105",
    database="sakila",
    port=3306
)

print("✅ Conexión exitosa")
conn.close()
