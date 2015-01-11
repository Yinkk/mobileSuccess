angular.module('starter.controllers', [])

    .controller('HomeCtrl', ['$scope', 'Base', 'News', 'newsList',
        function ($scope, Base, News, newsList) {
            $scope.newsList = newsList.data.data;
            $scope.base_url = Base.getBaseUrl();
        }])

    .controller('NewsDetailCtrl', ['$scope', 'Base', 'news',
        function ($scope, Base, news) {

            $scope.news = news.data.data;
            $scope.base_url = Base.getBaseUrl();

        }])

    .controller('ProjectMoreDetailCtrl', ['$scope', 'Base', 'Project', '$stateParams', 'project',
        function ($scope, Base, Project, $stateParams, project) {
            $id = $stateParams.projectId
            $scope.detail_en = $stateParams.detail_en;
            $scope.detail_th = $stateParams.detail_th;
            var project = $scope.project = project.data.data;
            var base_url = $scope.base_url = Base.getBaseUrl();

            console.log("ProjectMoreDetailCtrl")
        }])

    .controller('ProjectDetailCtrl', ['$scope', '$state', '$cordovaInAppBrowser', 'Base', 'Project', '$stateParams', 'project', 'project_photos',
        function ($scope, $state, $cordovaInAppBrowser, Base, Project, $stateParams, project, project_photos) {
            $id = $stateParams.projectId;

            var project = $scope.project = project.data.data;
            var project_photos = $scope.project_photos = project_photos.data.data;
            console.log(project_photos);
            var base_url = $scope.base_url = Base.getBaseUrl();

            $scope.summary_cut = true;

            $scope.summaryText = function (text, size) {
                if ($scope.summary_cut) {
                    return text.slice(0, size)
                } else {
                    return text
                }
            }

            $scope.readMore = function (detailEn, detailTh) {
                $state.go("tab.project-more-detail", {
                    projectId: $id,
                    detail_en: detailEn,
                    detail_th: detailTh
                })
            }

            $scope.downloadFullText = function () {
                if (ionic.Platform.isWebView() || ionic.Platform.isAndroid()) {

                    url_file = base_url + project.fulltext.url;
                    window.open(url_file, "_system", "location=yes,enableViewportScale=yes,hidden=yes");

                } else {
                    console.log("isWebView false");
                }

            }

        }])

    .controller('ProjectCtrl', ['$scope','$state', 'Base', 'Project', 'projects',
        function ($scope,$state, Base, Project, projects) {

            $scope.projectList = projects.data.data;
            $scope.project = null;
            $scope.base_url = Base.getBaseUrl();


        }])

    .controller('MapCtrl', ['$scope','$state', 'projects',
        function ($scope,$state, projects) {

            $scope.projects = projects.data.data;

            $scope.projects.forEach(function(project){
                if(project.gmapWindowsOption === undefined){
                    project.gmapWindowsOption = {
                        visible : false,
                        maxWidth :300
                    }
                }
            })

            $scope.map = {
                center: {
                    latitude: 19.192128,
                    longitude: 99.878834
                },
                zoom: 10
            };

            $scope.markerClick = function (project) {
                $scope.projects.forEach(function(project){
                    project.gmapWindowsOption.visible = false;
                })
                project.gmapWindowsOption.visible = true
            }

            $scope.mapclick = function(project){
                $state.go('tab.project-detail',{
                    projectId : project.id
                })
            }
        }])

    .controller('MediaCtrl', ['$scope',
        function ($scope) {

        }])

    .controller('ContactCtrl', ['$scope',
        function ($scope) {

        }])


    .controller('TabCtrl', ['$scope', '$state',
        function ($scope, $state) {

            $scope.go = function (page) {
                $state.go(page)
            }

        }]);
