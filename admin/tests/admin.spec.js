const chai = require('chai');
const expect = chai.expect;
const mockAxios = require('jest-mock-axios')
const { getCompanyData, getInvestmentData, getCompanyName } = require("../src/controllers/admin.controller")
const companies = require("../../financial-companies/src/data.json")

describe('Test /getAllHoldings', () => {
  beforeEach(function() {
    this.get = sinon.stub(request, "get")
  })
  afterEach(function() {
    this.get.restore()
  })


  it('should fetch correct financial company data', async () => {
    this.get.yields(null, null, JSON.stringify({ test: "HI" }))
    const actualResult = await getCompanyData()
    expect(actualResult.length).to.equal(3)
    expect(actualResult).to.be.instanceOf(Array)
    expect(actualResult[0]).to.be.instanceOf(Object)
  })

  // it('should should fetch correct investment data', async () => {
  //   const actualResult = await getInvestmentData()
  //   expect(actualResult.length).to.equal(7)
  //   expect(actualResult).to.be.instanceOf(Array)
  //   expect(actualResult[0]).to.be.instanceOf(Object)
  // })

  // it('should return the correct company name', async () => {
  //   const companies = await getCompanyData()
  //   const companyName1 = getCompanyName(companies, '1')
  //   const companyName2 = getCompanyName(companies, '2')
  //   expect(companyName1).to.equal("The Big Investment Company")
  //   expect(companyName2).to.equal("The Small Investment Company")
  // })
})