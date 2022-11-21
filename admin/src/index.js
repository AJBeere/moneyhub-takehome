const express = require("express")
const config = require("config")
const axios = require("axios");
const R = require('ramda')
const adminController = require('./controllers/admin.controller')

const app = express()

app.use(express.json({limit: "10mb"}))

app.get("/investments/:id", async (req, res) => {
  const {id} = req.params
  try {
    const { data } = await axios.get(`${config.investmentsServiceUrl}/investments/${id}`)
    const investment = data[0]
    res.send(data)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

app.post("/holdingsReport", async (req, res) => {
  try {
    const investmentData = await adminController.getInvestmentData()
    const companyData = await adminController.getCompanyData()
    const allHoldings = adminController.generateHoldingsReport(investmentData, companyData)
    try {
      await axios.post(`${config.investmentsServiceUrl}/investments/export`, allHoldings)
      res.sendStatus(201)
    } catch (e) {
      res.sendStatus(500)
    }
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})

module.exports = app
