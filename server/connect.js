require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(process.env.ATLAS_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let database;

module.exports = {
    connectToServer: () => {
        database = client.db('blogsphere_db');
    },
    getDb: () => {
        return database;
    }
}