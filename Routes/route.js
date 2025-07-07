const express = require('express');
const { createUser, getLatestUser } = require('../Controllers/UserControllers.js');

const Router = express.Router()

//apis endpoint
Router.post("/user",createUser);
Router.get("/user",getLatestUser);


module.exports = Router;