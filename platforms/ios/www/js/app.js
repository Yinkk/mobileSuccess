// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers','btford.markdown', 'starter.services','uiGmapgoogle-maps'])

    .run(function ($ionicPlatform,$ionicLoading,$rootScope,$cordovaSplashscreen,$cordovaToast,News) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            var stack=0;

            $rootScope.$on('loading:show', function() {

                if(stack ==0){
                    $ionicLoading.show({template: 'Loading'})
                }
                stack++;
            })

            $rootScope.$on('loading:hide', function() {
                if(stack >0){
                    stack--;
                }

                if(stack==0){
                    $ionicLoading.hide();
                }

            })

            $rootScope.$on('loading:error',function(){
                console.log("ERROR cannot connect internet");
                $ionicLoading.hide();
                $cordovaToast.show("มีข้อผิดพลาด ไม่สามารถติดต่อเซิฟเวอร์ได้",'long','center').then(function(success){

                })
            })

            News.getAll().success(function(){
                $cordovaSplashscreen.hide()
            });

        });
    })
    .config(function($httpProvider) {
        $httpProvider.interceptors.push(function($rootScope) {
            return {
                request: function(config) {
                    $rootScope.$broadcast('loading:show')
                    return config
                },
                response: function(response) {
                    $rootScope.$broadcast('loading:hide')
                    return response
                },
                requestError : function(rejetion){
                    $rootScope.$broadcast('loading:error')
                    return rejetion
                },
                responseError : function(response){
                    $rootScope.$broadcast('loading:error')
                    return response
                }

            }
        })
    })


    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // Each tab has its own nav history stack:

            .state('tab.home', {
                url: '/home',
                views: {
                    'tab-home': {
                        templateUrl: 'templates/tab-home.html',
                        controller: 'HomeCtrl',
                        resolve : {
                            newsList : function(News){
                                return News.getAll();
                            }
                        }
                    }
                }
            })

            .state('tab.news-detail', {
                url: '/news/:newsId/detail',
                views: {
                    'tab-home': {
                        templateUrl: 'templates/news-detail.html',
                        controller: 'NewsDetailCtrl',
                        resolve : {
                            news : function(News,$stateParams){
                                return News.getById($stateParams.newsId)
                            }
                        }
                    }
                }
            })
            .state('tab.project-more-detail', {
                url: '/project/:projectId/more-detail/:detail_en/:detail_th',
                views: {
                    'tab-project': {
                        templateUrl: 'templates/project-more-detail.html',
                        controller: 'ProjectMoreDetailCtrl',
                        resolve : {
                            project : function(Project,$stateParams){
                                return Project.getCurrent();
                            }
                        }
                    }
                }
            })

            .state('tab.project-detail', {
                url: '/project/:projectId/detail',
                views: {
                    'tab-project': {
                        templateUrl: 'templates/project-detail.html',
                        controller: 'ProjectDetailCtrl',
                        resolve : {
                            project : function(Project,$stateParams){
                                return Project.get($stateParams.projectId);
                            },
                            project_photos : function(Project,$stateParams){
                                return Project.getPhotos($stateParams.projectId);
                            }
                        }
                    }
                }
            })

            .state('tab.project', {
                url: '/project',
                views: {
                    'tab-project': {
                        templateUrl: 'templates/tab-project.html',
                        controller: 'ProjectCtrl',
                        resolve : {
                            projects : function(Project,$stateParams){
                                return Project.all()
                            }
                        }
                    }
                }
            })
            .state('tab.map', {
                url: '/map',
                views: {
                    'tab-map': {
                        templateUrl: 'templates/tab-map.html',
                        controller: 'MapCtrl',
                        resolve : {
                            projects : function(Project,$stateParams){
                                return Project.all()
                            }
                        }
                    }
                }
            })

            .state('tab.media', {
                url: '/media',
                views: {
                    'tab-media': {
                        templateUrl: 'templates/tab-media.html',
                        controller: 'MediaCtrl'
                    }
                }
            })

            .state('tab.contact', {
                url: '/contact',
                views: {
                    'tab-contact': {
                        templateUrl: 'templates/tab-contact.html',
                        controller: 'ContactCtrl'
                    }
                }
            })
        ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/home');

    })

    .directive('holderFix', function () {
        return {
            link: function (scope, element, attrs) {
                Holder.run({images: element[0], nocss: true});
            }
        };
    })
    .filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    })
    .filter('badDateToISO', function () {
        return function (badTime) {
            var goodTime = badTime.replace(/(.+) (.+)/, "$1T$2Z");
            return goodTime;
        };
    });
