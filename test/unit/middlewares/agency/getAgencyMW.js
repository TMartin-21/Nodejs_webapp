var expect = require('chai').expect;
var getAgencyMW = require('../../../../middlewares/agency/getAgencyMW');

describe('getAgencyMW middleware', function() {
    it('should set res.locals.agency with agency from database', function(done) {
        const mw = getAgencyMW({
            AgencyModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({_id: '20'});
                    cb(null, 'mockAgency');
                }
            }
        });
        
        const resMock = { locals:{} };
        mw({
            params: {
                agencyid: '20'
            }
        },
        resMock,
        (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({ agency: 'mockAgency'});
            done();
        });
    });
    it('should call next(error) when there is a problem', function(done) {
        const mw = getAgencyMW({
            AgencyModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({_id: '20'});
                    cb('error', null);
                }
            }
        });
        
        const resMock = { locals:{} };
        mw({
            params: {
                agencyid: '20'
            }
        },
        resMock,
        (err) => {
            expect(err).to.be.eql('error');
            done();
        });
    });
    it('should call next() when agency is not found', function(done) {
        const mw = getAgencyMW({
            AgencyModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({_id: '20'});
                    cb(undefined, null);
                }
            }
        });
        
        const resMock = { locals:{} };
        mw({
            params: {
                agencyid: '20'
            }
        },
        resMock,
        (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({});
            done();
        });
    })
});
