const express = require("express");
const server = express();
server.use(express.json());

const port = 4500;
server.listen(port, () => console.log("Server Running! :D"));
