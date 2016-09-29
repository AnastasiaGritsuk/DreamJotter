var port = 3000;
var base_url = 'http://localhost:' + port;
var db = {
    test: 'localhost:27017/jotterDBTest',
    prod: 'localhost:27017/jotterDB'
}

module.exports = {
    base_url:base_url,
    db:db
}