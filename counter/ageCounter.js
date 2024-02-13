module.exports = function getAgeFromBirthDate(birthDateString) {
	const today = new Date();
	const [day, month, year] = birthDateString.split(".");
	if (year.length <= 2){
		return null;
	}
	const birthDate = new Date(
		parseInt(year),
		parseInt(month) - 1,
		parseInt(day)
	);
	let age = today.getFullYear() - birthDate.getFullYear();
	if (today.getMonth() < birthDate.getMonth() ||
		(today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
		age--;
	}
	if (age < -1){
		age = -1;
	}
	return age;
};
