const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')
const port = 9000

app.use(cors());

app.get('/:title', (req, res) => {
    axios.get('url')
})

app.listen(port, () => console.log('Example app Listenng on port 9000'))