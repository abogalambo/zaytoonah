(function(){
  // asset loader public API
  var factory = {
    createSlides: function(slides){
      var slideObjects = [];
      for(var i=0; i< slides.length; i++){
        var slideObj = this.createSlide(slides[i]);
        slideObjects.push(slideObj);
      }
      return slideObjects;
    },

    createSlide: function(options){
      var slide;
      if(options.intro){
        slideOptions = {
          intro: options.intro
        }
        if(options.audio){
          slideOptions.audio = this.createAudio(options.audio);
        }
        slide = App.introSlide(slideOptions);
      }else if(options.question){
        var question = this.createQuestion(options.question)
        slide = App.questionSlide(question);
      }
      return slide;
    },

    createQuestion: function(options){
      var questionBody;
      if(options.audio){
        questionBody = this.createAudio(options.audio);
      }else if(options.image){
        questionBody = this.createImage(options.image);
      }else if(options.text){
        questionBody = this.createText(options.text);
      }

      var answers = [];
      if(options.images){
        for(var i=0; i< options.images.length; i++){
          answers.push(this.createImage(options.images[i]));
        }
      }else if(options.sounds){
        for(var i=0; i< options.sounds.length; i++){
          answers.push(this.createAudio(options.sounds[i]));
        }
      }else if(options.texts){
        for(var i=0; i< options.texts.length; i++){
          answers.push(this.createText(options.texts[i]));
        }
      }

      return App.mCquestion({
        question: questionBody,
        answers: answers,
        correctAnswer: answers[options.correctAnswer]
      });
    },

    createAudio: function(file){
      var url= "/sounds/" + file
      return App.create('audio',{audioURL:url});
    },

    createImage: function(file){
      var url= "/images/" + file
      return App.create('image', {imageURL:url});
    },

    createText: function(text){
      return App.create('text', {text:text});
    }
  };
  App.getFactory = function(){
    return factory;
  }
})();
