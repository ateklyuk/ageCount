/**
 * Основной модуль приложения - точка входа.
 */

const express = require("express");
const api = require("./api");
const logger = require("./logger");
const config = require("./config");
const ageFunction = require("./counter/ageCounter");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

api.getAccessToken().then(() => {
	app.get("/ping", (req, res) => res.send("pong " + Date.now()));

	app.post("/contacts", (req, res) => {
		let age = ageFunction(req.body.contacts.add[0].custom_fields[0].values[0].value);
		console.log(age);
		console.log(req.body.contacts.add[0].custom_fields);
		const id = req.body.contacts.add[0].id;
		let data = {
			custom_fields_values: [
				{
					field_id: 162427,
					field_name: "Возраст",
					values: [
						{
							value: age,
						}
					]
				}
			]
		};
		api.updateContact(data, id).then(res => console.log(res));
		res.send("OK");
	});

	app.listen(config.PORT, () => logger.debug("Server started on ", config.PORT));
});
