const R = require('ramda');

const investments = [
  {
    id: "1",
    userId: "1",
    firstName: "Billy",
    lastName: "Bob",
    investmentTotal: 1400,
    date: "2020-01-01",
    holdings: [
      {
        id: "2",
        investmentPercentage: 1
      }
    ]
  },
  {
    id: "2",
    userId: "2",
    firstName: "Sheila",
    lastName: "Aussie",
    investmentTotal: 20000,
    date: "2020-01-01",
    holdings: [
      {
        id: "1",
        investmentPercentage: 0.5
      },
      {
        id: "2",
        investmentPercentage: 0.5
      }
    ]
  },
  {
    id: "3",
    userId: "1",
    firstName: "Billy",
    lastName: "Bob",
    investmentTotal: 1300,
    date: "2020-02-01",
    holdings: [
      {
        id: "2",
        investmentPercentage: 1
      }
    ]
  },
  {
    id: "4",
    userId: "2",
    firstName: "Sheila",
    lastName: "Aussie",
    investmentTotal: 22000,
    date: "2020-02-01",
    holdings: [
      {
        id: "1",
        investmentPercentage: 0.5
      },
      {
        id: "2",
        investmentPercentage: 0.5
      }
    ]
  },
  {
    id: "5",
    userId: "1",
    firstName: "Billy",
    lastName: "Bob",
    investmentTotal: 12000,
    date: "2020-03-01",
    holdings: [
      {
        id: "2",
        investmentPercentage: 1
      }
    ]
  },
  {
    id: "6",
    userId: "2",
    firstName: "Sheila",
    lastName: "Aussie",
    investmentTotal: 21500,
    date: "2020-03-01",
    holdings: [
      {
        id: "1",
        investmentPercentage: 0.5
      },
      {
        id: "2",
        investmentPercentage: 0.3
      },
      {
        id: "3",
        investmentPercentage: 0.2
      }
    ]
  },
  {
    id: "7",
    userId: "3",
    firstName: "John",
    lastName: "Smith",
    investmentTotal: 150000,
    date: "2020-03-01",
    holdings: [
      {
        id: "1",
        investmentPercentage: 0.8
      },
      {
        id: "3",
        investmentPercentage: 0.2
      }
    ]
  }
];

const companies = [
  {
    id: "1",
    name: "The Big Investment Company",
    address: "14 Square Place",
    postcode: "SW18UU",
    frn: "234165"
  },
  {
    id: "2",
    name: "The Small Investment Company",
    address: "12 Circle Square",
    postcode: "SW18UD",
    frn: "773388"
  },
  {
    id: "3",
    name: "Capital Investments",
    address: "1 Capital Road",
    postcode: "SW18UT",
    frn: "078592"
  }
];

/*
  - generate report array
  - for each user
  - for each holding
  - create new object
  - user = userId
  - firstname,
  - lastname,
  - date,
  - holding = getCompanyName
  - value = totalValue * investment percentage
*/

const getCompanyName = (id) => companies.find(company => company.id === id).name;

const chainIndexed = R.addIndex(R.chain);
const mapIndexed = R.addIndex(R.map);

const allHoldings = chainIndexed((investment, investmentIndex) =>
    mapIndexed((holding, holdingIndex) => ({
        User: investment.userId,
        "First Name": investment.firstName,
        "Last Name": investment.lastName,
        Date: investment.date,
        Holding: getCompanyName(holding.id),
        Value: investment.investmentTotal * holding.investmentPercentage,
    }), investment.holdings), investments);

console.log(allHoldings);

// const generateCSV = () => {
//   // const allHoldings = [];
//   return JSON.stringify(investments.map(investment => {
//     return investment.holdings.map(holding => {
//       return {
//         User: investment.userId,
//         "First Name": investment.firstName,
//         "Last Name": investment.lastName,
//         Date: investment.date,
//         Holding: getCompanyName(holding.id),
//         Value: investment.investmentTotal * holding.investmentPercentage,
//       }
//       //allHoldings.push(result);
//     });
//   }).flat());
//   // return JSON.stringify(allHoldings);
// }

// console.log(generateCSV());