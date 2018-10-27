var port = Number(process.env.PORT || 5000);

var http = require('http');

var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var serve = serveStatic("./");

var server = http.createServer(function(req, res) {
  var done = finalhandler(req, res);
  serve(req, res, done);
});
server.listen(port, '0.0.0.0', function() {
    console.log('Listening on port '+port+'. Hit CTRL-C to stop the server.');
});
