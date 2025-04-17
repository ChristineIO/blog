// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
const express = require('express');
const database = require('./connect.js');
const ObjectId = require('mongodb').ObjectId;
let bcrypt = require('bcryptjs')
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

// when the user makes a request to the backend to see if the space exists, we check if the space exists in the database and return the data to the frontend
postRoutes.route('/spaces/access').post(async (req, res) => {
    let db = database.getDb();
    let data = await db.collection('spaces').findOne({ name: req.body.name })
    if (data) {
        let isMatch = bcrypt.compareSync(req.body.password, data.password)
        if (isMatch) {
            res.json(data)
        } else {
            res.status(401).json({ success: false, message: 'Invalid password sadly <3' })
        }
    } else {
        return res.status(404).json({ success: false, message: 'Space not found' })
    }
})
postRoutes.route('/spaces').post(async (req, res) => {
    let db = database.getDb();
    const takenName = await db.collection('spaces').findOne({ name: req.body.name })
    if (takenName) {
        res.json({ success: false, message: 'Space name already taken' })
    } else {
        let hash = await bcrypt.hash(req.body.password, 6)
        let mongoObject = {
            name: req.body.name,
            password: hash,
            posts: []
        }
        let data = await db.collection('spaces').insertOne(mongoObject)
        res.json({success: true, data})
    }
})

postRoutes.route('/spaces/posts').get(async (req, res) => { 
    let db = database.getDb();
    const space = await db.collection('spaces').findOne({ name: req.body.name })
    if (space) {
        let posts = space.posts
        res.json({ success: true, posts })
    } else {
        res.status(404).json({ success: false, message: 'Space not found' })
     }

})

postRoutes.route('/spaces/posts/:id').get(async (req, res) => { 
    let db = database.getDb();
    const query = {
        _id: ObjectId.isValid(req.params.id)
            ? new ObjectId(req.params.id)
            : req.params.id
    };
    let data = await db.collection('spaces').findOne(
        { "posts._id": query._id },
        {
            projection: {
                "posts.$": 1
            }
        })
    if (data) {
        console.log(data + 'is the data')
        res.json(data)
    } else {
        console.log('unacceptable data is ' + data)
    }
})

postRoutes.route('/spaces/posts').post(verifyToken, async (req, res) => {
    let db = database.getDb();
    let mongoObject = {
        _id: new ObjectId(),
        text: req.body.text,
        user: req.body.user.username,
        date: new Date().toISOString(),
    }
    let data = await db.collection('spaces').updateOne({ name: req.body.name }, { $push: { posts: mongoObject } })
    if (data) {
        return res.json({ success: true, data })
    }
    else {
        console.log('unacceptable data is ' + data)
    }
})

postRoutes.route('/spaces/:name').get(async (req, res) => {
    const db = database.getDb();

    try {
        const space = await db.collection('spaces').findOne({ name: req.params.name });

        if (!space) {
            return res.json({ success: false, message: "Space not found" });
        } else {
            res.json({ success: true, space });            
        }

        
    } catch (err) {
        console.error(err);
    }
});

postRoutes.route('/spaces/posts/userPosts/:user').get(verifyToken, async (req, res) => {
    let db = database.getDb();
    let data = await db.collection('spaces').find({'posts.user': req.body.user.username}).toArray()
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