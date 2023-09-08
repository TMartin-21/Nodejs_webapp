const requireOption = require("../requireOption");

/**
 * Update/save an agency to the database with POST.
 * If datas are missing from the POST -> next()
 * else save data.
 */
module.exports = function (objectrepository) {
    const AgencyModel = requireOption(objectrepository, 'AgencyModel');
    
    return function (req, res, next) {
        if ((typeof req.body.name === 'undefined') || 
            (typeof req.body.headquarters === 'undefined') || 
            (typeof req.body.numberOfCoworkers === 'undefined')) {
            return next();
        }

        if (typeof res.locals.agency === 'undefined'){
            res.locals.agency = new AgencyModel(); 
        }

        res.locals.agency.name = req.body.name;
        res.locals.agency.headquarters = req.body.headquarters;
        res.locals.agency.numberOfCoworkers = req.body.numberOfCoworkers;

        res.locals.agency.save((err) => {
            if (err){
                return next(err);
            }

            if (typeof res.locals.heroes === 'undefined') {
                return res.redirect('/agency');
            }

            res.locals.heroes.forEach(element => {
                element.agency = res.locals.agency.name;
                element.save((err) => {
                    if (err) {
                        return next(err);
                    }
                });
            });

            return res.redirect('/agency');
        });
    }
}