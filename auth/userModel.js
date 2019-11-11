const db = require("../data/db.js");

function insert(user) {
  db("users")
    .insert(user, "id")
    .then(([id]) => id);
}

module.exports = {};
