var Nodegram = require('../index');
var token = 'TOKEN';
var gram = new Nodegram({accessToken: token});
var mediaOptions = {
  '{user-id}': 10499416,
  maxId: 12345,
  count: 30
};
var likeOptions = {
  '{media-id}': 1234
};

gram.get('/users/{user-id}/media/recent', mediaOptions).then(onSuccess).catch(onError);
gram.post('/media/{media-id}/likes', likeOptions).then(onSuccess).catch(onError);
gram.del('/media/{media-id}/likes', likeOptions).then(onSuccess).catch(onError);

function onSuccess(res, pag) {
  console.log('onSuccess', res, pag);
}

function onError(err) {
  console.log('onError', err);
}