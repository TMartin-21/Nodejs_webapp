const Scheme = require('mongoose').Schema;
const db = require('../config/db');
const Agency = require('./agency');

const Hero = db.model('Hero', {
    name: String,
    age: Number,
    superheroName: String,
    ability: String,
    agency: String,
    _agency: {
        type: Scheme.Types.ObjectId,
        ref: 'Agency'
    }
});

module.exports = Hero;