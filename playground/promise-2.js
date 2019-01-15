const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.mapquestapi.com/geocoding/v1/address?key=rJmHlDlCzr2R37oEkCmkpYaxtzxYKz1k&location=' + encodeURIComponent(address),
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to the mapquestapi.com');
      } else {
        var location = body.results[0].locations[0];
        var latitude = location.latLng;
        resolve({
          address: `${location.street}, ${location.adminArea5}, ${location.adminArea3} ${location.postalCode}, ${location.adminArea1}`,
          latitude: latitude.lat,
          longtitude: latitude.lng
        });
      }
    });
  });
};

geocodeAddress('19146').then(
  (location) => {
    console.log('Resovled: ', location);
  },
  (error) => {
    console.log('Rejected: ', error);
  });
