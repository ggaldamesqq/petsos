import mysql.connector

def connect_to_database():
    connection = mysql.connector.connect(
        host='petsos.cbtfqyfp0lj1.us-east-1.rds.amazonaws.com',
        user='admin',
        password='4321Xalito.',
        database='petsos'
    )
    
    return connection