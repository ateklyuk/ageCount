module.exports = function getAgeFromBirthDate(birthDateString) {
	const today = new Date();
	const birthDateMass = birthDateString.split(".")
	if (birthDateMass[2].length <= 2){
		return null;
	};
	const birthDate = new Date(
		parseInt(birthDateMass[2]),
		parseInt(birthDateMass[1]) - 1,
		parseInt(birthDateMass[0])
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
