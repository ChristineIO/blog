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

postRoutes.route('/posts/userPosts/:user').get(async (req, res) => {
    let db = database.getDb();
    const query = {
        user:
            ObjectId.isValid(req.params.user)
                ?
                new ObjectId(req.params.user)
                :
                req.params.user
    };
    let data = await db.collection('posts').find(query).toArray()
    if (data) {
        res.json(data)
    } else {
        console.error(data)
    }
})

postRoutes.route('/posts/:id').get(async (req, res) => {
    let db = database.getDb();
    const query = {
        _id: ObjectId.isValid(req.params.id)
            ? new ObjectId(req.params.id)
            : req.params.id
    };
    let data = await db.collection('posts').findOne(query)
    if (data) {
        res.json(data)
    } else {
        console.log('unacceptable data is ' + data)
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
    const token = req.cookies.authToken

    if (!token) {
        return res.status(401).json({ success: false, message: "Authentication token missing" })
    }
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            res.clearCookie('authToken', { path: '/' })
            return res.status(403).json({ success: false, message: "Invalid session" });
        }
        req.body.user = decoded
        next()
    })
}
module.exports = postRoutes;