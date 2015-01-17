angular.module('starter.controllers', [])

    .controller('HomeCtrl', function ($scope,Base, News,newsList) {
        $scope.newsList = newsList.data.data;
        $scope.base_url = Base.getBaseUrl();



    })

    .controller('NewsDetailCtrl', function ($scope,Base,news) {

        $scope.news = news.data.data;
        $scope.base_url = Base.getBaseUrl();

    })

    .controller('ProjectDetailCtrl', function ($scope,Base,Project,$stateParams) {
        $id = $stateParams.projectId;
        Project.get($id).success(function(response){
            $scope.project = response.data;
        })
        $scope.base_url = Base.getBaseUrl();

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
        console.log("Map start...");
        $scope.map = { center: { latitude: 19.192128, longitude: 99.878834 }, zoom: 8 };

        $scope.markerClick = function(){

        }
    })

    .controller('MediaCtrl', function ($scope) {
    })

    .controller('ContactCtrl', function ($scope) {
    })


    .controller('TabCtrl',function($scope,$state){

        $scope.go = function(page){
            $state.go(page)
        }

    });
