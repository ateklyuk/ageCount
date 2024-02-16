const {getFieldValue, makeField} = require("../utils");
const ageFunction = require("../counter/ageCounter");
const api = require("../api");
const BIRTHDAY_FIELD_ID = 81223;
const AGE_FIELD_ID = 162427;


module.exports = async function hookHandler(req, res) {
	try {
		const {contacts} = req.body;
		const [{custom_fields, id: contactId}] = contacts.add;
		const value = getFieldValue(custom_fields, BIRTHDAY_FIELD_ID);
		if (value) {
			const age = ageFunction(value);
			const data = {
				custom_fields_values: [
					makeField(AGE_FIELD_ID, age)
				]
			};
			await api.updateContact(data, contactId);
		}
		else return res.send("День рождения не заполнен");
	} catch (e) {
		return res.status(500).send(e.message);
	}
};
