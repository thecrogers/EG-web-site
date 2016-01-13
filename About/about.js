angular.module('elmGrove.controllers')
.controller('aboutCtrl', [
'$scope','RestfulData',function($scope,RestfulData){


//$scope.alert;

//getAlerts();

function getAlerts(){
  RestfulData.GetJson('Alerts')
  .success(function (alerts){
    $scope.alerts=alerts;})
    .error(function(error){
      $scope.errorStatus='Could not retrieve Alerts: '+error.message;
    });
  };

}])
