var request = require("request");
var btoa = require("../common/utils").btoa;
var base_url = require("../config").base_url;

function loginHeaders(username, pwd) {
    return {
        'Content-Type': 'application/json',
        'Authorization' : 'Basic ' + btoa(username + ':' + pwd)
    }
}

function authHeaders(token) {
    return {
        'Content-Type': 'application/json',
        'Authorization': token
    }
}

function post(url, headers, body, callback) {
    console.log('my url ' + base_url + url);
    console.log('my body ' + body);
    request.post({
        headers: headers,
        url: base_url + url,
        body: body
    }, function (error, response, body) {
        callback(error, response, body);
    });
}

function del(url, headers, body, callback) {
    request.delete({
        headers: headers,
        url: base_url + url,
        body: body
    }, function (error, response, body) {
        callback(error, response, body);
    });
}

function get(url, headers, callback) {
    request.get({
        headers: headers,
        url: base_url + url
    }, function (error, response, body) {
        callback(error, response, body);
    });
}

describe('Server', function() {
    describe('Authentification', function () {
        it("user login with valid username and valid password", function(done) {
            post('/auth',loginHeaders('admin', 'admin'), '', function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("user login with valid username and invalid password ", function(done) {
            post('/auth',loginHeaders('admin', 'zzzz'), '', function (error, response, body) {
                expect(response.statusCode).toBe(401);
                done();
            });
        });
        it("user login with invalid username", function(done) {
            post('/auth',loginHeaders('zzzz', '1234'), '', function (error, response, body) {
                expect(response.statusCode).toBe(401);
                done();
            });
        });

        it("logout", function(done) {
            post('/auth',loginHeaders('admin', 'admin'), '', function (error, response, body) {
                var token = JSON.parse(body).data;
                del('/auth',authHeaders(token), '', function (error, response, body) {
                    expect(response.statusCode).toBe(200);
                    console.log("xxx1 " + token);
                    done();
                });
            });
        });
    
    });
    describe('Api', function () {
        var token;
        
        beforeEach(function(done) {
            if(token) {
                done();
                return;
            };
            post('/auth',loginHeaders('admin', 'admin'), '', function (error, response, body) {
                token = JSON.parse(body).data;
                console.log("Before " + token);
                done();
            });
        });
    
        it("user wants to save note", function (done) {
            post('/note', authHeaders(token), JSON.stringify({name:'test',text:'100'}), function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it("user wants to find note by key", function (done) {
            get('/note/test', authHeaders(token), function (error, response, body) {
                console.log('error ' + error);
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});