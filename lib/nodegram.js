var request = require('superagent');
var Promise = require('rsvp').Promise;
var protocol = 'https';
var host = 'api.instagram.com';
var version = 'v1';

function Nodegram(options) {
  if (!options || !options.accessToken) {
    throw new Error('Nodegram expect an accessToken');
  }

  this.accessToken = options.accessToken;
}

Nodegram.prototype.get = function(path, options) {
  var url = this.buildUrl(path, options);

  return new Promise(function(resolve, reject) {
    request.get(url).end(function(err, res) {
      if (err) return reject(err);

      var body = res.body;
      var data = body ? body.data : [];
      var pagination = body ? body.pagination : {};

      resolve(data, pagination);
    });
  });
};

Nodegram.prototype.post = function(path, options) {
  var url = this.buildUrl(path, options);

  return new Promise(function(resolve, reject) {
    request.post(url).end(function(err, res) {
      if (err) return reject(err);
      
      resolve(res.body);
    });
  });
};

Nodegram.prototype.del = function(path, options) {
  var url = this.buildUrl(path, options);

  return new Promise(function(resolve, reject) {
    request.del(url).end(function(err, res) {
      if (err) return reject(err);
      
      resolve(res.body);
    });
  });
};

Nodegram.prototype.buildUrl = function(path, options) {
  var newPath = this.buildPath(path, options);
  var queryParams = this.buildQueryParams(newPath.options);
  var url = protocol + '://' + host + '/' + version + newPath.path + '?' + queryParams;

  return url;
};

Nodegram.prototype.buildQueryParams = function(options) {
  var query = [];

  options.access_token = this.accessToken;

  for (var prop in options) {
    if (options.hasOwnProperty(prop)) {
      query.push(prop + '=' + options[prop]);
    }
  }

  return query.join('&');
}

Nodegram.prototype.buildPath = function(path, options) {
  for (var prop in options) {
    if (options.hasOwnProperty(prop) && prop.indexOf('{') > -1 && prop.indexOf('}') > -1) {
      path = path.replace(prop, options[prop]);
      delete options[prop];
    }
  }

  return {
    path: path,
    options: options
  };
}

module.exports = Nodegram;