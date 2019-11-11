const db = require("../database/db.js");

function insert(user) {
  return db("users")
    .insert(user, "id")
    .then(([id]) => id);
}

function findBy(where) {
  return db("users").where(where);
}

function findByUsername(username) {
  return findBy({ username }).first();
}

module.exports = {
  insert,
  findBy,
  findByUsername,
  find
};
