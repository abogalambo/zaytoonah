(function(){
  var app = angular.module('zaytoonah',['ui.router'])
		// .config(function($stateProvider){
		// 	$stateProvider.state('slide', {
		// 		url: "/:page"
		// 	}).state('about', {
		// 		url: "/about"
		// 	});
		// });

	app.controller('QuizController', function($scope, $state, $window){
    this.loaded = false;
    var _this = this;
    $window.addEventListener('load', function(){
      _this.slides = Zaytoonah.getFactory().createSlides(data);
      var al = Zaytoonah.getAssetLoader();
      al.load().then(function(){
        console.log("all loaded");
        _this.loaded = true;
        $scope.$apply();
      }, console.log);
    });

		this.currentDir = 'rtl';
    this.active = 0;

    this.nextSlide = function(){
      this.active = this.active + 1;
    }
    this.prevSlide = function(){
      this.active = this.active - 1;
    }

		this.toggleDir = function(){
			if(this.currentDir == 'rtl'){
				this.switchDir('ltr');
			}else if(this.currentDir == 'ltr'){
				this.switchDir('rtl');
			};
		};
		this.switchDir = function(dir){
			if(dir == this.currentDir) return;
			if(dir == "rtl"){
				var link = $('<link id="rtl-style" rel="stylesheet" href="css/bootstrap-rtl.min.css">')
				$('head').append(link)
				$('.text-left').removeClass('text-left').addClass('text-right')
				this.currentDir = dir
			}else if(dir == "ltr"){
				$("#rtl-style").remove()
				$('.text-right').removeClass('text-right').addClass('text-left')
				this.currentDir = dir
			};
		};
		this.computeStyle = function(slide){
			var i = this.slides.indexOf(slide);
			var multiplier = 1;
			if(this.currentDir == 'ltr') multiplier = -1;
			return {left: 100 * multiplier * (this.active - i) + "%"}
		}

		// var that = this;
    // $scope.$watch(function () { return $state.$current.name; }, function (newVal) {
    // 	var matches = that.pages.filter(function(page){
    // 		return $state.includes(page);
    // 	})
    // 	if(matches.length == 0){
    // 		that.active = 0;
    // 	}else{
    // 		that.active = that.pages.indexOf(matches[0]);
    // 	}
		// });
	});

  app.controller('SlideController', function($scope, $state){
    this.slide = $scope.slide;
    this.display = function(){
      console.log("Display this slide", this.slide)
    }
  });

})();

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
