var request = require('superagent');
var Promise = require('rsvp').Promise;
var protocol = 'https';
var host = 'api.instagram.com';
var apiVersion = 'v1';

function Nodegram(options) {
  options = options || {};

  if (!options || !options.accessToken) {
    // throw new Error('Nodegram expect an accessToken');
  }

  this.accessToken = options.accessToken;
  this.clientId = options.clientId;
  this.clientSecret = options.clientSecret;
  this.redirectUri = options.redirectUri;
}

Nodegram.prototype.get = function(path, options) {
  var url = this.buildUrl('/' + apiVersion + path, options);

  return new Promise(function(resolve, reject) {
    request.get(url).end(function(err, res) {
      if (err) return reject(err);

      var body = res.body;
      var data = body ? body.data : [];
      var pagination = body ? body.pagination : {};

      resolve({
        data: data,
        pagination: pagination
      });
    });
  });
};

Nodegram.prototype.post = function(path, options) {
  var url = this.buildUrl('/' + apiVersion + '/' + path, options);

  return new Promise(function(resolve, reject) {
    request.post(url).end(function(err, res) {
      if (err) return reject(err);
      
      resolve(res.body);
    });
  });
};

Nodegram.prototype.del = function(path, options) {
  var url = this.buildUrl('/' + apiVersion + '/' + path, options);

  return new Promise(function(resolve, reject) {
    request.del(url).end(function(err, res) {
      if (err) return reject(err);
      
      resolve(res.body);
    });
  });
};

Nodegram.prototype.getAuthUrl = function() {
  return this.buildUrl('/oauth/authorize', {
    client_id: this.clientId,
    redirect_uri: this.redirectUri,
    response_type: 'code'
  });
};

Nodegram.prototype.getAccessToken = function(code) {
  return new Promise(function(resolve, reject) {
    var url = this.buildUrl('/oauth/access_token');

    request.post(url)
      .type('form')
      .send({client_id: this.clientId})
      .send({client_secret: this.clientSecret})
      .send({redirect_uri: this.redirectUri})
      .send({code: code})
      .send({grant_type: 'authorization_code'})
      .end(function(err, res) {
        if (err) return reject(err);

        resolve(res.body);
      });
  }.bind(this));
};

Nodegram.prototype.buildUrl = function(path, options) {
  var newPath = this.buildPath(path, options);
  var queryParams = this.buildQueryParams(newPath.options);
  var url = protocol + '://' + host + newPath.path + queryParams;

  return url;
};

Nodegram.prototype.buildQueryParams = function(options) {
  var query = [];

  if (this.accessToken) {
    options.access_token = this.accessToken;
  }

  for (var prop in options) {
    if (options.hasOwnProperty(prop)) {
      query.push(prop + '=' + options[prop]);
    }
  }

  if (query.length) {
    return '?' + query.join('&');
  }

  return '';
};

Nodegram.prototype.buildPath = function(path, options) {
  var optionsLeft = {};
  for (var prop in options) {
    if (options.hasOwnProperty(prop) && prop.indexOf('{') > -1 && prop.indexOf('}') > -1) {
      path = path.replace(prop, options[prop]);
    } else if (prop.indexOf('{') < 0) {
      optionsLeft[prop] = options[prop];
    }
  }

  return {
    path: path,
    options: optionsLeft
  };
};

module.exports = Nodegram;