angular.module('elmGrove.directives')
.directive('blogpreview', function() {
  return {
    restrict: 'E',
     replace: true,
    templateUrl: '/templates/blog/blogPreview.html',
    link: function(scope,elmement,attrs)
    {

      var regex = /(<([^>]+)>)/ig;
      var tab="&nbsp;";
        var date= /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/ig;
      var pre=attrs.content.replace(regex, "");
      var view=pre.split("&nbsp;");
      var result =view[0];
      scope.Preview=result;

    }
  };
})
.directive('blogcontent', function($compile) {
  return {
    restrict: 'E',
     replace: true,
     transclude: true,
    templateUrl: '/templates/blog/blogPreview.html',
    link: function(scope, element, attrs) {
            var fix=attrs.content;
            fix=fix.replace("background: white;","");
            fix=fix.replace('style="background: white; margin-left: .5in; text-indent: -24.0pt;"','style="margin-left: .5in; text-indent: -24.0pt;"');
          
            var template = $compile(fix)(scope);
            element.replaceWith(template);
            scope.something="dfas";
          }
        }
        })




.directive('blogdate', function(){
  return{
    restrict: 'E',
    templateUrl: '/templates/blog/date.html',
      replace: true,
    link: function(scope,elmement,attrs) {
      var string=attrs.date.split("-");
      var dayTime=string[2].split("T");
      var day=dayTime[0];
      scope.Day=day;
      var num=string[1];
      var months= new Object();
      months["01"]="Jan";
      months["02"]="Feb";
      months["03"]= "Mar";
      months["04"]= "Apr";
      months["05"]= "May";
      months["06"]= "Jun";
      months["07"]= "Jul";
      months["08"]= "Aug";
      months["09"]= "Sep";
      months["10"]= "oct";
      months["11"]= "Nov";
      months["12"]= "Dec";
      scope.Month=months[num];
    }
    }
  });
