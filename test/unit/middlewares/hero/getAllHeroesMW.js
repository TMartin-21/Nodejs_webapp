var expect = require('chai').expect;
var getAllHeroesMW = require('../../../../middlewares/hero/getAllHeroesMW');

describe('getAllHeroesMW middleware', function() {
    it('should set res.locals.allheroes with hero array from database', function(done) {
        const mw = getAllHeroesMW({
            HeroModel: {
                find: (p1, cb) => {
                    expect(p1).to.be.eql({});
                    cb(null, 'mockHeroes');
                }
            }
        });
        
        const resMock = { locals:{} };
        mw({},
        resMock,
        (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({ allheroes: 'mockHeroes'});
            done();
        });
    });
    it('should call next(error) when there is a problem', function(done) {
        const mw = getAllHeroesMW({
            HeroModel: {
                find: (p1, cb) => {
                    expect(p1).to.be.eql({});
                    cb('error', null);
                }
            }
        });
        
        const resMock = { locals:{} };
        mw({},
        resMock,
        (err) => {
            expect(err).to.be.eql('error');
            expect(resMock.locals).to.be.eql({});
            done();
        });
    });
});
