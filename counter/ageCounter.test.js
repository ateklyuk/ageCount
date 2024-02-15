const ageFunction = require("./ageCounter");
const today = new Date();
describe("проверка года", () => {
	test("Прошедший", () => {
		expect(ageFunction("01.01.2015")).toBeGreaterThan(8);
	});
	test("Будущий", () => {
		expect(ageFunction("01.01.2999")).toBe(-1);
	});
});
describe("проверка типа", () => {
	test("Число?", () => {
		expect(typeof ageFunction("01.01.2999")).toBe("number");
	});
});
