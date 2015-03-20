(function(){
  Zaytoonah = window.Zaytoonah || {};
  Zaytoonah.object = function(){
    var that = {};
    that.type = "";
    that.is = function(other){};
    return that;
  }

  Zaytoonah.textObject = function(options){
    options = options || {};
    var that = Zaytoonah.object();
    that.type = "text";

    var text = options.text;
    var getText = function(){
      return text;
    }
    that.getText = getText;

    that.is = function(other){
      return typeof(other.getText) == "function" && text === other.getText();
    };
    return that;
  }

  Zaytoonah.imageObject = function(options){
    options = options || {};
    var that = Zaytoonah.object();
    that.type = "image";

    var image = options.image;
    var loadImage = function(callback){
    }

    var getImage = function(){
      return image;
    }
    that.getImage = getImage;

    that.is = function(other){
      return image === other.getImage();
    };
    return that;
  }

  Zaytoonah.audiObject = function(options){
    options = options || {};
    var that = Zaytoonah.object();
    that.type = "audio";

    var audio = options.audio;
    var loadAudio = function(callback){
    }

    var getAudio = function(){
      return audio;
    }
    that.getAudio = getAudio;

    that.is = function(other){
      return audi === other.getAudio();
    };
    return that;
  }
})();
