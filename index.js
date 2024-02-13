/**
 * Основной модуль приложения - точка входа.
 */

const express = require("express");
const api = require("./api");
const logger = require("./logger");
const config = require("./config");
const ageFunction = require("./counter/ageCounter");
const {getFieldValue} = require("./utils");
const {json} = require("express");
const BDAY_FIELD_ID = 81223;
const CUSTOM_FIELD_ID = 162427;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

api.getAccessToken().then(() => {
	app.get("/ping", (req, res) => res.send("pong " + Date.now()));
	const hookController = async () => await app.post("/contacts", (req, res) => {
		try {
			const {contacts} = req.body;
			const [{custom_fields}] = contacts.add;
			const {id: contactId} = req.body.contacts.add[0];
			const value = getFieldValue(custom_fields, BDAY_FIELD_ID);
			const age = ageFunction(value);
			const data = {
				custom_fields_values: [
					{
						field_id: CUSTOM_FIELD_ID,
						field_name: "Возраст",
						values: [
							{
								value: age,
							}
						]
					}
				]
			};
			res.send("OK");
			return api.updateContact(data, contactId);
		} catch (e) {
			return e.message;
		}
	});
	hookController();
	app.listen(config.PORT, () => logger.debug("Server started on ", config.PORT));
});
