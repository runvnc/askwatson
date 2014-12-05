var bluemix = require('bluemix-request-simple');

watson = bluemix.getService('question_and_answer');

exports.ask = function(domain, question, cb) {

  var questionData = {
    'question': {
      'evidenceRequest': {
        'items': 5
      },
      'questionText': question
    }
  };

  watson.request('POST', 1, 'question', domain, questionData, cb);
}

