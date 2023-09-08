const requireOption = require("../requireOption");

/**
 * Return all the heroes from the database
 */
module.exports = function (objectrepository) {
    const HeroModel = requireOption(objectrepository, 'HeroModel');
    
    return function (req, res, next) {
        HeroModel.find({}, (err, heroes) => {
            if (err) {
                return next(err);
            }

            res.locals.allheroes = heroes;
            return next();
        });
    }
}