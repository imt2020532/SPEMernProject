// test/myBackendTest.js

const chai = require('chai');
const chaiHttp = require('chai-http');

// Configure Chai to use chai-http
chai.use(chaiHttp);

const expect = chai.expect;

describe('Backend Tests', () => {
  it('should return a JSON object', async () => {
    chai.request("http://localhost:4000")
    .post('/api/workouts')
    .end((err, res) => {
      if(err) {
        console.error(err);
        return done(err);
      }

      if(typeof res.body === 'object' && res.body !== null) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('workout');
        done();
      } else {
        done(new Error('Incorrect response body format'));
      }
    });
  });
});
