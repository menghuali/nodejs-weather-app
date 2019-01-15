console.log('Start of app');

var booking = {
  booked: false
}

console.log(booking.booked);

setTimeout(() => {
  console.log('Inside of callback: ', booking.booked);
}, 2000);

booking.booked = true;

console.log('End of app');
