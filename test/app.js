const app = require('../app');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);


describe('/GET wishlist', () => {
    it('it should GET all the wishlists', (done) => {
        chai.request(app)
            .get('/api/v1/wishlists/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(4);
                done();
            });
    });
});
























// describe('wishlists', function () {
//     it('should return 200 response code', function (done) {
//         request.get(endpoint, function (error, response){
//             expect(response.statusCode).toEqual(200);
//             done();
//         });
//     });
// });

