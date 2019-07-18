from pymongo import MongoClient

MONGO_DB_HOST = 'localhost'
MONGO_DB_PORT = 27017
DB_NAME = 'trendy'

# every time mongodb_client is imported, only one client is created
client = MongoClient(MONGO_DB_HOST, MONGO_DB_PORT)

def get_db(db = DB_NAME):
	db = client[db]
	return db