"use strict";

require("./polyfills");

(function (global) {

	if (!global.jasmine) {
		throw new Error("jasmine must be loaded before jasmine2-json");
	}

	var failures = {};

	function addFailure(path, actual, expected) {
		path = path.join(".") || "<root>";
		return failures[path] = "" +
			"    " + path + ":" + "\n" +
			"actual:   " + actual + "\n" +
			"expected: " + expected;
	}

	function unorderedEqual(one, two) {
		return (
			one.length === two.length &&
			one.every(function (i) { return two.includes(i); })
		);
	}

	function appendToPath(path, value) {
		return path.concat([value]);
	}

	function compare(path, actual, expected) {
		if (actual === expected) { return; }

		if (actual === null || expected === null) {
			addFailure(path, JSON.stringify(actual), JSON.stringify(expected));
		} else if (typeof actual === "undefined" || typeof expected === "undefined") {
			addFailure(path, JSON.stringify(actual), JSON.stringify(expected));
		} else if (actual.constructor.name !== expected.constructor.name) {
			addFailure(path, JSON.stringify(actual), JSON.stringify(expected));
		} else {
			switch (actual.constructor.name) {

				case "Array":
					if (actual.length !== expected.length) {
						addFailure(path, "has length " + actual.length + " " + JSON.stringify(actual), "has length " + expected.length + " " + JSON.stringify(expected));
					} else {
						for (var i = 0; i < actual.length; i++) {
							compare(appendToPath(path, i), actual[i], expected[i]);
						}
					}
					return;

				case "Object":
					var actualKeys = Object.keys(actual);
					var expectedKeys = Object.keys(expected);
					if (!unorderedEqual(actualKeys, expectedKeys)) {
						addFailure(path, "has keys " + JSON.stringify(actualKeys.sort()), "has keys " + JSON.stringify(expectedKeys.sort()));
					} else {
						actualKeys.forEach(function (key) {
							compare(appendToPath(path, key), actual[key], expected[key]);
						});
					}
					return;

				case "Number":
					if (isNaN(actual) && isNaN(expected)) {
						return;
					}
					// fall through
				case "String":
				case "Boolean":
				default:
					if (actual !== expected) {
						addFailure(path, JSON.stringify(actual), JSON.stringify(expected));
					}
					return;
			}
		}
	}

	beforeEach(function () {
		jasmine.addMatchers({
			toEqualJson: function () {
				return {
					compare: function (actual, expected) {
						var result = {};

						failures = {};
						compare([], actual, expected);
						var failedPaths = Object.keys(failures);
						result.pass = (failedPaths.length === 0);

						if (!result.pass) {
							var messages = failedPaths.map(function (path) { return failures[path]; });
							result.message = "JSON is not equal:\n" + messages.join("\n");
						} else {
							result.message = "JSON is equal:\n" + jasmine.pp(actual) + "\n" + jasmine.pp(expected);
						}
						return result;
					}
				};
			}
		});
	});

})(typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
