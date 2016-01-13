angular.module('elmGrove.directives',[]);
angular.module('elmGrove.services',[]);
angular.module('elmGrove.controllers',[]);
angular.module('',[]);
angular.module('ElmGrove', ['ui.router','oc.lazyLoad','elmGrove.services'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  "$locationProvider",
  function($stateProvider, $urlRouterProvider,$locationProvider) {//,$provide, $compileProvider


  $urlRouterProvider.otherwise('/home');
  $locationProvider.html5Mode(true);
  $stateProvider

  .state('Home', {
    url: "/home",
    templateUrl: "Home/index.html",
    controller: "homeCtrl",
    resolve:{
      store: function ($ocLazyLoad){
        return $ocLazyLoad.load(
        {
            name:"elmGrove.controllers",
            files:["Home/main.js"]
        }
      )
      }
    }
  })
  .state('About', {
    url: "/about",
    templateUrl: "About/about.html",
    controller: "aboutCtrl",
  resolve:{
    store: function ($ocLazyLoad){
      return $ocLazyLoad.load(
      {
          name:"elmGrove.controllers",
        files:["About/about.js"]
      }
    )
    }
  }

  })

  .state('Beliefs', {
    url: "/beliefs",
    templateUrl: "About/beliefs.html",
    controller: "aboutCtrl",
    resolve:{
      store: function ($ocLazyLoad){
        return $ocLazyLoad.load(
        {
            name:"elmGrove.controllers",
          files:["About/about.js"]
        }
      )
      }
    }


  })

  .state('Staff', {
    url: "/staff",
    templateUrl: "About/staff.html",
    controller: "aboutCtrl",
    resolve:{
      store: function ($ocLazyLoad){
        return $ocLazyLoad.load(
        {
            name:"elmGrove.controllers",
          files:["About/about.js"]
        }
        )
      }
    }


  })
  .state('ourStory', {
    url: "/OurStory",
    templateUrl: "About/ourStory.html",
    controller: "aboutCtrl",
    resolve:{
      store: function ($ocLazyLoad){
        return $ocLazyLoad.load(
        {
            name:"elmGrove.controllers",
          files:["About/about.js"]
        }
        )
      }
    }
  })


  .state('Missions', {
    url: "/missions",
    templateUrl: "About/outReach.html",
    controller: "aboutCtrl",
    resolve:{
      store: function ($ocLazyLoad){
        return $ocLazyLoad.load(
        {
            name:"elmGrove.controllers",
          files:["About/about.js"]
        }
        )
      }
    }

  })


  .state('Media', {
    url: "/media",
    templateUrl: "Media/media.html",
    controller: "mediaCtrl",
    resolve:{
      store: ['$ocLazyLoad','RestfulData', function ($ocLazyLoad,RestfulData){
        return $ocLazyLoad.load(
        {
            name:"elmGrove.controllers",
          files:["Media/media.js"]
        }
        )

    }]
    }
  })

  .state('Sermons', {
    url: "/sermons",
    templateUrl: "Media/sermons.html",
    controller: "mediaCtrl",
    resolve:{
      store: function ($ocLazyLoad){
        return $ocLazyLoad.load(
        {
            name:"elmGrove.controllers",
          files:["Media/media.js"]
        }
        )
      }
    }

  })

  .state('Music', {
    url: "/music",
    templateUrl: "Media/music.html",
    controller: "mediaCtrl",
    resolve:{
      store: function ($ocLazyLoad){
        return $ocLazyLoad.load(
        {
            name:"elmGrove.controllers",
          files:["Media/media.js"]
        }
        )
      }
    }

  })

  .state('Community', {
    url: "/community",
    templateUrl: "Comunity/communitym.html",
    controller: "comunityCtrl",
    resolve:{
      store: function ($ocLazyLoad){
        return $ocLazyLoad.load(
        {
            name:"elmGrove.controllers",
          files:["Comunity/comunity.js"]
        }
        )
      }
    }
  })

  .state('Prayer', {
    url: "/prayer",
    templateUrl: "Comunity/prayer.html",
    controller: "comunityCtrl",
    resolve:{
      store:['$ocLazyLoad','RestfulData', function ($ocLazyLoad,RestfulData){
        return $ocLazyLoad.load(
        {
            name:"elmGrove.controllers",
          files:["Comunity/comunity.js","Blog/dirBlog.js"]
        }
        ).then(function () {
         //RestfulData.GetJson("Prayer",2);
        })
      }]
    }

  })

  .state('PrayerPage', {
    url: "/prayer/:num",
    templateUrl: "Comunity/prayer.html",
    controller: "comunityCtrl",
    resolve:{
      store:['$ocLazyLoad','RestfulData','$stateParams', function ($ocLazyLoad,RestfulData,$stateParams){
        return $ocLazyLoad.load(
        {
            name:"elmGrove.controllers",
          files:["Comunity/comunity.js","Blog/dirBlog.js"]
        }
        ).then(function () {
      //    RestfulData.GetJson("Prayer/"+$stateParams.num,2);
        })
      }]
    }

  })


  .state('Testimonals', {
    url: "/testimonies",
    templateUrl: "Comunity/testimonals.html",
    controller: "comunityCtrl",
    resolve:{
      store: function ($ocLazyLoad){
        return $ocLazyLoad.load(
        {
            name:"elmGrove.controllers",
          files:["Comunity/comunity.js"]
        }
        )
      }
    }

  })

  .state('Praises', {
    url: "/praises",
    templateUrl: "Comunity/praises.html",
    controller: "comunityCtrl",
    resolve:{
      store: function ($ocLazyLoad){
        return $ocLazyLoad.load(
        {
            name:"elmGrove.controllers",
          files:["Comunity/comunity.js"]
        }
        )
      }
    }

  })

  .state('Blog', {
    url: "/blog",
    templateUrl: "Blog/blog.html",
      controller: "blogCtrl",
    resolve:{
        store: ['$ocLazyLoad','RestfulData', function ($ocLazyLoad,RestfulData){
          return $ocLazyLoad.load(
          {
              name:"elmGrove.controllers",
            files:["Blog/blog.js","Blog/dirBlog.js"]
          }
        ).then(function () {

        RestfulData.GetApi('https://www.googleapis.com/blogger/v3/blogs/8588915655207922034/posts?maxResults=5&key=AIzaSyB4IzO48a6yYCeXR1wY8Li5eP7kxs6e7-4');
      })
      }]
    }


  })

  .state('Blogpage', {
    url: "/blog/:page",
    templateUrl: "Blog/blog.html",
      controller: "blogCtrl",
    resolve:{
        store: ['$ocLazyLoad','RestfulData','$stateParams', function ($ocLazyLoad,RestfulData,$stateParams){
          return $ocLazyLoad.load(
          {
              name:"elmGrove.controllers",
            files:["Blog/blog.js","Blog/dirBlog.js"]
          }
        ).then(function () {

        RestfulData.GetApi('https://www.googleapis.com/blogger/v3/blogs/8588915655207922034/posts?maxResults=5&pageToken='+$stateParams.page+'&key=AIzaSyB4IzO48a6yYCeXR1wY8Li5eP7kxs6e7-4');
      })
      }]
    }


})


  .state('Post', {
    url: "/blog/post/:id",
    templateUrl: "/Blog/blog-single.html",
    controller: "postCtrl",
    resolve:{
      store: ['$ocLazyLoad','RestfulData','$stateParams', function ($ocLazyLoad,RestfulData,$stateParams){
        return $ocLazyLoad.load(
        {
            name:"elmGrove.controllers",
          files:["Blog/post.js",,"Blog/dirBlog.js"]
        }
      ).then(function () {

        //for(var prop in RestfulData) {
        //  if(obj.hasOwnProperty(prop))
        //  return RestfulData;
      //  }
        return RestfulData.GetApi('https://www.googleapis.com/blogger/v3/blogs/8588915655207922034/posts/'+$stateParams.id+'?key=AIzaSyB4IzO48a6yYCeXR1wY8Li5eP7kxs6e7-4');
    })
    }]
  }


})

  .state('Contact', {
    url: "/contact",
    templateUrl: "Contact/contact.html",
    controller: "contactCrt",
    resolve:{
      store: ["$ocLazyLoad",function ($ocLazyLoad){
        return $ocLazyLoad.load(
        {
          name:"uiGmapgoogle-maps",
        files:["/js/Componets/angular-google-maps.min.js",'/js/Componets/lodash.min.js']

        }
      ).then(function(){
        return $ocLazyLoad.load(
        {
          name:"elmGrove.controllers",
        files:["Contact/contactCtr.js"]
        }
      )
      } )
    }]
    }



  });

}])
.controller("footerCtr", [
'$scope','RestfulData',function($scope,RestfulData){

$scope.Sunday=[];
$scope.Wednesday=[];
$scope.schedule;
getSchedule();
function getSchedule(){
    RestfulData.GetJson('Schedule',1)
    .success(function (schedule){
      $scope.schedule=schedule;
      var size = $scope.schedule.length;
      var count=0, inner=0, innerToo=0;
      while(count<size)
      {
        if($scope.schedule[count].Day=="Sunday")
          {
            //$scope.Sunday[inner].Time=$scope.schedule[count].Time;
            //$scope.Sunday[inner].Title=$scope.schedule[count].Title;
            $scope.Sunday.push($scope.schedule[count]);
            //inner++;
          }else if($scope.schedule[count].Day=="Wednesday")
          {
            //$scope.Wednesday[innerToo].Time=$scope.schedule[count].Time;
            //$scope.Wednesday[innerToo].Title=$scope.schedule[count].Title;
            $scope.Wednesday.push($scope.schedule[count]);
          //innerToo++;
          }
      count++;
      }
        })
      .error(function(error){
        $scope.errorStatus='Could not retrieve Schedule: '+error.message;
      });
    };
}]);
