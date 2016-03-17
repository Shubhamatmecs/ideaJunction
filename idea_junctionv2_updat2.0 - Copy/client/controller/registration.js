var myApp = angular.module("myApp");


myApp.controller('RegistrationController',['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){

    console.log("RegistrationController initlized");
    $scope.registerUser = function(){

        $http.post('/users/register',$scope.user).success(
          function(response){
            alert(response);
            console.log(response);
             if(response === "true"){
               alert("Registration successfully redirecting to login")
                window.location.href='/'
             }
          else {
            alert(response);
          }
         }
       );
     }

    $scope.init = function() {
        $http.get('/users/userDetails').success(
        function(response) {
          alert(response);
          $scope.user = response;
          console.log($scope.user);
        }
      )
    }

    $scope.updateUserDetail = function() {

        $http.put('/users/updateUserDetails',$scope.user).success(
          function(response) {
            alert(response);
            console.log(response);
            if(response === "true") {
              alert("Updated Sucessfully");
              $location.path('/dashboard');
            }
          }
        )
    }

    $scope.changePassword = function() {
      $http.put('/users/changePassword',$scope.user).success(
        function(response) {
          alert(response);
          console.log(response);
          if(response == "true")
          {
            alert("Password Changed Successfully you will be redirected to dashboard");
            $location.path('/dashboard');
          }
        }
      )
    }

}]);
