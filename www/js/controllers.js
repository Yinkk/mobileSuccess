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

    .controller('NewsDetailCtrl', function ($scope,Base, News, $stateParams) {
        $id = $stateParams.newsId;
        $scope.news = null;
        $scope.base_url = Base.getBaseUrl();
        News.get($id)
            .success(function (response) {
                $scope.news = response.data;
            })
    })

    .controller('ProjectDetailCtrl', function ($scope,Base,Project,$stateParams) {
        $id = $stateParams.projectId;
        $scope.project = null;
        $scope.base_url = Base.getBaseUrl('TEST');
        Project.get($id)
            .success(function(response){
                $scope.project = response.data;
                console.log($scope.project);
            });

    })

    .controller('ProjectCtrl', function ($scope,Base,Project) {

        $scope.projectList = [];
        $scope.project = null;
        $scope.base_url = Base.getBaseUrl('TEST');

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
