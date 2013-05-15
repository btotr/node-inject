var http = require('http-get'),
    httpProxy = require('http-proxy'),
    connect = require('connect'),
    vows = require('vows'),
    assert = require('assert');
    
var script = "http://localhost:9000/inject.js"

// Create a test suite
vows.describe('injection').addBatch({
    'when connecting to a proxy': {
        topic: function() {
            // make the request object
            http.get({url: 'http://localhost:8000'}, null, this.callback);
        },
        'it can be accessed': function(err, res) {
            assert.isNull(err);
            assert.isObject (res);
        },
    },
    'when opening a html page': {
        topic: function() {
            var self = this;
            http.get({url: 'http://localhost:8000', stream: true}, null, function (error, result) {
    		    result.stream.on('data', function(data){
    		        self.callback(null, data.toString().indexOf(script));
    		    });
    		    result.stream.resume();
            });
        },
        'a script should be injected': function(err, index) {
            assert.isNumber(index);
            assert.notEqual(index, -1);
        }
    }
}).export(module);

// create a proxy server
httpProxy.createServer(
    require('../')(script), 
    function(req, res, proxy) {  
        proxy.proxyRequest(req, res, {
            host: 'localhost',
            port: 9000
        });
    }
).listen(8000);

// create a static server
connect.createServer(
    connect.static(__dirname)
).listen(9000);
