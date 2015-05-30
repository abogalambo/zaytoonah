(function(){
  window.App = (function(){
    var Z = {mixins:{}};
    var extend = function(module, options){
      if(typeof App.mixins[module] === 'function'){
        return App.mixins[module](this, options);
      }
      return this;
    }

    Z.create = function(module, options){
      var initial = {};
      initial.extend = function(){
        return extend.apply(this, arguments);
      }
      if(module){
        initial.extend(module, options);
      }
      return initial;
    }
    return Z;
  })();

  // t = App.create().extend('text', {text:'momma'}).extend('audio',{audioURL:""}).extend('image', {imageURL:""})

  App.mixins.text = function(object, options){
    var that = object;
    that.text = options.text;
    that.hasText = true;
    var getText = function(){
      return text;
    }
    return that;
  }

  App.mixins.image = function(object, options){
    var that = object;
    that.imageURL = options.imageURL;
    that.imageLoaded = false;
    that.hasImage = true;

    var load = function(){
      if(!that.imageLoaded){
        var assetLoader = App.getAssetLoader();
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

  App.mixins.audio = function(object, options){
    var that = object;
    var source;
    var audio;
    that.audioURL = options.audioURL;
    that.audioLoaded = false;
    that.hasAudio = true;

    var load = function(){
      var assetLoader = App.getAssetLoader();
      assetLoader.addAsset(that.audioURL, "audio").then( function(buffer){
        audio = buffer;
        that.audioLoaded = true;
      }, console.log);
    }
    that.loadAudio = load;

    var play = function(){
      if(that.audioLoaded){
        App.getContext().then(function(context){
          source = context.createBufferSource();     // creates a sound source
          source.buffer = audio;                     // tell the source which sound to play
          source.connect(context.destination);       // connect the source to the context's destination (the speakers)
          source.start(0);                           // play the source now
        });
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
