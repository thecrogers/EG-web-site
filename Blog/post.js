angular.module('elmGrove.controllers').controller('postCtrl', [
'$scope','$log','$stateParams','RestfulData',function($scope,$log,$stateParams,RestfulData){

//$scope.alert;
//$scope.Post;
$scope.post=RestfulData.ApiResults;
//var length=RestfulData.ApiResults.items.length;
//$scope.post=getPost($stateParams.id,length);
//getAlerts();

function getAlerts(){
  RestfulData.GetJson('Alerts')
  .success(function (alerts){
    $scope.alerts=alerts;})
    .error(function(error){
      $scope.errorStatus='Could not retrieve Alerts: '+error.message;
    });
  };


    function getPost(id,length){

      var x =0;
      while(x<length)
      {
      if($scope.posts.items[x].id === id){
        return $scope.posts.items[x];
        }
        x++;
      }
    };





}])
//RestfulData.GetApi('https://www.googleapis.com/blogger/v3/blogs/8588915655207922034/posts/'+id+'?key=AIzaSyB4IzO48a6yYCeXR1wY8Li5eP7kxs6e7-4')
