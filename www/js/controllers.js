angular.module('starter.controllers', [])

    .controller('HomeCtrl', function ($scope, News) {
        $scope.newsList = [];

        News.all()
            .success(function (response) {
                $scope.newsList = response.data;
            })
            .error(function (response) {
                alert("error");
            })

    })

    .controller('NewsDetailCtrl', function ($scope, News, $stateParams) {
        $id = $stateParams.newsId;
        $scope.news = {};

        News.get($id)
            .success(function (response) {
                $scope.news = response.data;
                console.log(response);
            })
    })

    .controller('ProjectDetailCtrl', function ($scope) {
    })

    .controller('ProjectCtrl', function ($scope) {
    })

    .controller('MapCtrl', function ($scope) {
    })

    .controller('MediaCtrl', function ($scope) {
    })

    .controller('ContactCtrl', function ($scope) {
    });
