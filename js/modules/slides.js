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
    return that;
  }

  App.questionSlide = function(q){
    var that = App.slide();
    that.isQuestionSlide = true
    that.question = q;
    return that;
  }
})();
