// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
const express = require('express');
const database = require('./connect.js');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken')

let postRoutes = express.Router();

postRoutes.route('/posts').get(async (req, res) => {
    let db = database.getDb();
    let data = await db.collection('posts').find({}).toArray()

    if (data.length > 0) {
        res.json(data)
    } else {
        throw new Error('data not found')
    }
})

postRoutes.route('/posts/:id').get(async (req, res) => {
    let db = database.getDb();
    let data = await db.collection('posts').findOne({ _id: new ObjectId(req.params.id) })
    if (Object.keys(data.length > 0)) {
        res.json(data)
    } else {
        throw new Error('data not found')
    }
})

postRoutes.route('/create-post').post(verifyToken, async (req, res) => {
    let db = database.getDb();
    let mongoObject = {
        text: req.body.text,
        user: req.body.user.username,
        date: new Date().toISOString(),
    }
    let data = await db.collection('posts').insertOne(mongoObject)
    res.json(data)
})

postRoutes.route('/posts/:id').put(verifyToken, async (req, res) => {
    let db = database.getDb();
    let mongoObject = {
        $set: {
            text: req.body.text,
            user: req.body.user,
            date: new Date().toISOString(),
        }
    }
    let data = await db.collection('posts').updateOne({ _id: new ObjectId(req.params.id) }, mongoObject)
    res.json(data)
})

postRoutes.route('/posts/:id').delete(verifyToken, async (req, res) => {
    let db = database.getDb();
    let data = await db.collection('posts').deleteOne({ _id: new ObjectId(req.params.id) })
    res.json(data)
})

function verifyToken(req, res, next) {
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1]
    if (!token) {
        return res.status(401).json({message: "Authentication token missing"})
    }
    jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
        if (error) {
            return res.status(403).json({message: "Invalid token"})
        }
        req.body.user = user
        next()
    })
}
module.exports = postRoutes;