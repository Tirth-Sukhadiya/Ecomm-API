const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const mongoose = require('mongoose');
const config = require('../config');
const models = {};

fs.readdirSync(__dirname).filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach((file) => {
    var filename = file.split('.')[0];
    var model_name = filename.charAt(0).toUpperCase() + filename.slice(1);
    console.log(model_name + "   =============     " + file);
    models[model_name] = require('./' + file);
});

mongoose.Promise = global.Promise; //set mongo up to use promises

mongoose.connect(config.dburl).catch((_err) => {
    console.log(`*** Can Not Connect to Mongo Server: ${config.dburl}`, _err);
})

const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to mongo at ' + config.dburl);
});
db.on('error', (error) => {
    console.log("error", error);
});

module.exports = db;
module.exports = models;