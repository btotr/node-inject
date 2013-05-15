var http = require('http'),
    httpProxy = require('http-proxy'),
    connect = require('connect');
  
httpProxy.createServer(
    require('../')("http://localhost:9000/inject.js"),
    function (req,res,proxy) {
        proxy.proxyRequest(req, res, {
          host: 'nodejs.org',
          port: 80
        });
    }
).listen(8000);

connect.createServer(
  connect.static(__dirname)
).listen(9000);