(function(){
  Zaytoonah = window.Zaytoonah || {};
  Zaytoonah.mCquestion = function(options){
    options = options || {};
    var that = {};
    var question = options.question
    var answers = options.answers || [];
    var correctAnswer = options.correctAnswer || null;
    that.type = "mc";

    var check = function(choice){
      if(correctAnswer)
        return correctAnswer.is(choice);
      return false;
    }
    that.check = check;
    return that;
  }
})();
