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

    var load = function(){
      var assetLoader = Zaytoonah.getAssetLoader();
      assetLoader.addAsset(imageURL, "image")
      .then( function(loadedImage) {
        image = loadedImage;
        imageLoaded = true;
      }, console.log );
    }
    that.load = load;

    var getImage = function(){
      return image;
    }
    that.getImage = getImage;

    load();
    return that;
  }

  Zaytoonah.audioObject = function(options){
    options = options || {};
    var audio = null,
        audioURL = options.audioURL,
        audioLoaded = false,
        context = Zaytoonah.getContext();
        that = Zaytoonah.object(options.identifier);
    that.type = "audio";

    var load = function(){
      var assetLoader = Zaytoonah.getAssetLoader();
      assetLoader.addAsset(audioURL, "audio").then( function(buffer){
        audio = buffer;
        audioLoaded = true;
      }, console.log);
    }
    that.load = load;

    var getAudio = function(){
      return audio;
    }
    that.getAudio = getAudio;

    var play = function(){
      if(audioLoaded){
        var source = context.createBufferSource(); // creates a sound source
        source.buffer = audio;                     // tell the source which sound to play
        source.connect(context.destination);       // connect the source to the context's destination (the speakers)
        source.start(0);                           // play the source now
      }
    }
    that.play = play;

    load();
    return that;
  }
})();
