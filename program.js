/**
 * instalation:
 * run: npm install -g expressworks
 */

 // =========================================================================
/**
 * Exercise 1 of 8:
 * Create an Express.js app that outputs "Hello World!" when somebody goes to /home.

The port number will be provided to you by expressworks as the first argument of
the application, i.e., process.argv[2].

Run $ killall node  before verifying exercises (in your terminal on Mac OS X) to end any previous processes.

For Windows, use "taskkill /IM node.exe" in Command Prompt.


Don't forget to install the Express module if you haven't already.

$ npm install express --save
 */

// var express = require('express');

// var port = process.argv[2];

// var app = express();
// app.get('/home', function(req, res) {
//     res.end('Hello World!');
// })

// app.listen(port);

/**
 * official solution:
 */
// var express = require('express')
// var app = express()
// app.get('/home', function(req, res) {
//   res.end('Hello World!')
// })
// app.listen(process.argv[2])

// =========================================================================

/**
 * Exercise 2 of 8:
 * This exercise is about serving static assets like HTML files.
There are many ways to do it, but we want you to apply static middleware to serve the file index.html.

Please don't use ANY routes like app.get. ONLY static.

Your solution must listen on the port number supplied by process.argv[2].

The index.html file is provided and usable via the path supplied by
process.argv[3]. However, you can use your own file with this content (beware of whitespace):

    <html>
      <head>
        <title>expressworks</title>
        <link rel="stylesheet" type="text/css" href="/main.css"/>
      </head>
      <body>
        <p>I am red!</p>
      </body>
    </html>
 */

 /**
 * first solution:
 */
// var express = require('express');
// var path = require('path');

// var port = process.argv[2];
// var publicAssets = process.argv[3];
// var app = express();

// app.use(express.static(publicAssets) || path.join(__dirname, 'public'));

// app.listen(port);

/**
 * official solution:
 */

// var path = require('path')
// var express = require('express')
// var app = express()

// app.use(express.static(process.argv[3]||path.join(__dirname, 'public')));

// app.listen(process.argv[2])

// =========================================================================
/**
 * Exercise 3 of 8:
 * Create an Express.js app with a home page rendered by the Pug template engine.

The home page should respond to /home.

The view should show the current date using 'new Date().toDateString()'.

We use 'toDateString()' to simply return the date in a human-readable format
without the time.
 */

/**
 * first solution:
 */
// var express = require('express');
// var path = require('path');

// var app = express();
// var port = process.argv[2];
// var publicAssets = process.argv[3];

// app.set('views', publicAssets || path.join(__dirname, 'public'));

// app.set('view engine', 'pug');

// app.get('/home', function(req, res) {
//     res.render(publicAssets, {date: new Date().toDateString()});
// })

// app.listen(port);

/**
 * official solution:
 * var express = require('express')
    var app = express()
    app.set('view engine', 'pug')
    app.set('views', process.argv[3])
    app.get('/home', function(req, res) {
    res.render('index', {date: new Date().toDateString()})
    })
    app.listen(process.argv[2])
 */

/**
 * note:
 * dont get confused by example provided by program
 * set view with the path to the template
 * wrong: app.set('views', path.join(__dirname, 'templates'));
 * correct: app.set('views', process.argv[3])
 * render the template just specify the name of file
 * wrong: res.render(tpl, {date: new Date().toDateString()});
 * correct => res.render('index', {date: new Date().toDateString()})
 */

// =========================================================================
/**
 * Exercise 4 of 8:
    Forms are important. This exercise will teach you how to process the traditional (non-AJAX) web form.

    Write a route ('/form') that processes HTML form input
    (<form><input name="str"/></form>) and responds with the value of str backwards.

    To handle a POST request, use the post() method which is used the same way as get():

        app.post('/path', function(req, res){...})

    Express.js uses middleware to provide extra functionality to your web server.

    Simply put, a middleware is a function invoked by Express.js before your own
    request handler.

    Middleware provide a large variety of functionality such as logging, serving
    static files, and error handling.

    A middleware is added by calling use() on the application and passing the
    middleware as a parameter.

    To parse x-www-form-urlencoded request bodies, Express.js can use urlencoded()
    middleware from the body-parser module.

    var bodyparser = require('body-parser')
    app.use(bodyparser.urlencoded({extended: false}))
 */

 /**
  * 13.05.2018:
  */
