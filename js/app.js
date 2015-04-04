var data = [
  {
    intro: 'Are you ready?',
    audio: 'intro.mp3'
  },{
    question: {
      audio: "alph/A.mp3",
      images: [
        "alph/E.jpg",
        "alph/A.jpg",
        "alph/O.jpg",
        "alph/Aa.jpg"
      ]
    }
  },{
    question: {
      text:[ "بَ", "ba"],
      sounds: [
        "alph/ba.mp3",
        "alph/ta.mp3",
        "alph/tha.mp3",
        "alph/na.mp3"
      ]
    }
  },{
    question: {
      text:[ "بَ", "ba"],
      images: [
        "alph/ba.mp3",
        "alph/ta.mp3",
        "alph/tha.mp3",
        "alph/na.mp3"
      ]
    }
  }
]

window.addEventListener('load', function(){
  var slides = Zaytoonah.getFactory().createSlides(data);
  var al = Zaytoonah.getAssetLoader();
  al.load().then(function(){
    console.log("all loaded");
    console.log(slides);
  }, console.log);

});
