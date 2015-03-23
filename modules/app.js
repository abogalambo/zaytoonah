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
var io = Zaytoonah.imageObject({
  imageURL:"http://www.rantlifestyle.com/wp-content/uploads/2014/07/happy2.jpg",
  identifier:"cat"
});
io.load()
var io2 = Zaytoonah.imageObject({
  imageURL:"http://upload.wikimedia.org/wikipedia/commons/e/eb/Happy_boys.jpg",
  identifier:"happy"
});
io2.load()


al.load(function(){
  console.log("all loaded");
  ao.play();
  ao2.play();
  ao3.play();
  document.body.appendChild(io.getImage());
  document.body.appendChild(io2.getImage());
});

});
