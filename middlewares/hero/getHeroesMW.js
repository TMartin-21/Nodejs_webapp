const requireOption = require("../requireOption");

/**
 * Return all the heroes from the database that belongs
 * to :agencyid
 */
module.exports = function (objectrepository) {
    const HeroModel = requireOption(objectrepository, 'HeroModel');
    
    return function (req, res, next) {
        HeroModel.find({ _agency:res.locals.agency._id }, (err, heroes) => {
            if (err) {
                return next(err);
            }

            res.locals.heroes = heroes;
            return next();
        });
    }
}