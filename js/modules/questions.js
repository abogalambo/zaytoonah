(function(){
  Zaytoonah = window.Zaytoonah || {};
  Zaytoonah.mCquestion = function(options){
    options = options || {};
    var that = {};
    var question = options.question
    var answers = options.answers || [];
    that.type = "mc";
    that.question = question;
    that.answers = answers;

    var check = function(choice){
      return question.matches(choice);
    }
    that.check = check;
    return that;
  }
})();
