const delAgencyMW = require('../middlewares/agency/delAgencyMW');
const getAgenciesMW = require('../middlewares/agency/getAgenciesMW');
const getAgencyMW = require('../middlewares/agency/getAgencyMW');
const saveAgencyMW = require('../middlewares/agency/saveAGencyMW');

const delHeroMW = require('../middlewares/hero/delHeroMW');
const getAllHeroesMW = require('../middlewares/hero/getAllHeroesMW');
const getHeroesMW = require('../middlewares/hero/getHeroesMW');
const getHeroMW = require('../middlewares/hero/getHeroMW');
const saveHeroMW = require('../middlewares/hero/saveHeroMW');

const renderMW = require('../middlewares/render/renderMW');

const AgencyModel = require('../models/agency');
const HeroModel = require('../models/hero');

module.exports = function (app) {
    var objectrepository = {
        AgencyModel: AgencyModel,
        HeroModel: HeroModel
    };

    app.get('/allheroes',
        getAllHeroesMW(objectrepository),
        renderMW(objectrepository, 'allheroes'));

    app.get('/agency',
        getAgenciesMW(objectrepository),
        renderMW(objectrepository, 'agencies'));

    app.use('/agency/new',
        saveAgencyMW(objectrepository),
        renderMW(objectrepository, 'addagency'));

    app.use('/agency/edit/:agencyid',
        getAgencyMW(objectrepository),
        getHeroesMW(objectrepository),
        saveAgencyMW(objectrepository),
        renderMW(objectrepository, 'editagency'));

    app.get('/agency/del/:agencyid',
        getAgencyMW(objectrepository),
        getHeroesMW(objectrepository),
        delAgencyMW(objectrepository));

    app.use('/heroes/:agencyid/new',
        getAgencyMW(objectrepository),
        saveHeroMW(objectrepository),
        renderMW(objectrepository, 'addhero'));

    app.use('/heroes/:agencyid/edit/:heroid',
        getAgencyMW(objectrepository),
        getHeroMW(objectrepository),
        saveHeroMW(objectrepository),
        renderMW(objectrepository, 'edithero'));

    app.get('/heroes/:agencyid/del/:heroid',
        getAgencyMW(objectrepository),
        getHeroMW(objectrepository),
        delHeroMW(objectrepository));

    app.get('/heroes/:agencyid',
        getAgencyMW(objectrepository),
        getHeroesMW(objectrepository),
        renderMW(objectrepository, 'heroes'));

    app.get('/',
        renderMW(objectrepository, 'index'));
}

