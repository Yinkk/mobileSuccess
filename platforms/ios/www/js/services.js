angular.module('starter.services', [])



    .factory('Base',function($http){

        BASE_URL = 'http://mct.ict.up.ac.th:10000';
        TEST_URL = 'http://success.local';
        API_URL = '/m/v1/';

        getResolveBaseUrl = function(env){
            env = 'PRODUCTION'
            if(env == undefined){
                env = 'PRODUCTION'
            }

            uri = '';
            if(env === 'PRODUCTION'){
                uri = BASE_URL;
            }else if(env === 'TEST') {
                uri = TEST_URL;
            }
            return uri;
        }

        return {
            getBaseUrl : function(env){
                url =  getResolveBaseUrl(env);
                //console.log(url);
                return url;
            },
            resolveApiUrl : function(uri,env){
                env = typeof env == undefined ? 'PRODUCTION' : env;
                uri = getResolveBaseUrl(env)+ API_URL+ uri;
                return uri;
            }
        }
    })

    .factory('Project',function($http,Base,$q){
        return {
            all : function(){
                return $http({
                    url : Base.resolveApiUrl('project'),
                    method : 'get'
                })
            },
            get : function($id){
                return $http({
                    url : Base.resolveApiUrl('project/view/'+$id),
                    method : 'get'
                });
            }
        }
    })

    .factory('News', function ($http,Base) {

        return {
            getAll: function () {
                return $http({
                    url : Base.resolveApiUrl('news'),
                    method : 'get'
                });
            },
            getById: function ($id) {
                return $http({
                    url : Base.resolveApiUrl('news/view/'+$id),
                    method : 'get'

                })
            }
        }
    });
