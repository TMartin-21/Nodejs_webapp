const requireOption = require("../requireOption");

/**
 * Update/save a hero to the database with POST.
 * If datas are missing from the POST -> next()
 * else save data.
 */
module.exports = function (objectrepository) {
    const HeroModel = requireOption(objectrepository, 'HeroModel');

    return function (req, res, next) {
        if ((typeof req.body.name === 'undefined') || 
            (typeof req.body.age === 'undefined') || 
            (typeof req.body.superheroName === 'undefined') || 
            (typeof req.body.ability === 'undefined')) {
            return next();
        }

        if (typeof res.locals.hero === 'undefined'){
            res.locals.hero = new HeroModel(); 
            res.locals.agency.numberOfHeroes += 1;
            res.locals.agency.save((err) => {
                if (err) {
                    return next(err);
                }
            });
        }

        res.locals.hero.name = req.body.name;
        res.locals.hero.age = req.body.age;
        res.locals.hero.superheroName = req.body.superheroName;
        res.locals.hero.ability = req.body.ability;
        res.locals.hero.agency = res.locals.agency.name;
        res.locals.hero._agency = res.locals.agency._id;

        res.locals.hero.save((err) => {
            if (err){
                return next(err);
            }
            return res.redirect('/heroes/' + res.locals.agency._id);
        });
    }
}