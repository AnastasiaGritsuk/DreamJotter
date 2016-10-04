var btoa = require('../utils').btoa;

describe("utils", function() {

    describe("btoa", function() {
        it("btoa test string", function() {
            expect(btoa('test string')).toBe("dGVzdCBzdHJpbmc=");
        });
        it("btoa test null", function() {
            expect(btoa(null)).toBe('bad string');
        });
        it("btoa test null", function() {
            expect(btoa(undefined)).toBe('bad string');
        });
    });
});