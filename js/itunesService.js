angular.module('itunes').service('itunesService', function($http, $q){

  //A method that accepts an artist's name as the parameter, then makes a 'JSONP' http request 

    this.getSongs = function(artist) {
    var deferred = $q.defer();
    var urlString = 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK';
    $http.jsonp(urlString).then(function(response){
      deferred.resolve(response.data);
    });

    return deferred.promise;
    }
});
