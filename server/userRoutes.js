// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const database = require('./connect.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

let userRoutes = express.Router();
const SALT_ROUNDS = 6
const cookieAge = 24 * 60 * 60 * 1000;

userRoutes.route('/users').get(async (req, res) => {
    let db = database.getDb();
    let data = await db.collection('users').find({}).toArray()
    if (data.length > 0) {
        res.json(data)
    } else {
        throw new Error('data not found')
    }
})

userRoutes.route('/users/check-auth').get(async (req, res) => {
    try {
        //prevent multiple calls
        const token = req.cookies.authToken;
        
        if (!token) {
            return res.status(200).json({ success: false }); 
        }
        // token def exists
        return res.status(200).json({ success: true, token });
        
    } catch (error) {
        console.error("Auth check error: ", error);
        return res.status(500).json({ error: "server error :(" });
    }
});

userRoutes.route('/users/:id').get(async (req, res) => {
    const db = database.getDb();
    // to prevent app from crashing check if id is in objectid format
    const query = {
        _id: ObjectId.isValid(req.params.id)
            ? new ObjectId(req.params.id)
            : req.params.id
    };
    let data = await db.collection('users').findOne(query)
    if (data) {
        res.json(data)
    } else {
        console.log('wrong data is ' + data)
    }
})

userRoutes.route('/users').post(async (req, res) => {
    let db = database.getDb();
    
    const takenUsername = await db.collection('users').findOne({ username: req.body.username })
    console.log(`sending... ${takenUsername}`)
    const takenEmail = await db.collection('users').findOne({ email: req.body.email })
    if (takenUsername && takenEmail) {
        res.json({ error: "Email or/and Username already taken" })
    } else if (takenEmail) {
        res.json({error: "Taken Email"})
    } else if (takenUsername) {
        res.json({error: "Taken Username"})
    }
    else {
        const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS)

        let mongoObject = {
            username: req.body.username,
            email: req.body.email,
            password: hash,
            date: new Date().toISOString(),
            posts: [],
        }
        let data = await db.collection('users').insertOne(mongoObject)
        console.log(data)
        res.json(data)
    }



})

userRoutes.route('/users/:id').put(async (req, res) => {
    let db = database.getDb();
    let mongoObject = {
        $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            date: req.body.date,
            posts: req.body.posts,
        }
    }
    let data = await db.collection('users').updateOne({ _id: new ObjectId(req.params.id) }, mongoObject)
    res.json(data)
})

userRoutes.route('/users/:id').delete(async (req, res) => {
    let db = database.getDb();
    let data = await db.collection('users').deleteOne({ _id: new ObjectId(req.params.id) })
    res.json(data)
})

//For Login

userRoutes.route('/users/login').post(async (req, res) => {
    let db = database.getDb();

    const user = await db.collection('users').findOne({ email: req.body.email })

    if (user) {
        let confirmation = await bcrypt.compare(req.body.password, user.password)
        if (confirmation) {
            const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '12h' })
            res.cookie('authToken', token, {
                httpOnly: true,
                maxAge: cookieAge,
                sameSite: 'none',
                secure: true,
                path: '/'
            })

            res.json({ success: true, token })

        } else {
            res.json({ success: false, message: "password doesn't match our database" })
        }
    } else {
        res.json({ success: false, message: "user not found :( " })
    }

})

userRoutes.route('/users/logout').post(async (req, res) => {
    res.clearCookie('authToken', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        path: '/'
    })
    return res.json({ success: 'Session Cleared' })
})
module.exports = userRoutes;