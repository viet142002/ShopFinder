const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(__dirname + '/../public'));

app.use('/api/v1', require('../src/routes'));

app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Endpoint not found',
    });
});

module.exports = app;
