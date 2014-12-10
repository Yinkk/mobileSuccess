angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

.factory('News',function($http){
        var news = [
            { id:0, header : "Header 1", content : "Content 1", news_image : 'holder.js/80x80'},
            { id:1, header : "Header 2", content : "Content 2", news_image : 'holder.js/80x80'},
            { id:2, header : "Header 3", content : "Content 3", news_image : 'holder.js/80x80'},
            { id:3, header : "Header 4", content : "Content 4", news_image : 'holder.js/80x80'},
            { id:4, header : "Header 5", content : "Content 5", news_image : 'holder.js/80x80'},
        ];

        return {
            all : function(){
                return news;
            },
            get : function($id){
                return news[$id];
            }
        }
    });
