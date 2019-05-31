const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')
const port = 9000

app.use(cors());

app.get('/', (req, res) => {
    axios.get('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1')
    .then(response => {
        res.send(response.data[0]);
    })
})

app.listen(port, () => console.log('Example app Listenng on port 9000'))

//asdakjdsajdasdasdaskjdasda