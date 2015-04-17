(function(){
  Zee = window.Zee;
  Zee.mCquestion = function(options){
    options = options || {};
    var that = {};
    var correctAnswer = options.correctAnswer;
    that.isMultipleChoice = true;
    that.question = options.question;
    that.answers = options.answers || [];

    var checkAnswer = function(answer){
      return correctAnswer === answer;
    }
    that.checkAnswer = checkAnswer;
    return that;
  }
})();
