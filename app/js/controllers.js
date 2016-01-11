angular.module('GisasterWebControllers', ['uiGmapgoogle-maps','underscore','angulike','720kb.socialshare','djds4rce.angular-socialshare'])
.run([
      '$rootScope', function ($rootScope) {
          $rootScope.facebookAppId = '399913810178834'; // set your facebook app id here
      }
  ])

.controller('HomeCtrl', function($scope, uiGmapGoogleMapApi, $http, $timeout,$location,_) {

	var searchObject = $location.search();
// alert( searchObject.foo );

    $scope.foo= searchObject.foo;

 $scope.marker =  {};
 $timeout(function() {
$scope.map = { center: { latitude: 8.466351981820633, longitude: 124.64285510489344 }, zoom: 15 };

$http.get('http://ashirted.x10.mx/gisasterphp/popData.php')
    .success(function(Markers) {
    	      $scope.markers = Markers;
var filters = searchObject.foo;
var selected_filter = "flood_id";
var dataFromdb = Markers;
var arr = _.filter(dataFromdb, function(item) {
              return item[selected_filter] == filters;
              });

          arr= arr[0];
          $scope.result=arr;
$scope.map = { center: { latitude: $scope.result.coords.latitude, longitude: $scope.result.coords.longitude }, zoom: 17 };


     
    })
      })
    
 
})
.controller('MapViewCtrl', function($scope, uiGmapGoogleMapApi, $http, $timeout,$location,_) {

 $scope.marker =  {};
 $timeout(function() {
$scope.map = { center: { latitude: 8.466351981820633, longitude: 124.64285510489344 }, zoom: 15 };

$http.get('http://ashirted.x10.mx/gisasterphp/popData.php')
    .success(function(Markers) {
    	      $scope.markers = Markers;
    	      console.log(Markers)
    })
      })

/*  $scope.share = function(post){
  	console.log(post.link)
    FB.ui(
    {
        method: 'feed',
        name: 'This is the content of the "name" field.',
        link: "http://9gag.com",
        picture: post.image,
        caption: 'Flood Report',
        description: post.address,
        message: ''
    });
  }*/
    //$scope.$apply is needed to trigger the digest cycle when the geolocation arrives and to update all the watchers
 
})
.controller('MetaCtrl', function($scope, $http, $timeout,$location,_,$rootScope) {

    var searchObject = $location.search();
// alert( searchObject.foo );

    $scope.foo= searchObject.foo;

 $scope.marker =  {};
 $timeout(function() {


$http.get('http://ashirted.x10.mx/gisasterphp/popData.php')
    .success(function(Markers) {
              $scope.markers = Markers;
var filters = 4;
var selected_filter = "flood_id";
var dataFromdb = Markers;
var arr = _.filter(dataFromdb, function(item) {
              return item[selected_filter] == filters;
              });

          arr= arr[0];
          $rootScope.result=arr;
console.log(result.link)


     
    })
      })
    
 
})
.directive('fbLike', [
        '$window', '$rootScope', function ($window, $rootScope) {
            return {
                restrict: 'A',
                scope: {
                    fbLike: '=?'
                },
                link: function (scope, element, attrs) {
                    if (!$window.FB) {
                        // Load Facebook SDK if not already loaded
                        $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
                            $window.FB.init({
                                appId: $rootScope.facebookAppId,
                                xfbml: true,
                                version: 'v2.0'
                            });
                            renderLikeButton();
                        });
                    } else {
                        renderLikeButton();
                    }
 
                    var watchAdded = false;
                    function renderLikeButton() {
                        if (!!attrs.fbLike && !scope.fbLike && !watchAdded) {
                            // wait for data if it hasn't loaded yet
                            watchAdded = true;
                            var unbindWatch = scope.$watch('fbLike', function (newValue, oldValue) {
                                if (newValue) {
                                    renderLikeButton();
                                       
                                    // only need to run once
                                    unbindWatch();
                                }
                                   
                            });
                            return;
                        } else {
                            element.html('<div class="fb-like"' + (!!scope.fbLike ? ' data-href="' + scope.fbLike + '"' : '') + ' data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></div>');
                            $window.FB.XFBML.parse(element.parent()[0]);
                        }
                    }
                }
            };
        }
    ])
;
