var mongojs = require("mongojs");

var db = GLOBAL.isTesting ? 
  mongojs("planningpoker-test", ["users"]): 
  mongojs("planningpoker", ["users"]);
exports.db = db;
