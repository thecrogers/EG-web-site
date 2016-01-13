angular.module('elmGrove.services').factory('RestfulData',['$http',function($http){
  var urlBase='API/v1/';
  var RestfulData={
    ApiResults:{},
    JsonResults:{},
    PrayerRequest:{},
    PostResults:{}
  };

//will get any data given to the GET request. no parms
  RestfulData.GetJson=function(request,page){
    return $http.get(urlBase+request).success(function(data){
        if(page==1)
        {
          RestfulData.JsonResults=data;
        }
        else if(page==2)
        {
        RestfulData.PrayerRequest=data;
        }
  });
};
  RestfulData.GetApi=function(request){
  return $http.get(request).success(function(data){
      angular.copy(data, RestfulData.ApiResults);
});
};


  RestfulData.PostData=function(request,data){
    return $http.post(urlBase+request, data).success(function(result){
        angular.copy(result, RestfulData.PostResults);
  });
};


  RestfulData.UpdateData=function(request,parm){
    return $http.put(urlBase+request+'/'+parm);
  };

  RestfulData.DeleteData=function(request,requestTwo,requestThree){
    return $http.delete(urlBase+request+'parm');
  };

return RestfulData;


}]);