// var express = require('express')
// var bodyparser = require('body-parser')
// var port = process.argv[2]

// var app = express()
// app.use(bodyparser.urlencoded({extended: false}))

// app.post('/form', function(req, res) {
//     res.end(req.body.str.split('').reverse().join(''))
// })

// app.listen(port)

/**
 * first solution:
 */
// var express = require('express');
// var bodyparser = require('body-parser');

// var app = express();
// var port = process.argv[2];
// var answer;

// app.use(bodyparser.urlencoded({extended: false}));

// app.post('/form', function(req, res) {
//     answer = req.body.str.split('').reverse().join('');
//     res.end(answer);
// })

// app.listen(port);

/**
 * official solution:
 * var express = require('express')
    var bodyParser = require('body-parser')
    var app = express()

    app.use(bodyParser.urlencoded({extended: false}))

    app.post('/form', function(req, res) {
      res.send(req.body.str.split('').reverse().join(''))
    })

    app.listen(process.argv[2])
 */

 // =========================================================================

/**
 * Exercise 5 of 8:
 * HTML without styles is boring so this exercise will teach you how to use Stylus with Express on the fly.

Style the HTML from the "STATIC" exercise using Stylus middleware.
Stylus <https://github.com/stylus/stylus> generates .css files on-the-fly from .styl files.

Your solution should listen on the port supplied by process.argv[2] for
GET requests, one of which will be for main.css, which should be
automatically generated by your Stylus middleware. index.html and main.styl can be found in process.argv[3] (they are in the same directory).

You could also create your own folder and use these, if you like:

The main.styl file:

    p
      color red

The index.html file:

    <html>
      <head>
        <title>expressworks</title>
        <link rel="stylesheet" type="text/css" href="/main.css"/>
      </head>
      <body>
        <p>I am red!</p>
      </body>
    </html>
 */

 /**
 * 05.2018:
 */
// var express = require('express')
// var stylus = require('stylus')
// var port = process.argv[2]
// var publicAssets = process.argv[3]
// var app = express()

// app.use(stylus.middleware(publicAssets))
// app.use(express.static(publicAssets|| path.join(__dirname, 'public')))

// app.listen(port)

/**
 * first solution:
 */
// var express = require('express');
// var stylus = require('stylus');
// var path = require('path');

// var app = express();
// var port = process.argv[2];
// var publicAssets = process.argv[3];

// app.use(stylus.middleware(publicAssets || path.join(__dirname, 'public')));
// app.use(express.static(publicAssets || path.join(__dirname, 'public')));

// app.listen(port);

/**
 * official solution:
 * var express = require('express')
    var app = express()

    app.use(require('stylus').middleware(process.argv[3]));
    app.use(express.static(process.argv[3]));

    app.listen(process.argv[2])
 */

 /**
  * note:
  for stylus and express.static middleware, need to provide the path to the directory of files that we want to serve.
  */

// =========================================================================

/**
 * Exercise 6 of 8:
 *  This exercise is about using URL parameters.
    For example, if you have /message/526aa677a8ceb64569c9d4fb, then you should know how to
    extract that value which is an ID of the message.

    Create an Express.js server that processes PUT /message/:id requests
    and produces a SHA-1 hash of the current date combined with the ID from the URL.

    For instance, if the server receives

        PUT /message/526aa677a8ceb64569c9d4fb

    it will respond with a hash of the current date (as a string) and the ID.

    The SHA-1 can be computed like this:

    require('crypto')
        .createHash('sha1')
        .update(new Date().toDateString() + id)
        .digest('hex')
 */


// example of request: http://localhost:52051/message/558a49ff8f1e90d3317e90254cd0e9cd

/**
 * 20.05.2018:
 */
