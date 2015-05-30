(function(){
  App = window.App;
  App.slide = function(){
    var that = {};
    return that;
  }

  App.introSlide = function(options){
    var that = App.slide();
    that.isIntroSlide = true
    that.intro = options.intro;
    that.audio = options.audio;
    that.focus = function(){
      this.audio.playAudio();
    }
    return that;
  }

  App.questionSlide = function(q){
    var that = App.slide();
    that.isQuestionSlide = true
    that.question = q;
    that.focus = function(){
      this.question.focus();
    }
    return that;
  }
})();
