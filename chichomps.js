// TODOS
// choose indexOf or inArray
(function(angular) {
angular.module('chichomps', ['ngRoute'])
  .controller('eventsController', function($http, $scope) {
    $http.get(
      'http://127.0.0.1:5000/v1.0/events',
      {
        headers: {'Authorization': 'Basic YWRhbXlhbGE6QnVpbHQgd2l0aCBsb3ZlIGluIENoaWNhZ28h'}
      }).
      success(function(data, status, headers, config) {
        $scope.events = data.events;
        $scope.cities = $scope.cityList(data.events);
      }).
      error(function(data, status, headers, config) {}
    );
 
    $scope.cityList = function(events) {
      var cities = [];
      for(var i = 0; i < events.length; i++) {
        if(cities.indexOf(events[i].city) === -1) {
          cities.push(events[i].city);
        }
      }
      return cities.sort();
    };

    $scope.cityIncludes = [];
    $scope.includeCity = function(city) {
      var i = $.inArray(city, $scope.cityIncludes);
      if (i > -1) {
          $scope.cityIncludes.splice(i, 1);
      } else {
          $scope.cityIncludes.push(city);
      }
    }
    $scope.cityFilter = function(my_event) {
      if ($scope.cityIncludes.length > 0) {
        if ($.inArray(my_event.city, $scope.cityIncludes) < 0) {
          return;
        }
      }
      return my_event;
    }
  })
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
     .when('/', {
      templateUrl: 'events.html',
      controller: 'eventsController',
    })
    .when('/about', {
      templateUrl: 'about.html',
    });
  });
})(window.angular);










