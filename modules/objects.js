(function(){
  Zaytoonah = window.Zaytoonah || {};
  Zaytoonah.object = function(identifier){
    var that = {};
    that.identifier = function(){
      return identifier;
    }
    that.matches = function(other){
      return identifier === other.identifier();
    };
    return that;
  }

  Zaytoonah.textObject = function(options){
    options = options || {};
    var text = options.text,
        that = Zaytoonah.object(options.identifier || text);
    that.type = "text";

    var getText = function(){
      return text;
    }
    that.getText = getText;
    return that;
  }

  Zaytoonah.imageObject = function(options){
    options = options || {};
    var image = null,
        imageURL = options.imageURL,
        imageLoaded = false,
        that = Zaytoonah.object(options.identifier);
    that.type = "image";

    var loadImage = function(callback){
    }
    that.load = loadImage;

    var getImage = function(){
      return image;
    }
    that.getImage = getImage;

    if(options.preload){
      loadImage();
    }

    return that;
  }

  Zaytoonah.audioObject = function(options){
    options = options || {};
    var audio = null,
        audioURL = options.audioURL,
        audioLoaded = false;
        that = Zaytoonah.object(options.identifier);
    that.type = "audio";

    var loadAudio = function(callback){
    }
    that.load = loadAudio;

    var getAudio = function(){
      return audio;
    }
    that.getAudio = getAudio;

    if(options.preload){
      loadAudio();
    }

    return that;
  }
})();
