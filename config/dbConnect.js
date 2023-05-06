import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_DB_CONN;
const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
};

let client;
let dbConnect;

if (!process.env.MONGO_DB_CONN) {
	throw new Error(
		'Please define the MONGODB_URI environment variable inside .env.local'
	);
}

if (process.env.NODE_ENV === 'development') {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options);
		global._mongoClientPromise = client.connect();
	}
	dbConnect = global._mongoClientPromise;
} else {
	client = new MongoClient(uri, options);
	dbConnect = client.connect();
}

export default dbConnect;
