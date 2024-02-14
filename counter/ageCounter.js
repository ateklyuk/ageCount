module.exports = function getAgeFromBirthDate(birthDateString) {
	const today = new Date();
	const [day, month, year] = birthDateString.split(".");
	const birthDate = new Date(
		parseInt(year),
		parseInt(month) - 1,
		parseInt(day)
	);
	const fullAge = today.getFullYear() - birthDate.getFullYear();
	const wasBirthday = (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()));
	if (fullAge < 0){
		return -1;
	}
	if (wasBirthday) {
		return fullAge - 1;
	} else return fullAge;
};
