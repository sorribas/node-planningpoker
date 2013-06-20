GLOBAL.isTesting = true;
var should = require('should');

var db = null;
describe("users", function() {
  beforeEach(function(done) {
    db = require('../db').db;
    db.users.remove({}, done);
  });
  describe("create", function() {
    it("should add a new user to the database", function(done) {
      var users = require('../routes/users');
      var userData = {
        email: "edu@example.org", 
        password: "123abc", 
        confirm: "123abc"
      };
      users.create(
        {body: userData},
        {
          redirect: function(url) {
            db.users.find(userData, function(err, docs) {
              docs.should.have.lengthOf(1);
              docs[0].should.eql(userData);
            });
            done();
          }
        });
    });

    it("should not add a user if confirmation password doesn't match", function(done) {
      var users = require('../routes/users');
      var userData = {
        email: "edu@example.org", 
        password: "123abc", 
        confirm: "123"
      };
      users.create(
        {body: userData},
        {
          render: function(viewname, frm) {
            db.users.find(userData, function(err, docs) {
              docs.should.eql([]);
            });
            done();
          }
        });
    });
  });
});
