const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')
const port = 9000

app.use(cors());

app.get('/', (req, res) => {
    axios.get('https://www.reddit.com/r/MotivationalPics/.api')
    .then(response => {
        res.send(response.data.data.children)
    })
})

app.listen(port, () => console.log('Example app Listenng on port 9000'))

//asdakjdsajdasdasdaskjdasda