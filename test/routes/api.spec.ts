import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as mocha from 'mocha';
import app from '../../src/app';

chai.use(chaiHttp);

const expect = chai.expect;

const streetBodyPayload = {
  name: 'TestStreet1',
  start: [1, 0],
  end: [2, 1]
};

describe('apiRoute', () => {
  it('GET /api should respond with HTTP 200 status', async() => {
    const response = await chai.request(app).get('/api');

    expect(response).to.have.status(200);
  });
  it('GET /api should respond with title message', async() => {
    const response = await chai.request(app).get('/api');
    expect(response.body).to.have.property('title').to.be.equal('Drive Distance API');
  });
  it('POST /api/street should respond with 201 status for correct payload body', async () => {
    const response = await chai.request(app).post(`/api/street`).send(streetBodyPayload);
    expect(response.status).to.be.equal(201);
  });
  it('GET /api/closest should respond with 200 status and closest streets list', async () => {
    const response = await chai.request(app).get('/api/closest?x=1&y=1');
    expect(response.status).to.be.equal(200);
  });
});
