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
        slide = Zaytoonah.introSlide(slideOptions);
      }else if(options.question){
        var question = this.createQuestion(options.question)
        slide = Zaytoonah.questionSlide(question);
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

      return Zaytoonah.mCquestion({
        question: questionBody,
        answers: answers
      });
    },

    createAudio: function(file){
      var url= "/sounds/" + file
      var identifier = (/\/([a-z1-9]*)\./ig).exec(url);
      return Zaytoonah.audioObject({
        audioURL: url,
        identifier: identifier[1]
      });
    },

    createImage: function(file){
      var url= "/images/" + file
      var identifier = (/\/([a-z1-9]*)\./ig).exec(url);
      return Zaytoonah.imageObject({
        imageURL: url,
        identifier: identifier[1]
      });
    },

    createText: function(options){
      return Zaytoonah.textObject({
        text: options[0],
        identifier: options[1]
      });
    }
  };
  Zaytoonah.getFactory = function(){
    return factory;
  }
})();
