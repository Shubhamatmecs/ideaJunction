var myApp = angular.module("myApp");


myApp.controller('LoginController',['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){

    console.log("LoginController initlized");

   $scope.validateUser = function(){

       $http.post('/users/login',$scope.user).success(
         function(response){
           alert(response);
           console.log(response);
            if(response === "Valid user"){
               window.location.href='/#dashboard'
            }
         else {
           alert("wrong id/password");
         }
      } );}

    $scope.createAccount = function() {
        
        $location.path('/registration');
    }      


}]);
