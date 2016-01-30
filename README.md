# Nodegram [![npm version](https://badge.fury.io/js/nodegram.svg)](https://badge.fury.io/js/nodegram) [![Dependency Status](https://david-dm.org/zzarcon/nodegram.svg)](https://david-dm.org/zzarcon/nodegram)

> Simplest Instagram Api lib in Javascript

Call **any** Instagram Api method in just 10 lines of code

```javascript
var Nodegram = require('nodegram');
var token = 'ACCESS_TOKEN';
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

```

### TODO

* Token generation support
* Testing