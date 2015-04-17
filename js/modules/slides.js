(function(){
  Zee = window.Zee;
  Zee.slide = function(){
    var that = {};
    return that;
  }

  Zee.introSlide = function(options){
    var that = Zee.slide();
    that.isIntroSlide = true
    that.intro = options.intro;
    that.audio = options.audio;
    return that;
  }

  Zee.questionSlide = function(q){
    var that = Zee.slide();
    that.isQuestionSlide = true
    that.question = q;
    return that;
  }
})();
