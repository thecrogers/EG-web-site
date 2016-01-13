angular.module('elmGrove.controllers').controller('blogCtrl', [
'$scope','$log','RestfulData','$stateParams',function($scope,$log,RestfulData,$stateParams){

$scope.alert;
$scope.Posts=RestfulData.ApiResults;
$scope.Day;
$scope.Month;
//getPost();
//getAlerts();
$scope.isFirstPage=function isFirstPage()
{
  if(window.location.href=="http://elmgrove.church/blog"){
    return false;
  }else {
    return true;
  }
}

$scope.goBack=function goBack() {
    window.history.back();
}

function getAlerts(){
  RestfulData.GetJson('Alerts')
  .success(function (alerts){
    $scope.alerts=alerts;})
    .error(function(error){
      $scope.errorStatus='Could not retrieve Alerts: '+error.message;
    });
  };

  function getPost(){
   RestfulData.GetApi('https://www.googleapis.com/blogger/v3/blogs/8588915655207922034/posts?maxResults=5&key=AIzaSyB4IzO48a6yYCeXR1wY8Li5eP7kxs6e7-4')
    //$scope.Posts=RestfulData.ApiResults;
    .success(function (posts){
      $scope.Posts=posts;
    //  $scope.Posts.day=getDay($scope.Posts.published);
    //  $scope.Posts.month=getDay($scope.Posts.published);
      })
      .error(function(error){
        $scope.errorStatus='Could not retrieve Posts: '+error.message;
      });
    };

$scope.getDay=function getDay(date)
{
  var string=date.split("-");
  var dayTime=string[2].split("T");
  var day=dayTime[0];
  $scope.Day=day;
}
$scope.getMonth=function getMonth(date)
{
  var string=date.split("-");
  var num=string[1];
  var month= new Object();
  month["01"]="Jan";
  month["02"]="Feb";
  month["03"]= "Mar";
  month["04"]= "Apr";
  month["05"]= "May";
  month["06"]= "Jun";
  month["07"]= "Jul";
  month["08"]= "Aug";
  month["09"]= "Sep";
  month["10"]= "oct";
  month["11"]= "Nov";
  month["12"]= "Dec";
  $scope.Month=month[num];
}

$scope.preview=function(content)
{
  var regex = /(<([^>]+)>)/ig;
  var tab="&nbsp;";
  var pre=content.replace(regex, "");
  $scope.preview=pre;

}



}])
