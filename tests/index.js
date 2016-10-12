var expect = require('chai').expect;
var assert = require('assert');
var Nodegram = require('../index');

describe('Nodegram', function() {
  var clientId = 'CLIENT_ID';
  var clientSecret = 'CLIENT_SECRET';
  var redirectUri = 'REDIRECT_URI';
  var token = 'ACCESS_TOKEN';
  var gram = new Nodegram({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: redirectUri,
    accessToken: token,
    foo: 'bar'
  });

  describe('#Constructor', function() {
    it('should contain the initial state', function () {
      expect(gram).to.be.an.instanceof(Nodegram);
      expect(gram.accessToken).to.be.a('string');
      expect(gram.clientId).to.be.a('string');
      expect(gram.redirectUri).to.be.a('string');
      expect(gram.accessToken).to.be.a('string');
      expect(gram.foo).to.be.an('undefined');
    });
  });

  describe('#get', function() {
    it('works properly', function () {
      expect(gram.get).to.be.a('function');
    });
  });

  describe('#post', function() {
    it('works properly', function () {
      expect(gram.post).to.be.a('function');
    });
  });

  describe('#del', function() {
    it('works properly', function () {
      expect(gram.del).to.be.a('function');
    })
  });
  
  describe('#getAuthUrl', function() {
    it('Generates correct auth url', function () {
      var gram = new Nodegram({
        clientId: clientId,
        clientSecret: clientSecret,
        redirectUri: redirectUri
      });
      var url = gram.getAuthUrl();

      expect(gram.getAuthUrl).to.be.a('function');
      expect(url).to.be.equal('https://api.instagram.com/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&response_type=code');
    });
  });

  describe('#getAccessToken', function() {
    it('Fetch access_token from Instagram', function () {
      var gram = new Nodegram({
        clientId: clientId,
        clientSecret: clientSecret,
        redirectUri: redirectUri
      });
      var code = 'CODE';

      expect(gram.getAccessToken).to.be.a('function');
      // expect(gram.getAccessToken(code))
    });
  });

  describe('#buildUrl', function() {
    it('works properly', function () {
      expect(gram.buildUrl).to.be.a('function');
    });
  });

  describe('#buildPath', function() {
    it('should replace placeholders in path', function() {
      var options = {
        '{tag}': 'someTag',
        count: 20
      };

      var path = gram.buildPath('/test/{tag}/action', options);

      expect(path.path).to.equal('/test/someTag/action');
      expect(path.options.count).to.equal(20);
    });

    it('should not mutate options passed as parameter', function() {
      var options = {
        '{tag}': 'someTag',
        count: 20
      };

      gram.buildPath('/test/{tag}/action', options);

      expect(options['{tag}']).to.equal('someTag');
    });
  });
});