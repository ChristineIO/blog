// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
const express = require('express');
const database = require('./connect.js');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt')
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

userRoutes.route('/users/:id').get(async (req, res) => {
    const db = database.getDb();
    const { id } = req.params;

    // ✅ Validate ObjectId first
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
    }

    try {
        const data = await db.collection('users').findOne({ _id: new ObjectId(id) });

        // ✅ Properly check if data exists
        if (data) {
            res.json(data);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Server error' });
    }
})

userRoutes.route('/users').post(async (req, res) => {
    let db = database.getDb();

    const takenEmail = await db.collection('users').findOne({ email: req.body.email })
    if (takenEmail) {
        res.json({ error: "Email already taken" })
    } else {
        const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS)

        let mongoObject = {
            username: req.body.username,
            email: req.body.email,
            password: hash,
            date: new Date().toISOString(),
            posts: [],
        }
        let data = await db.collection('users').insertOne(mongoObject)
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

// For Login

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
                sameSite: 'strict',
                path: '/',
                secure: process.env.NODE_ENV === 'production'
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
        path: '/',
        httpOnly: true
    })
    return res.json({ success: 'Session Cleared' })
})

userRoutes.route('/users/check-auth').get(async (req, res) => {
    const token = req.cookies.authToken;

    if (token) {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(201);
    }

})

module.exports = userRoutes;