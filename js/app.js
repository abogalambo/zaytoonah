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
        $scope.$apply(
          function(){
            console.log("all loaded");
            _this.loaded = true;
          }
        );
      }, console.log);
    });

		this.currentDir = 'rtl';
    this.active = 0;

    $scope.nextSlide = function(){
      _this.active = _this.active + 1;
    }
    $scope.prevSlide = function(){
      if(_this.active != 0){
        _this.active = _this.active - 1;
      }
    }

    window.next = function(){
      $scope.$apply(function(){
        $scope.nextSlide();
      });
    };

    window.prev = function(){
      $scope.$apply(function(){
        $scope.prevSlide();
      });
    };

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
	});

  app.controller('SlideController', function($scope, $state, $window){
    this.slide = $scope.slide;
    this.display = function(){
      if(this.slide.type === 'intro'){
        if(this.slide.audio){
          this.slide.audio.play();
        }
      }else if(this.slide.type === 'question'){
        $scope.question = this.slide.question;
      }
    }

    this.stop = function(){
      if(this.slide.type === 'intro'){
        if(this.slide.audio){
          this.slide.audio.stop();
        }
      }else if(this.slide.type === 'question'){
      }
    }

    this.isActive = function(){
      return $scope.quiz.active === $scope.$index;
    }

    this.keydown = function(event){
      if(event.which === 39){
        $scope.prevSlide();
      }else if(this.slide.type === 'intro'){
        if(event.which === 32 || event.which === 13 || event.which === 37){
          $scope.nextSlide();
        }
      }
    }

    //handling key presses
    var _this = this;
    $window.document.addEventListener("keydown", function(evt) {
      if(_this.isActive()){
        $scope.$apply(function(){
          _this.keydown(event);
        });
      }
    });

    var _this = this;
    $scope.$watch(function () { return $scope.quiz.active }, function (newVal, oldVal) {
      if(newVal === $scope.$index){
        _this.display();
      }else if(oldVal === $scope.$index){
        _this.stop();
      }
    });
  });

  app.directive('question', function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/question.html',
      controller: function($scope){
        this.setQuestion = function(q){
          this.question = q;
        }
        this.status = 'new';
        this.answer = function(answer){
          if(this.status == 'new'){
            if(this.question.check(answer)){
              this.status = 'correct';
            }else{
              this.status = 'wrong';
            }
            // TODO this shouldn't be here
            $scope.nextSlide();
          }
        }
      },
      controllerAs: 'questionCtrl'
    };
  });

  app.directive('object', function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/object.html',
      controller: function(){
        this.setObj = function(object){
          this.object = object;
          if(object.type === 'image'){
            console.log(object.getImage());
          }
        }
      },
      controllerAs: 'objectCtrl'
    };
  });

})();

var data = [
  {
    intro: 'Are you ready?',
    audio: 'sound3.wav'
  },{
    question: {
      audio: "Aa.wav",
      images: [
        "alph/E.jpeg",
        "alph/A.jpg",
        "alph/O.jpg",
        "alph/Aa.png"
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
