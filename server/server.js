// import { createRequire } from 'module'
// const require = createRequire(import.meta.url);
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config({ path: './config.env' })
const { connect, connectToServer } = require('./connect.js')
const postRoutes = require('./postRoutes.js')

const app = express()
console.log(process.env)
const port = 5000
const mongoUrl = process.env.MONGO_URL
const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}

mongoose.connect("mongodb://localhost:27017/blogsphere_db").then(() => {
    console.log('database connected')
})

app.use(cors(corsOptions))
app.use(express.json())
app.use(postRoutes);

let posts = [
    {
        id: 1,
        text: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
        user: "bangchan202",
        date: 'new Date.toISOString()',
    },
    {
        id: 2,
        text: `aeweSewaewd ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum qis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
        user: "hyunji302",
        date: 'new Date.toISOString()',
    },
    {
        id: 3,
        text: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
        user: "yeji702",
        date: 'new Date.toISOString()',
    },
    {
        id: 4,
        text: `Sut I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who a`,
        user: "jennieruby02",
        date: 'new Date.toISOString()',
    }

]

app.get('/', (req, res) => {
    res.json(posts)
})

app.get('/api/posts', (req, res) => {
    res.json(posts)
})

app.post('/api/posts', (req, res) => {
    const { text, user } = req.body;
    if (!text || !user) return res.status(400).json({ message: "Missing text or user" });

    const newPost = {
        id: posts.length + 1,
        text,
        user,
        date: new Date().toISOString(),
    };
    posts.push(newPost);
    res.status(201).json(newPost);
})

if (port) {
    app.listen(port, () => {
        connectToServer()
        console.log(`Server started on port ${port}, I love this <3`)
    })
} else {
    app.listen(8000, () => {
        connectToServer()
        console.log(`I love this <3`)
    })
}