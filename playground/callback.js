var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'Menghua'
  };

  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(31, (userObj) => {
  console.log(userObj);
});
