const yargs = require('yargs');
const axios = require('axios');
const fs = require('fs');

const argv = yargs.options({
  a: {
    demand: false,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
}).help().alias('help', 'h').argv;

var fetchPreviousLocation = () => {
  try {
    var location = fs.readFileSync('location.json');
    return JSON.parse(location);
  } catch (e) {
    return undefined;
  }
};

var saveLocaiton = (address, lat, lng) => {
  fs.writeFileSync('location.json', JSON.stringify({address, lat, lng}));
};

var getWeaher = (lat, lng) => {
  axios.get(`https://api.darksky.net/forecast/aeee3d09d87395f5bb5c2bbf9e869be7/${lat},${lng}`).then((response) => {
    console.log(`It's currently ${response.data.currently.temperature}. It feels like ${response.data.currently.apparentTemperature}.`);
  }).catch((e) => {
      console.log(e.message);
  });
};

if (argv.address === undefined || argv.address === '') {
  console.log('Address is missing. Use previous location if any.');
  var location = fetchPreviousLocation();
  if (location === undefined) {
    console.warn('No previous locatin found');
  } else {
    console.log(location.address);
    getWeaher(location.lat, location.lng);
  }
} else {
  var encodedAddress = encodeURIComponent(argv.address);
  var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=rJmHlDlCzr2R37oEkCmkpYaxtzxYKz1k&location=${encodedAddress}`;
  // Implemented using axios (request implemented with Promises)
  axios.get(geocodeUrl).then((response) => {
    var location = response.data.results[0].locations[0];
    var address = `${location.street}, ${location.adminArea5}, ${location.adminArea3} ${location.postalCode}, ${location.adminArea1}`;
    var lat = location.latLng.lat;
    var lng = location.latLng.lng;
    console.log(address);
    saveLocaiton(address, lat, lng)
    getWeaher(lat, lng);
  }).catch((e) => {
      console.log(e.message);
  });
}
