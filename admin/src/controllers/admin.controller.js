const axios = require('axios')
const config = require("config")
const R = require('ramda')

exports.getCompanyName = function(companyData, id) {
  return R.find(R.propEq('id', id))(companyData).name
}

exports.getInvestmentData = async function() {
  try {
    const { data: investmentData } = await axios.get(`${config.investmentsServiceUrl}/investments`)
    return investmentData
  } catch (e) {
    console.error(e)
  }
}

exports.getCompanyData = async function() {
  try {
    const { data: companyData } = await axios.get(`${config.financialCompaniesServiceUrl}/companies`)
    return companyData
  } catch (e) {
    console.error(e)
  }
}

exports.generateHoldingsReport = function(investmentData, companyData) {
  const chainIndexed = R.addIndex(R.chain);
  const mapIndexed = R.addIndex(R.map);

  return chainIndexed((investment, investmentIndex) =>
  mapIndexed((holding, holdingIndex) => ({
      User: investment.userId,
      "First Name": investment.firstName,
      "Last Name": investment.lastName,
      Date: investment.date,
      Holding: this.getCompanyName(companyData, holding.id),
      Value: investment.investmentTotal * holding.investmentPercentage,
  }), investment.holdings), investmentData);
}