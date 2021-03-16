const homePageRouter = require("express").Router();
const { getWelcomeMessage } = require("../controllers/api.controllers");

homePageRouter.get("/", getWelcomeMessage);

module.exports = homePageRouter;
