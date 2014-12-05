This module is in npm as `askwatson`.  It provides a simple API for asking Watson a question on Bluemix using the
`question_and_answer service`.

Basically you will need to get set up on Bluemix/CF and follow the instructions given
for the sample Node.js application here https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/qaapi/#commonApplication, including running the `cf` commands, but
I have factored out that code a bit into two modules, so your application can
be cleaner.  In case you need help finding the `cf` command line program you can download it from here https://github.com/cloudfoundry/cli/releases (under Installers)  and install it with `dpkg -i <filename>`.

The first module is called `bluemix-request-simple` and it has the parts for pulling
the host and port out of the environment and using them in a request.

The other module is this one, which is very simple to use:

```javascript
watson.ask('healthcare', 'What is the most common kind of cancer', function(err, answers) {
  console.log(answers);
});
```

This will need to run on Bluemix so a more complete example would be:


```javascript
var watson = require('askwatson')
  , restify = require('restify');

var server = restify.createServer();

server.get('/:domain/:question', function(req, res) {
  watson.ask(req.params.domain, req.params.question, function(e, ans) {
    res.send(ans);
  });    
});

server.listen(process.env.VCAP_APP_PORT, process.env.VCAP_APP_HOST, function() {
  console.log('%s listening at %s', server.name, server.url);
});
```
