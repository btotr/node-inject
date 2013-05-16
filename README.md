#node-inject

A middleware component for [node-http-proxy](https://github.com/nodejitsu/node-http-proxy) to inject a script file to all served html files.

[![build status](https://secure.travis-ci.org/btotr/node-inject.png)](http://travis-ci.org/btotr/node-inject)

##install

```
$ npm install node-inject
```

## example ##

The following example will inject a script to the nodejs website through a proxy running on http://localhost:8000. 

```
var http = require('http'),
    httpProxy = require('http-proxy'); 

httpProxy.createServer(
    require('node-inject')("https://raw.github.com/btotr/node-inject/master/example/inject.js"),
    function (req,res,proxy) {
        proxy.proxyRequest(req, res, {
          host: 'nodejs.org',
          port: 80
        });
    }
).listen(process.env.PORT || 8000);
```

To run this example you will need http-proxy 0.8.7 as-well.

```
$ npm install http-proxy@0.8.7
```


