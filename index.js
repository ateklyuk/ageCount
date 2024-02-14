/**
 * Основной модуль приложения - точка входа.
 */

const express = require("express");
const api = require("./api");
const logger = require("./logger");
const config = require("./config");
const hookController = require("./hookController/contactsController");


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

api.getAccessToken().then(() => {
	app.get("/ping", (req, res) => res.send("pong " + Date.now()));
	app.post("/contacts", hookController);
	app.listen(config.PORT, () => logger.debug("Server started on ", config.PORT));
});
