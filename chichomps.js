// TODOS
// choose indexOf or inArray
(function(angular) {
angular.module('chichomps', ['ngRoute'])
  .controller('eventsController', function($http, $scope) {
    $http.get(
      'http://127.0.0.1:5000/v1.0/events',
      // 'http://chichomps.com/api/v1.0/events',
      {
        headers: {'Authorization': 'Basic YWRhbXlhbGE6QnVpbHQgd2l0aCBsb3ZlIGluIENoaWNhZ28h'}
      }).
      success(function(data, status, headers, config) {
        $scope.events = data.events;
        $scope.cities = $scope.cityList(data.events);
        $scope.categories = $scope.categoryList(data.events);
        $scope.sources = $scope.sourceList(data.events);
      }).
      error(function(data, status, headers, config) {}
    );

    $scope.cityIncludes = [];
    $scope.cityList = function(events) {
      var cities = [];
      for (var i = 0; i < events.length; i++) {
        if(cities.indexOf(events[i].city) === -1) {
          cities.push(events[i].city);
        }
      }
      return cities.sort();
    };
    $scope.includeCity = function(city) {
      var i = $.inArray(city, $scope.cityIncludes);
      if (i > -1) {
          $scope.cityIncludes.splice(i, 1);
      } else {
          $scope.cityIncludes.push(city);
      }
    };
    $scope.cityFilter = function(my_event) {
      if ($scope.cityIncludes.length > 0) {
        if ($.inArray(my_event.city, $scope.cityIncludes) < 0) {
          return;
        }
      }
      return my_event;
    };

    $scope.categoryIncludes = [];
    $scope.categoryList = function(events) {
      var categories = [];
      for (var i = 0; i < events.length; i++) {
        for (var j = 0; j < events[i].category.length; j++) {
          if(categories.indexOf(events[i].category[j]) === -1) {
            categories.push(events[i].category[j]);
          }
        }
      }
      return categories.sort();
    };
    $scope.includeCategory = function(category) {
      var i = $.inArray(category, $scope.categoryIncludes);
      if (i > -1) {
          $scope.categoryIncludes.splice(i, 1);
      } else {
          $scope.categoryIncludes.push(category);
      }
    };
    $scope.categoryFilter = function(my_event) {
      if ($scope.categoryIncludes.length == 0) {
        return my_event;
      }
      for (var i = 0; i < $scope.categoryIncludes.length; i++) {
        for (var j = 0; j < my_event.category.length; j++) {
          if ($scope.categoryIncludes[i] == my_event.category[j]) {
            return my_event;
          }
        }
      }
      return;
    };

    $scope.sourceIncludes = [];
    $scope.sourceList = function(events) {
      var sources = [];
      for (var i = 0; i < events.length; i++) {
        if(sources.indexOf(events[i].source) === -1) {
          sources.push(events[i].source);
        }
      }
      return sources.sort();
    };
    $scope.includeSource = function(source) {
      var i = $.inArray(source, $scope.sourceIncludes);
      if (i > -1) {
          $scope.sourceIncludes.splice(i, 1);
      } else {
          $scope.sourceIncludes.push(source);
      }
    };
    $scope.sourceFilter = function(my_event) {
      if ($scope.sourceIncludes.length > 0) {
        if ($.inArray(my_event.source, $scope.sourceIncludes) < 0) {
          return;
        }
      }
      return my_event;
    };

    $scope.costOptions = {
      'donation' : {
        'flag' : true,
        'range' : { 'from': -1, 'to': -1 }
      },
      'free' : {
        'flag' : true,
        'range' : { 'from': 0, 'to': 0 }
      },
      'one' : {
        'flag' : true,
        'range' : { 'from': 0, 'to': 20 }
      },
      'two' : {
        'flag' : true,
        'range' : { 'from': 20, 'to': 40 }
      },
      'three' : {
        'flag' : true,
        'range' : { 'from': 40, 'to': 100 }
      },
      'four' : {
        'flag' : true,
        'range' : { 'from': 100, 'to': 9999 }
      },
    };
    $scope.costFilter = function(my_event) {
      for (var key in $scope.costOptions) {
        if ($scope.costOptions[key].flag) {
          if (
            $scope.costOptions[key].range.from <= my_event.cost && 
            my_event.cost <= $scope.costOptions[key].range.to
          ) {
            return my_event;
          }
        }
      };
      return;
    };
  })

  .config(function($routeProvider, $locationProvider) {
    $routeProvider
     .when('/', {
      templateUrl: 'events.html',
    })
    .when('/about', {
      templateUrl: 'about.html',
    });
  });
})(window.angular);










