angular.module('itunes').controller('mainCtrl', function($scope, itunesService){
  //This is setting up the default behavior of our ng-grid. The important thing to note is
  //the 'data' property. The value is 'songData'. That means ng-grid is looking for songData on $scope and is putting whatever songData is into the grid.

  $scope.songData = [];
  $scope.gridOptions = {
      data: 'songData',
      height: '110px',
      sortInfo: {fields: ['Song', 'Artist', 'Collection', 'Type'], directions: ['asc']},
      columnDefs: [
        {field: 'Play', displayName: 'Play', width: '40px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a href="{{row.getProperty(col.field)}}"><img src="http://www.icty.org/x/image/Miscellaneous/play_icon30x30.png"></a></div>'},
        {field: 'Artist', displayName: 'Artist'},
        {field: 'Collection', displayName: 'Collection'},
        {field: 'AlbumArt', displayName: 'Album Art', width: '110px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><img src="{{row.getProperty(col.field)}}"></div>'},
        {field: 'Type', displayName: 'Type'},
        {field: 'CollectionPrice', displayName: 'Collection Price'},
      ],
      filterOptions: $scope.filterOptions
  };


    $scope.getSongData = function() {
      console.log($scope.selectedItem);
      itunesService.getSongs($scope.artist).then(function(response){
        console.log(response);
        var songList = [];

        response.results.forEach(function(each){
          var songData = {};
          // songData.play = each.previewUrl;
          // songData.artist = each.artistName;
          // songData.collection = each.collectionName;
          // songData.albumArt = each.artworkUrl30;
          // songData.kind = each.kind;
          // songData.collectionPrice = each.collectionPrice;
          songData.Play = each.previewUrl;
          songData.Artist = each.artistName;
          songData.Collection = each.collectionName;
          songData.AlbumArt = each.artworkUrl100;
          songData.Type = each.kind;
          songData.CollectionPrice = each.collectionPrice;
          songList.push(songData);
        });
        $scope.songData = songList;
        // console.log($scope.songData.length + ' ' + $scope.songData[0].artist);
      });
    }

    $scope.searchItem = ['Music', 'Artist','Movie'];
    $scope.filterItem = ['Artist', 'Collection', 'Type', 'Collection Price'];
    $scope.filterOptions = {
      filterText: ''
    };
  
});
