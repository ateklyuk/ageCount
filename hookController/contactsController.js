const {getFieldValue} = require("../utils");
const ageFunction = require("../counter/ageCounter");
const api = require("../api");
const BDAY_FIELD_ID = 81223;
const CUSTOM_FIELD_ID = 162427;


module.exports = async function hookController(req, res) {
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
		return await api.updateContact(data, contactId);
	} catch (e) {
		return e.message;
	}
};
