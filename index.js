import express from 'express';
import bodyParser from 'body-parser';

let app = express();

app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.send('Hello World');
})

let server = app.listen(3000, function() {
    console.log(`Server running at http://localhost:${server.address().port}`);
})
