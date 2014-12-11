angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope,News) {
    $scope.newsList = News.all();

})

.controller('NewsDetailCtrl', function($scope,News,$stateParams) {
        $id = $stateParams.newsId;
        $scope.news = News.get($id);
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
