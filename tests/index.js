var Nodegram = require('../index');
var token = 'TOKEN';
var gram = new Nodegram({accessToken: token});
var options = {
  '{user-id}': 10499416,
  maxId: 12345,
  count: 30
};

gram.get('/users/{user-id}/media/recent', options).then(onSuccess).catch(onError);

function onSuccess(res, pag) {
  console.log('onSuccess', res, pag);
}

function onError(err) {
  console.log('onError', err);
}