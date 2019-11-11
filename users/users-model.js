function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}
