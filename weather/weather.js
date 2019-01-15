const request = require('request');

// Implemented with callbacks
var getWeather = (lat, lng, callback) => {
  request({
      url: `https://api.darksky.net/forecast/aeee3d09d87395f5bb5c2bbf9e869be7/${lat},${lng}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback('Unable to connect to forecast.io service');
      } else if (response.statusCode === 403) {
        callback('The connection to forecast.io service is forbidened');
      } else if (response.statusCode === 400) {
        callback('Bad request');
      } else if (response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      }
    }
  );
};

// Implemented with Promises
var getWeatherPromise = (lat, lng) => {
  return new Promise((resolve, reject) => {
    request({
        url: `https://api.darksky.net/forecast/aeee3d09d87395f5bb5c2bbf9e869be7/${lat},${lng}`,
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject('Unable to connect to forecast.io service');
        } else if (response.statusCode === 403) {
          reject('The connection to forecast.io service is forbidened');
        } else if (response.statusCode === 400) {
          reject('Bad request');
        } else if (response.statusCode === 200) {
          resolve({
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature
          });
        }
      }
    );
  });
};

module.exports = {
  getWeather
};
