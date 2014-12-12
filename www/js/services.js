angular.module('starter.services', [])



    .factory('Base',function($http){

        BASE_URL = 'http://mct.ict.up.ac.th:10000';
        API_URL = BASE_URL + '/api/v1/';

        return {
            getBaseUrl : BASE_URL,
            resolveApiUrl : function(uri){
                return API_URL + uri;
            }
        }
    })

    .factory('Friends', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var friends = [
            {id: 0, name: 'Scruff McGruff'},
            {id: 1, name: 'G.I. Joe'},
            {id: 2, name: 'Miss Frizzle'},
            {id: 3, name: 'Ash Ketchum'}
        ];

        return {
            all: function () {
                return friends;
            },
            get: function (friendId) {
                // Simple index lookup
                return friends[friendId];
            }
        }
    })

    .factory('News', function ($http,Base) {

        return {
            all: function () {
                return $http({
                    url : Base.resolveApiUrl('news'),
                    method : 'get'
                });
            },
            get: function ($id) {
                return $http({
                    url : Base.resolveApiUrl('news/view/'+$id),
                    method : 'get'

                })
            }
        }
    });
