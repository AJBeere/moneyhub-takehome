const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const nock = require('nock')
const adminController = require('../src/controllers/admin.controller')
const app = require('../src/index')

chai.use(chaiHttp);

const mockInvestment = [{
  "id": "2",
  "userId": "2",
  "firstName": "Sheila",
  "lastName": "Aussie",
  "investmentTotal": 20000,
  "date": "2020-01-01",
  "holdings": [{"id": "1", "investmentPercentage": 0.5}, {"id": "2", "investmentPercentage": 0.5}]
}]

const mockCompanies = [
  {
    "id": "1",
    "name": "The Big Investment Company",
    "address": "14 Square Place",
    "postcode": "SW18UU",
    "frn": "234165",
  }, {
    "id": "2",
    "name": "The Small Investment Company",
    "address": "12 Circle Square",
    "postcode": "SW18UD",
    "frn": "773388",
  },
]

const mockReport = [
  {
    User: '2',
    'First Name': 'Sheila',
    'Last Name': 'Aussie',
    Date: '2020-01-01',
    Holding: 'The Big Investment Company',
    Value: 10000
  },
  {
    User: '2',
    'First Name': 'Sheila',
    'Last Name': 'Aussie',
    Date: '2020-01-01',
    Holding: 'The Small Investment Company',
    Value: 10000
  }
]

describe('/POST holdingsReport', () => {
  it("returns the expected investment data", async () => {
    nock('http://localhost:8081')
      .get('/investments')
      .reply(200, {
        data: mockInvestment
      })
      const { data } = await adminController.getInvestmentData()
      expect(data[0].firstName).to.equal('Sheila')
  })

  it("returns the expected company data", async () => {
    nock('http://localhost:8082')
      .get('/companies')
      .reply(200, {
        data: mockCompanies
      })
      const { data } = await adminController.getCompanyData()
      expect(data.length).to.equal(2)
  })

  it("generates the expected report", async () => {
    const report = adminController.generateHoldingsReport(mockInvestment, mockCompanies)
    expect(report.length).to.equal(2)
  })

  it("posts to the /exports route", async () => {
    nock('http://localhost:8081')
    .get('/investments')
    .reply(200, {
      data: mockInvestment
    })
    nock('http://localhost:8082')
      .get('/companies')
      .reply(200, {
        data: mockCompanies
      })
      
    chai.request('http://localhost:8083')
      .post('/holdingsReport')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(201)
      })
  })

  it("responds with 500 if can't connect with other microservices", () => {
    nock('http://localhost:8081')
    .get('/investments')
    .reply(500)
    
    chai.request('http://localhost:8083')
    .post('/holdingsReport')
    .end((err, res) => {
      expect(res).to.have.status(500)
    })
  })
})