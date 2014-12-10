angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope,News) {
    $scope.newsList = News.all();

})

.controller('NewsDetailCtrl', function($scope) {
})

.controller('ProjectDetailCtrl', function($scope) {
})

.controller('ProjectCtrl', function($scope) {
})

.controller('MapCtrl', function($scope) {
})

.controller('MediaCtrl', function($scope) {
})

.controller('ContactCtrl', function($scope) {
});
