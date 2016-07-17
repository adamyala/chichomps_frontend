var app = angular.module('plunker', ['ngTagsInput']);

app.controller('MainCtrl', function($scope, $http) {
	$('#dom-id').dateRangePicker({
		singleMonth: true,
		showShortcuts: false,
		showTopbar: false
	});

	$scope.loadLocations = function($query) {
		var tempLocations = $scope.locations;
		return tempLocations.filter(function(location) {
			return location.toLowerCase().indexOf($query.toLowerCase()) != -1;
		});
  	};
	$scope.loadCategories = function($query) {
		var tempCategories = $scope.categories;
		return tempCategories.filter(function(category) {
			return category.toLowerCase().indexOf($query.toLowerCase()) != -1;
		});
  	};

	$scope.categories = [
		"Beer",
		"Cheese",
		"Wine",
	];

	$scope.locations = [
		"Alsip", "Arlington Heights", "Aurora", "Bedford Park", "Berwyn", 
		"Bloomington", "Blue Island", "Bolingbrook", "Calumet city", "Calumet park", 
		"Chicago", "Chicago Heights", "Chicago Ridge", "Countryside", "Des Plaines", 
		"Downers Grove", "Edwardsville", "Elgin", "Elk Grove Village", "Elmhurst", 
		"Evanston", "Evergreen Park", "Fairbury", "Gary", "Glen Ellyn", "Glenview", 
		"Godfrey", "Highland", "Highland Park", "Highwood", "Hinsdale", "Homewood", 
		"Kempton", "La Grange", "Lincolnshire", "Lincolnwood", "Morton", "Munster", 
		"Naperville", "Northbrook", "Oak Brook", "Oak Forest", "Oak Lawn", "Oak Park", 
		"Oakbrook", "Olympia Fields", "Orland Park", "Park Forest", "Pecatonica", 
		"RIverside", "Richton Park", "River Forest", "Riverdale", "Roselle", 
		"Schaumburg", "Schererville", "Skokie", "Tinley Park", "Westchester", 
		"Westmont", "Wheaton", "Wheeling", "Wilmette", "Winnetka", "Wood Dale", 
		"Worth", "Yorkville",
	]
   
});
