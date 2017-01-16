var profile = require("./profile.js");

//var users = ["chalkers", "davidmackintosh2", "davemcfarland"];
var users = process.argv.slice(2);

users.forEach(profile.get);