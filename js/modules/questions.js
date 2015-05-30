(function(){
  App = window.App;
  App.mCquestion = function(options){
    options = options || {};
    var that = {};
    var correctAnswer = options.correctAnswer;
    that.isMultipleChoice = true;
    that.question = options.question;
    that.answers = options.answers || [];
    that.focus = function(){
      if(this.question.hasAudio){
        this.question.playAudio();
      }
    }

    var checkAnswer = function(answer){
      return correctAnswer === answer;
    }
    that.checkAnswer = checkAnswer;
    return that;
  }
})();
