const express = require("express")
const app = express()
const port = 5000
const cors = require("cors")
const corsOptions = {
    origin: ["http://localhost:5173"],
}

app.use(cors(corsOptions))

app.get('/', (req, res)=> {
    res.json({ animals: ["cats", "dogs", "birds"] })
    res.send("like")
})

if (port) {
    app.listen(port, () => {
        console.log(`Server started on port ${port}, I love this <3`)
    })
} else {
    app.listen(8000, () => {
        console.log(`I love this <3`)
    })
}