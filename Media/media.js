angular.module('elmGrove.controllers').controller('mediaCtrl', [
'$scope','$log','RestfulData',function($scope,$log,RestfulData){

$scope.alert;

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
