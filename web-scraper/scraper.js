const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const url = 'https://www.apartments.com/elan-mountain-view-mountain-view-ca/c2b84xg/';

function postArrayToCSV(array, filePath) {
    const csvData = array.map(row => `"${row}"`).join('\n');

    fs.writeFile(filePath, csvData, 'utf8', (error) => {
        if (error) {
            console.error('Error writing to CSV file:', error);
        } else {
            console.log('Array successfully posted to CSV file:', filePath);
        }
    });
}

//Get Price data
axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    const price = [];
    $('.pricingColumn.column span[data-monetaryunittype="USD"]').each((index, element) => {
        const rent = $(element).text().trim();
        price.push(rent);
        
    });
    price.splice(price.length / 2, price.length / 2);
    postArrayToCSV(price, './Book1.csv');
  })
  .catch(error => {
    console.log('Error:', error);
  });

//Get sq feet data
axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    const squareFeet = [];
    $('.sqftColumn.column span').each((index, element) => {
        const sqft = $(element).text().trim();
        squareFeet.push(sqft);
    });
    squareFeet.splice(squareFeet.length / 2, squareFeet.length / 2);
    postArrayToCSV(squareFeet, './Book2.csv');
})
.catch(error => {
    console.log('Error:', error);
  });

//Get beds and bath data
  axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
  
    let beds = [];
    $('.priceBedRangeInfo span[class="detailsTextWrapper"]').each((index, element) => {
        const bedData = $(element).text().trim();
        beds.push(bedData);
        
    });
    const cleanBeds = beds.map((row) => {
      return row.replace(/\s+/g, ' ').trim();
    })
    //console.log(cleanBeds);
    postArrayToCSV(cleanBeds, './Book3.csv');
  })
  .catch(error => {
    console.log('Error:', error);
  });