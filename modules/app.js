window.addEventListener('load', function(){

var al = Zaytoonah.getAssetLoader();
var ao = Zaytoonah.audioObject({
  audioURL:"sounds/sound.wav",
  identifier:"Ahah"
});
ao.load()
var ao2 = Zaytoonah.audioObject({
  audioURL:"sounds/sound2.wav",
  identifier:"Ahah"
});
ao2.load()
var ao3 = Zaytoonah.audioObject({
  audioURL:"sounds/sound3.wav",
  identifier:"Ahah"
});
ao3.load()


al.load(function(){
  console.log("all loaded");
  ao.play();
  ao2.play();
  ao3.play();
});

});
