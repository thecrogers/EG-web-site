angular.module('elmGrove.controllers').controller('comunityCtrl', [
'$scope','$log','RestfulData','$stateParams',function($scope,$log,RestfulData,$stateParams){

$scope.alert;
getRequest();

$scope.Requests=RestfulData.PrayerRequest;
getRequest();
//getAlerts();

$scope.upPrayed= function submitPrayerRequest(id,count)
{
RestfulData.UpdateData("Prayer",id+"/"+count)
.success(function (){
  RestfulData.GetJson("Prayer/"+$stateParams.num,2)
  .success(function (requests){
      $scope.Requests=requests;

      })

    })

}
$scope.submitPrayerRequest= function submitPrayerRequest()
{
 var pass=0;
 var data= new Object();
 data.Name=$("#txtName").val();
 data.Email=$("#txtEmail").val();
 data.Phone=$("#txtPhone").val();
 data.Requst=$("#txtRequest").val();
 data.Permissions=$("#ddlPrivacy").val();
 if(ValidateEmail(data.Email))
 {
$("#icnEmail").remove();
$("#divEmail").removeClass("has-error");
pass++;
}else {//badEmail
  $("#divEmail").addClass("has-error");
     $("#divEmail").focus();
     $("#txtEmail").after('<span id="icnEmail" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true" ></span>');
}

 if(validatePhone(data.Phone))
   {
     $("#icnPhone").remove();
     $("#divPhone").removeClass("has-error");
     pass++;
}
else {//bad Phone
  $("#divPhone").addClass("has-error");
  $("#divPhone").focus();
  $("#txtPhone").after('<span id="icnPhone" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true" ></span>');
}
    if(pass==2)
    {
     RestfulData.PostData("Prayer",data);
     $("#divName").addClass("has-success");
     $("#txtName").after('<span id="icnName" class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
     $("#divEmail").addClass("has-success");
     $("#txtEmail").after('<span id="icnEmail" class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
     $("#divPhone").addClass("has-success");
     $("#txtPhone").after('<span id="icnPhone" class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
     $("#divRequest").addClass("has-success");
     $("#txtRequest").after('<span id="icnRequest" class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
     $("#divPrivacy").addClass("has-success");

     setTimeout(function(){
       $("#divName").removeClass("has-success");
       $("#divEmail").removeClass("has-success");
       $("#divPhone").removeClass("has-success");
       $("#divRequest").removeClass("has-success");
       $("#divPrivacy").removeClass("has-success");
       $("#icnName").remove();
       $("#icnEmail").remove();
       $("#icnPhone").remove();
       $("#icnRequest").remove();
       $("#txtName").val("");
       $("#txtEmail").val("");
       $("#txtPhone").val("");
       $("#txtRequest").val("");
     }, 2000);

     RestfulData.GetJson("Prayer",2)
     .success(function (requests){
         $scope.Requests=requests;

         })
         .error(function(error){
           $scope.errorStatus='Could not retrieve News: '+error.message;
         });

  }

}

function getRequest()
{
  RestfulData.GetJson("Prayer/"+$stateParams.num,2)
.success(function (requests){
    $scope.Requests=requests;

    })
    .error(function(error){
      $scope.errorStatus='Could not retrieve News: '+error.message;
    });
  }

function ValidateEmail(mail)
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return true
  }

    return false
}


function validatePhone(phone) {
    var error = "";
    var stripped = phone.replace(/[\(\)\.\-\ ]/g, '');

   if (stripped == "") {

        return true;
    } else if (isNaN(parseInt(stripped))) {
        phone = "";
        error = "The phone number contains illegal characters.";
        return false;

    } else if (!(stripped.length == 10)) {
        phone = "";
        error = "The phone number is the wrong length. Make sure you included an area code.\n";
        return false;
    }
    else{
      return true;
    }
}
function getAlerts(){
  RestfulData.GetJson('Alerts')
  .success(function (alerts){
    $scope.alerts=alerts;})
    .error(function(error){
      $scope.errorStatus='Could not retrieve Alerts: '+error.message;
    });
  };


}])
