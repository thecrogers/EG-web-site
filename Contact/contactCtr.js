angular.module('elmGrove.controllers').controller('contactCrt', [
'$scope','$log','RestfulData',function($scope,$log,RestfulData){

$scope.map = { center: { latitude: 32.348951, longitude: -97.894235 }, zoom: 10 };

$scope.marker = {
   id: 0,
   coords: {
     latitude: 32.348951,
     longitude: -97.894235
   },
   options: { draggable: true },
   events: {
     dragend: function (marker, eventName, args) {
       $log.log('marker dragend');
       var lat = marker.getPosition().lat();
       var lon = marker.getPosition().lng();
       $log.log(lat);
       $log.log(lon);

       $scope.marker.options = {
         draggable: true,
         labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
         labelAnchor: "100 0",
         labelClass: "marker-labels"
       };
     }
   }
 };
 $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
   if (_.isEqual(newVal, oldVal))
     return;
   $scope.coordsUpdates++;
 });

$scope.submitForm= function submitForm()
{
   var data= new Object();
   data.Name=$("#name").val();
   data.Email=$("#email").val();
   data.Subject=$("#subject").val();
   data.Message=$("#message").val();

   RestfulData.PostData("Contact",data);

   $("#divName").addClass("has-success");
   $("#name").after('<span id="icnName" class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
   $("#divEmail").addClass("has-success");
   $("#email").after('<span id="icnEmail" class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
   $("#divSubject").addClass("has-success");
   $("#subject").after('<span id="icnPhone" class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
   $("#divMessage").addClass("has-success");
   $("#message").after('<span id="icnRequest" class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');

   setTimeout(function(){
     $("#divName").removeClass("has-success");
     $("#divEmail").removeClass("has-success");
     $("#divSubject").removeClass("has-success");
     $("#divMessage").removeClass("has-success");

     $("#icnName").remove();
     $("#icnEmail").remove();
     $("#icnPhone").remove();
     $("#icnRequest").remove();

     $("#name").val("");
     $("#email").val("");
     $("#subject").val("");
     $("#message").val("");
   }, 2000);

}

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
