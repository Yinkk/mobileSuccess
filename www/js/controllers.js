angular.module('starter.controllers', [])

    .controller('HomeCtrl', function ($scope,Base, News) {
        $scope.newsList = [];
        $scope.base_url = Base.getBaseUrl();


        News.all()
            .success(function (response) {
                $scope.newsList = response.data;
            })
            .error(function (response) {

            })

    })

    .controller('NewsDetailCtrl', function ($scope,$ionicSlideBoxDelegate,Base, News, $stateParams) {
        $id = $stateParams.newsId;
        $scope.news = null;
        $scope.base_url = Base.getBaseUrl();
        News.get($id)
            .success(function (response) {
                $scope.news = response.data;
                $ionicSlideBoxDelegate.update();
            })
    })

    .controller('ProjectDetailCtrl', function ($scope) {
    })

    .controller('ProjectCtrl', function ($scope,Base,Project) {

        $scope.projectList = [];
        $scope.project = null;
        $scope.base_url = Base.getBaseUrl();

        Project.all()
            .success(function(response){
                $scope.projectList = response.data;
            })

    })

    .controller('MapCtrl', function ($scope) {
    })

    .controller('MediaCtrl', function ($scope) {
    })

    .controller('ContactCtrl', function ($scope) {
    });
