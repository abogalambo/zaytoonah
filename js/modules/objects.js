(function(){
  Zee = (function(){
    var Z = {};
    var extend = function(module, options){
      if(typeof Zee[module] === 'function'){
        return Zee[module](this, options);
      }
      return this;
    }

    Z.create = function(module, options){
      var initial = {};
      initial.extend = function(mod,opts){
        extend.call(initial, mod, opts);
        return this;
      }
      if(module){
        initial.extend(module, options);
      }
      return initial;
    }
    return Z;
  })();

  // Zee.create('audio', options).extend('text', options)

  Zee.text = function(object, options){
    var that = object;
    that.text = options.text;
    that.hasText = true;
    var getText = function(){
      return text;
    }
    return that;
  }

  Zee.image = function(object, options){
    var that = object;
    that.imageURL = options.imageURL;
    that.imageLoaded = false;
    that.hasImage = true;

    var load = function(){
      if(!that.imageLoaded){
        var assetLoader = Zee.getAssetLoader();
        assetLoader.addAsset(that.imageURL, "image")
        .then( function(image) {
          that.image = image;
          that.imageLoaded = true;
        }, console.error );
      }
    }
    that.loadImage = load;

    load();
    return that;
  }

  Zee.audio = function(object, options){
    var that = object;
    var context = Zee.getContext();
    var source;
    var audio;
    that.audioURL = options.audioURL;
    that.audioLoaded = false;
    that.hasAudio = true;

    var load = function(){
      var assetLoader = Zee.getAssetLoader();
      assetLoader.addAsset(that.audioURL, "audio").then( function(buffer){
        audio = buffer;
        that.audioLoaded = true;
      }, console.log);
    }
    that.loadAudio = load;

    var play = function(){
      if(that.audioLoaded){
        source = context.createBufferSource(); // creates a sound source
        source.buffer = audio;                     // tell the source which sound to play
        source.connect(context.destination);       // connect the source to the context's destination (the speakers)
        source.start(0);                           // play the source now
      }
    }
    that.playAudio = play;

    var stop = function(){
      if(source){
        source.stop();
      }
    }
    that.stopAudio = stop;

    load();
    return that;
  }
})();
