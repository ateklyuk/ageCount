const ageFunction = require("./ageCounter");
const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();
describe("проверка года", () => {
	test("Прошедший", () => {
		expect(ageFunction("01.01.2015")).toBeGreaterThan(8);
	});
	test("Будущий", () => {
		expect(ageFunction("01.01.2999")).toBe(0);
	});
});
describe("проверка типа", () => {
	test("Число?", () => {
		expect(typeof ageFunction("01.01.2999")).toBe("number");
	});
});

test("День рождения сегодня?", () => {
	expect(ageFunction(`${day}.${month}.${year-1}`)).toBe(1);
});
