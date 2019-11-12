const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const KnexSessionStorage = require("connect-session-knex")(session);
const knexConnection = require("./database/db");

const server = express();

const sessionConfiguration = {
  name: "Forrest's Session",
  secret: process.env.COOKIE_SECRET || "Lets make sure this is private",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: process.env.NODE_ENV === "development" ? false : true,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStorage({
    knex: knexConnection,
    clearInterval: 1000 * 60 * 10,
    tablename: "user_sessions",
    sidfieldname: "id",
    createtable: true
  })
};

server.use(cors());
server.use(express.json());
server.use(helmet());
server.use(session(sessionConfiguration)); // 3: use the session middleware globally

const authRouter = require("./auth/auth-router.js");
server.use("/auth", authRouter);
const usersRouter = require("./users/users-router.js");
server.use("/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ Its: "WORKING!", session: req.session });
});

const port = 8000;
server.listen(port, () => console.log(`Server on ${port}`));
