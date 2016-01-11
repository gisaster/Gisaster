angular.module('GisasterWeb', [
  'ngRoute',
  'GisasterWebControllers'
]).config(['$routeProvider',function($routeProvider,$locationProvider) {
   //$locationProvider.html5Mode(true).hashPrefix('!');
    // $locationProvider.html5Mode(true);
 /*    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });    
}]);*/
 $routeProvider
 .when('/mapview', {
        templateUrl: 'app/html/mapview.html'
      })
   
    .when('/map', {
        templateUrl: 'app/html/map.html'
      }).
      otherwise({
        redirectTo: '/map'
      });
  }])

;