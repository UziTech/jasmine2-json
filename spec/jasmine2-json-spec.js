"use strict";

require("../src/jasmine2-json");

describe("jasmine-json", function () {
	it("should be equal", function () {
		var actual = {
			a: 1,
			b: "2",
			c: [],
			d: [1],
			e: [2, 3],
			f: {},
			g: { "1": 1 }
		};
		var expected = {
			a: 1,
			b: "2",
			c: [],
			d: [1],
			e: [2, 3],
			f: {},
			g: { "1": 1 }
		};
		expect(actual).toEqualJson(expected);
	});

	it("should not be equal", function () {
		var actual = {
			a: 1,
			b: "2",
			c: [],
			d: [1],
			e: [2, 3],
			f: {},
			g: { "key": 1 }
		};
		var expected = {
			a: 2,
			b: "3",
			c: [4],
			d: [],
			e: [2, 4],
			f: { "1": 1 },
			g: { "key": 2 }
		};
		expect(actual).not.toEqualJson(expected);
	});
});