// var express = require('express')
// var crypto = require('crypto')
// var port = process.argv[2]
// var app = express()

// app.param('id', function(req, res, next, id) {
//   req.id = crypto
//     .createHash('sha1')
//     .update(new Date().toDateString() + id)
//     .digest('hex')

//   next()
// })

// app.put('/message/:id', function(req, res, next) {
//   res.end(req.id)
// })

// app.listen(port)

/**
 * first solution:
 */
// var express = require('express');

// var app = express();
// var port = process.argv[2];

// app.param('id', function(req, res, next, id) {
//     req.id = id;
//     next();
// })

// app.put('/message/:id', function(req, res, next) {
//     var result = require('crypto')
//         .createHash('sha1')
//         .update(new Date().toDateString() + req.id)
//         .digest('hex');
//     res.end(result);
//     next();
// })

// app.listen(port);

/**
 * official solution:
 * var express = require('express')
    var app = express()

    app.put('/message/:id', function(req, res){
      var id = req.params.id
      var str = require('crypto')
        .createHash('sha1')
        .update(new Date().toDateString() + id)
        .digest('hex')
      res.send(str)
    })

    app.listen(process.argv[2])
 */

// =========================================================================

/**
  * Exercise 7 of 8:
    Oftentimes, we need to process the data from the URL query string (urlencoded).

    Write a route that extracts data from the query string in the GET /search URL
    route, e.g. ?results=recent&include_tabs=true and then outputs it back to
    the user in JSON format.

    Use app.get('/search', function(){...}) for the route.

    In Express.js, to extract query string parameters, we can use (inside the request handler):

        req.query.NAME
*/

/**
 * 20.05.2018
 */
// var express = require('express')
// var port = process.argv[2]
// var app = express()

// app.get('/search', function(req, res) {
//   res.send(req.query)
// })

// app.listen(port)

/**
 * first solution:
 */
// var express = require('express');

// var app = express();
// var port = process.argv[2];

// app.get('/search', function(req, res) {
//     res.send(req.query);
// })

// app.listen(port);

/**
 * official solution:
 *  var express = require('express')
    var app = express()

    app.get('/search', function(req, res){
      var query = req.query
      res.send(query)
    })

    app.listen(process.argv[2])
 */

// =========================================================================

/**
 * Exercise 8 of 8:
 * Most of the times we're building RESTful API servers with JSON.

    Write a server that, when it receives a GET, reads a file, parses it to JSON,
    and responds with that content to the user.

    The server should respond to any GET that matches the /books resource path.
    As always, the port is passed in process.argv[2]. The file to read is passed
    in process.argv[3].

    Respond with:

    res.json(object)

    Everything should match the /books resource path.

    For reading the file, use the fs module, e.g.,

    fs.readFile(filename, callback)
 */

/**
 * 20.5.2018:
 */
// var express = require('express')
// var fs = require('fs')
// var port = process.argv[2]
// var publicAssets = process.argv[3]
// app = express()

// app.get('/books', function(req, res) {
//   fs.readFile(publicAssets, function(err, fileContent) {
//     if (err) return console.error(err);
//     res.json(JSON.parse(fileContent))
//   })
// })

// app.listen(port)

/**
 * first solution:
 */
// var express = require('express');
// var fs = require('fs');

// var app = express();
// var port = process.argv[2];
// var directory = process.argv[3];

// app.get('/books', function(req, res) {
//     fs.readFile(directory, 'utf8', function(err, content) {
//         if(err) return console.error(err);
//         res.json(JSON.parse(content));
//     });
// })

// app.listen(port);

/**
 * official solution:
 *  var express = require('express')
    var app = express()
    var fs = require('fs')

    app.get('/books',  function(req, res){
      var filename = process.argv[3]
      fs.readFile(filename, function(e, data) {
        if (e) return res.sendStatus(500)
        try {
          books = JSON.parse(data)
        } catch (e) {
          res.sendStatus(500)
        }
        res.json(books)
      })
    })

    app.listen(process.argv[2])
 */

/**
 * note:
 * missing error handle see official solution
 */
