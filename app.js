const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');
const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
}).help().alias('help', 'h').argv;

// Implemented with Promises
// geocode.geocodeAddress(argv.address).then(
//     (location) => {
//       console.log(location.address);
//       return weather.getWeather(location.latitude, location.longtitude);
//     }
//   ).then(
//     (result) => {
//       console.log(`It's currently ${result.temperature}. It feels like ${result.apparentTemperature}.`);
//   }).catch((error) => {
//     console.log(error);
//   });

// Implemented with callbacks
geocode.geocodeAddress(argv.address, (errorMsg, results) => {
  if(errorMsg) {
    console.log(errorMsg);
  } else {
    console.log(results.address);
    weather.getWeather(results.latitude, results.longtitude, (errorMsg, weather) => {
      if (errorMsg) {
        console.log(errorMsg);
      } else {
        console.log(`It's currently ${weather.temperature}. It feels like ${weather.apparentTemperature}.`);
      }
    });
  }
});
