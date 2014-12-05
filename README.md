This module is in npm as `askwatson`.  It provides a simple API for asking Watson a question on Bluemix using the
`question_and_answer service`.

Basically you will need to get set up on Bluemix and follow the instructions given
for the sample Node.js application here , including running the `cf` commands, but
I have factored out that code a bit into two modules, so your application can
be cleaner.

The first module is called `bluemix-request-simple` and it has the parts for pulling
the host and port out of the environment and using them in a request.

The other module is this one, which you can add to your project with `npm install --save askwatson`.  It makes it very simple to use:

```javascript
watson.ask('travel', 'What is the largest Hawaiin Island', function(err, answers) {
  console.log(answers);
});
```

This will need to run on Bluemix so a more complete example would be:


```javascript
var watson = require('askwatson');
  , restify = require('restify');

var server = restify.createServer();

server.get('/:domain/:question', function(req, res) {
  watson.ask(req.params.domain, req.params.question, function(e, res) {
    res.send(res);
  });    
});

server.listen(VCAP_APP_PORT, VCAP_APP_HOST, function() {
  console.log('%s listening at %s', server.name, server.url);
});
```
