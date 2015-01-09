angular.module('starter.controllers', [])

    .controller('HomeCtrl', function ($scope,Base, News,newsList) {
        $scope.newsList = newsList.data.data;
        $scope.base_url = Base.getBaseUrl();



    })

    .controller('NewsDetailCtrl', function ($scope,Base,news) {

        $scope.news = news.data.data;
        $scope.base_url = Base.getBaseUrl();

    })

    .controller('ProjectDetailCtrl', function ($scope,$cordovaInAppBrowser,$cordovaToast,Base,Project,$stateParams,project) {
        $id = $stateParams.projectId;
        var project = $scope.project = project.data.data;
        var base_url = $scope.base_url = Base.getBaseUrl();

        $scope.downloadFullText = function(){
            if (ionic.Platform.isWebView() || ionic.Platform.isAndroid()){

                url_file = base_url + project.fulltext.url;
                window.open(url_file,"_system","location=yes,enableViewportScale=yes,hidden=yes");

            }else {
                console.log("isWebView false");
            }

        }

    })

    .controller('ProjectCtrl', function ($scope,Base,Project,projects) {

        $scope.projectList = projects.data.data;
        $scope.project = null;
        $scope.base_url = Base.getBaseUrl();



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
