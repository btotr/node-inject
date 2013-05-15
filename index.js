module.exports = function(script) {
    return function(req, res, next) {

        var _write = res.write,
            _writeHead = res.writeHead,
            isHtml = false;
        
        var scriptElm = "\n<script type='text/javascript' src='" + script + "'></script>\n";
        
        // force uncompresed
        req.headers['accept-encoding'] = '*;q=1,gzip=0';
        
        res.writeHead = function(code, headers) {
            isHtml = headers['content-type'] && headers['content-type'].match('text/html');
            if (isHtml){
                headers['content-length'] = parseInt(headers['content-length']) + scriptElm.length;
            }
            _writeHead.apply(this, arguments);
        }
        
        res.write = function(chunk) {
           if (isHtml) {
                chunk = chunk.toString().replace(/(<head[^>]*>)/, "$1" + scriptElm)
            }
            _write.call(res, chunk);
        }
        next();
    }
}
