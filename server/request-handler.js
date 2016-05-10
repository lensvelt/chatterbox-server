/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var requestHandler = function(request, response) {

  // console.log('Request: ', request);
  // console.log('Response: ', response);
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  //Get request information
  var method = request.method;
  var url = request.url;
  var statusCode = 200;
// console.log(method);
// console.log(url);
// console.log(request);

  //Handle Request events
  //-----------------------------------------------
  // request.on('error', function(err) {
  //   console.error(err.stack);
  //   statusCode = 400;
  // });

  if (request.method === 'POST') {
    
    var body = '';
    request.on('data', function(chunk) {
      body += chunk;
    });

      // Handle Response events / The outgoing status.
      //-----------------------------------------------
    request.on('end', function() {
      // body = Buffer.concat(body).toString();

      var data = JSON.parse(body);
      console.log(data);
      // response.on('error', function(err) {
      //   console.error(err.stack);
      //   statusCode = 400;
      // });

      // See the note below about CORS headers.
      // These headers will allow Cross-Origin Resource Sharing (CORS).
      // This code allows this server to talk to websites that
      // are on different domains, for instance, your chat client.
      //
      // Your chat client is running from a url like file://your/chat/client/index.html,
      // which is considered a different domain.
      //
      // Another way to get around this restriction is to serve you chat
      // client from this domain by setting up static file serving.
      var defaultCorsHeaders = {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'access-control-allow-headers': 'content-type, accept',
        'access-control-max-age': 10 // Seconds.
      };
      var headers = defaultCorsHeaders;

      // Tell the client we are sending them plain text.
      //
      // You will need to change this if you are sending something
      // other than plain text, like JSON or HTML.
      var requestHeaders = request.headers || 'text/plain'; //Not being sent in request object
      headers['Content-Type'] = requestHeaders;

      // .writeHead() writes to the request line and headers of the response,
      // which includes the status and all headers.
      response.writeHead(statusCode, headers);

      // Make sure to always call response.end() - Node may not send
      // anything back to the client until you do. The string you pass to
      // response.end() will be the body of the response - i.e. what shows
      // up in the browser.
      //
      // console.log(JSON.stringify(responseBody));
      // console.log(responseBody);
      // console.log(body);

      // Define responsBody
      var responseBody = {
        headers: headers,
        method: method,
        url: url,
        body: data
      };

      response.end(JSON.stringify(data));
      // Calling .end "flushes" the response's internal buffer, forcing
      // node to actually send all the data over to the client.

    });
  }


};

module.exports = requestHandler;