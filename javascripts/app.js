var app = angular.module('nbabook', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/people', {templateUrl: 'templates/people.html',   controller: PersonListCtrl}).
    when('/people/:personId', {templateUrl: 'templates/person.html', controller: PersonDetailCtrl}).
    otherwise({redirectTo: '/people'});
}]);

//app.directive('isoGrid', function() {
//  return function(scope, element, attrs) {
//    scope.$watch(attrs.ngModel, function() {
//      element.isotope({
//        itemSelector: '.person',
//        layoutMode : 'fitRows'
//      });
//    });
//  };
//});

function PersonListCtrl($scope, $http) {
  $http.get('json/people.json').success(function(data) {
    $scope.people = data;
  });

  $scope.searchFilter = function (obj) {
    var re = new RegExp($scope.query, 'i');
    return !$scope.query || re.test(obj.name) || re.test(obj.number.toString());
  };

  $scope.order = 'name';
}

function PersonDetailCtrl($scope, $routeParams, $http) {
  $http.get('json/' + $routeParams.personId + '.json').success(function(data) {
    $scope.person = data;
  });
}
