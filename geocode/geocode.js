const request = require('request');

// Implemented with callbacks
var geocodeAddress = (address, callback) => {
  request({
    url: 'http://www.mapquestapi.com/geocoding/v1/address?key=rJmHlDlCzr2R37oEkCmkpYaxtzxYKz1k&location=' + encodeURIComponent(address),
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to the mapquestapi.com');
    } else {
      // console.log(JSON.stringify(response));
      var location = body.results[0].locations[0];
      var latitude = location.latLng;
      callback(undefined, {
        address: `${location.street}, ${location.adminArea5}, ${location.adminArea3} ${location.postalCode}, ${location.adminArea1}`,
        latitude: latitude.lat,
        longtitude: latitude.lng
      });
    }
  });
};

//Implemented with Promises
// var geocodeAddress = (address) => {
//   return new Promise((resolve, reject) => {
//     request({
//       url: 'http://www.mapquestapi.com/geocoding/v1/address?key=rJmHlDlCzr2R37oEkCmkpYaxtzxYKz1k&location=' + encodeURIComponent(address),
//       json: true
//     }, (error, response, body) => {
//       if (error) {
//         reject('Unable to connect to the mapquestapi.com');
//       } else {
//         // console.log(JSON.stringify(response));
//         var location = body.results[0].locations[0];
//         var latitude = location.latLng;
//         resolve({
//           address: `${location.street}, ${location.adminArea5}, ${location.adminArea3} ${location.postalCode}, ${location.adminArea1}`,
//           latitude: latitude.lat,
//           longtitude: latitude.lng
//         });
//       }
//     });
//   });
// };

module.exports = {
  geocodeAddress
}
