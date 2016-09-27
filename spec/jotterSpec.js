var request = require("request");

var base_url = "http://localhost:3000";

describe("Jotter Server", function() {

    describe("POST /auth", function() {

        it("user login with valid username and valid password ", function(done) {
            var creds = new Buffer('admin' + ':' + '1234').toString('base64');
            var headers = {
                'Content-Type': 'application/json',
                'Authorization' : 'Basic ' + creds
            };

            request.post({
                headers: headers,
                url: base_url + '/auth',
                body: ''
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("user login with valid username and invalid password ", function(done) {
            var creds = new Buffer('admin' + ':' + 'zzz').toString('base64');
            var headers = {
                'Content-Type': 'application/json',
                'Authorization' : 'Basic ' + creds
            };

            request.post({
                headers: headers,
                url: base_url + '/auth',
                body: ''
            }, function(error, response, body) {
                expect(response.statusCode).toBe(401);
                done();
            });
        });
        it("user login with invalid username and invalid password ", function(done) {
            var creds = new Buffer('zzz' + ':' + 'zzz').toString('base64');
            var headers = {
                'Content-Type': 'application/json',
                'Authorization' : 'Basic ' + creds
            };

            request.post({
                headers: headers,
                url: base_url + '/auth',
                body: ''
            }, function(error, response, body) {
                expect(response.statusCode).toBe(401);
                done();
            });
        });
        it("user login with invalid username and valid password ", function(done) {
            var creds = new Buffer('zzz' + ':' + '1234').toString('base64');
            var headers = {
                'Content-Type': 'application/json',
                'Authorization' : 'Basic ' + creds
            };

            request.post({
                headers: headers,
                url: base_url + '/auth',
                body: ''
            }, function(error, response, body) {
                expect(response.statusCode).toBe(401);
                done();
            });
        });
    });
});