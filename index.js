/**
 * Основной модуль приложения - точка входа.
 */

const express = require("express");
const api = require("./api");
const logger = require("./logger");
const config = require("./config");
const hookHandler = require("./hookController/contactsHandler");


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

api.getAccessToken().then(() => {
	app.get(config.PING_ROUTE, (req, res) => res.send("pong " + Date.now()));
	app.post(config.CONTACT_HOOK_ROUTE, hookHandler);
	app.listen(config.PORT, () => logger.debug("Server started on ", config.PORT));
});
