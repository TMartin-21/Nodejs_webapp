const Scheme = require('mongoose').Schema;
const db = require('../config/db');

const Agency = db.model('Agency', {
    name: String,
    headquarters: String,
    numberOfCoworkers: Number,
    numberOfHeroes: { type:Number, default: 0 }
});

module.exports = Agency;