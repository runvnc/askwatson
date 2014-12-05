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
 
  process = function(e, results) {
    if (e) return cb(e);

    if (results.answers &&
        results.answers.question &&
        results.answers.question.evidencelist) {
      var relevant = [];
      results.answers.question.evidencelist.forEach(function(ans) {
        relevant.push({ text: ans.text,
                        confidene: ans.value*100,
                        document: ans.document });
      });
      cb(null, relevant);
    } else {
      cb(null, []);
    }
  }
  watson.request('POST', 1, 'question', domain, questionData, process);
}

