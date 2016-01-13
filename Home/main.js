angular.module('elmGrove.controllers').controller('homeCtrl', [
'$scope','$log','RestfulData',function($scope,$log,RestfulData){

$scope.news;
$scope.schedule;
$scope.alert;
$scope.welcome;

getNews();
getCalendar();
//getAlerts();
//getWelcome();
function getAlerts(){
  RestfulData.GetJson('Alerts')
  .success(function (alerts){
    $scope.alerts=alerts;})
    .error(function(error){
      $scope.errorStatus='Could not retrieve Alerts: '+error.message;
    });
  };



function getNews(){
      RestfulData.GetJson('News',1)
      .success(function (news){
        $scope.news = news;
        })
        .error(function(error){
          $scope.errorStatus='Could not retrieve News: '+error.message;
        });
      }

      function getWelcome(){
            RestfulData.GetJson('Page/1')
            .success(function (data){
              $scope.welcome = data;
              })
              .error(function(error){
                $scope.errorStatus='Could not retrieve News: '+error.message;
              });
            }

function getCalendar()
{
    $('#calendar').fullCalendar({
    googleCalendarApiKey: 'AIzaSyB4IzO48a6yYCeXR1wY8Li5eP7kxs6e7-4',
    events: {
        googleCalendarId: '79jau7kvq44mvmgu4oqssbpar4@group.calendar.google.com',
         //className: 'gcal-event'
    },
    //defaultView: 'basicWeek',
});
}
}])
