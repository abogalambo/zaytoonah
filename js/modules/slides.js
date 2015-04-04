(function(){
  Zaytoonah = window.Zaytoonah || {};
  Zaytoonah.slide = function(){
    var that = {};
    return that;
  }

  Zaytoonah.introSlide = function(options){
    var that = Zaytoonah.slide();
    that.type = "intro"
    that.intro = options.intro;
    that.audio = options.audio;
    return that;
  }

  Zaytoonah.questionSlide = function(q){
    var that = Zaytoonah.slide();
    that.question = q;
    that.type = "question"
    return that;
  }
})();
