(function(){
  Zaytoonah = window.Zaytoonah || {};
  var context;
  window.addEventListener('load', function(){
    assetLoader.init();
  }, false);

  var sounds = {}; // url => callbacks array
  var images = {}; // url => callbacks array
  var loadedCount = 0;
  var totalAssets = 0;
  var loadedCallback;

  function loadAudio(url){
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = function() {
      // Asynchronously decode the audio file data in request.response
      context.decodeAudioData(
        request.response,
        function(buffer) {
          loadedCount++;
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }
          callbacks = sounds[url];
          for(var i = 0; i< callbacks.length; i++){
            callbacks[i](buffer);
          }
          if (loadedCount == totalAssets){
            loadedCallback();
          }
        },
        function(error) {
          console.error('decodeAudioData error', error);
        }
      );
    }

    request.onerror = function() {
      alert('BufferLoader: XHR error');
    }

    request.send();
  }
  function loadImage(url){
  }

  // asset loader public API
  var assetLoader = {
    init: function(){
      // Fix up prefixing
      AudioContext = window.AudioContext || window.webkitAudioContext;
      var context = new AudioContext();
    },
    addAsset: function(url, type, callback){
      var assets;
      if(type == 'audio'){
        assets = sounds;
      }else if(type == "image"){
        assets = images;
      }
      if(assets[url] !== undefined){
        assets[url] = [];
        totalAssets++ ;
      }
      assets[url].push(callback);

    },
    load: function(callback){
      loadedCallback = callback || function(){};
      for(url in sounds){
        loadAudio(url);
      }
      for(url in images){
        loadImage(url);
      }
    }
  };
  Zaytoonah.getAssetLoader = function(){
    return assetLoader;
  }
  Zaytoonah.getContext = function(){
    return context;
  }
})();
