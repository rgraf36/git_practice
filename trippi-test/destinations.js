const csv = require('csv-parser');
const fs = require('fs');

class Destination {
    constructor(city, country, continent, vacationType, airportCode) {
        this.City = city;
        this.Country = country;
        this.Continent = continent;
        this["Vacation type"] = vacationType;
        this["Airport Code"] = airportCode;
    }
}

const results = [];
fs.createReadStream('./destinationData.csv')
  .pipe(csv())
  .on('data', (data) => {
    const destination = new Destination(data.City, data.Country, data.Continent, data['Vacation Type'], data['Airport Code']);
    results.push(destination);
  })
  .on('end', () => {
    const arraySelector = Math.floor(Math.random()*results.length);
    const destCity = (results[arraySelector].City);
    const destCode = (results[arraySelector]["Airport Code"]);
    console.log(`Randomizer complete! You're next trip will be to ${destCity}! Please select ${destCode} when booking your flights.`);
  });
