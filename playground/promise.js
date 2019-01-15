var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments must be numbers');
      }
    }, 1500);
  });
};

asyncAdd(10, 7).then(
  (result) => {
    console.log('Result: ', result);
    return asyncAdd(result, '33');
  }).then(
    (result) => {
      console.log('Result 2: ', result);
    }).catch((error) => {
      console.log(error);
    });

// var somePromise = new Promise ((resolve, reject) => {
//   setTimeout(()=>{
//     // resolve('Hey. It worked!');
//     reject('Unable to fulfill promise');
//   }, 2500);
// });
//
// somePromise.then((msg) => {
//   console.log('Success: ', msg);
// }, (error) => {
//   console.log('Error: ', error);
// });
