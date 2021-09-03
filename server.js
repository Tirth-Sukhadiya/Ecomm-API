const express = require("express");
const cors = require('cors');
var bodyParser = require('body-parser')
const config = require('./config');
const router = require('./modules/controller/routers');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Check for routers
app.use(router);

app.listen(config.port, function () {
    console.log("Server is running on Port: " + config.port);
});

module.exports = app