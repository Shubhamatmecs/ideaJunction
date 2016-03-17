var myApp = angular.module("myApp");


myApp.controller('DashboardController',['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){

    console.log("DashboardControllerController initlized");
    $scope.pageNumber=1;
    $scope.recordSize=5;
    $scope.getIdeas = function(pageNumber){
       $http.get('/ideas/'+pageNumber+'/'+$scope.recordSize).success(function(response){
           alert($scope.ideas);
           console.log(response);
           $scope.ideas =response;
           console.log($scope.ideas);

       });
   }
     $scope.getIdeas($scope.pageNumber);
     $scope.increment = function(){
         $scope.pageNumber += 1;
       }
    $scope.next=function(){
      $scope.increment();
      $scope.getIdeas($scope.pageNumber);

    }
    $scope.postIdea=function(){

       $location.path('/dashboard/postidea');

    }
   $scope.newideaPost=function(){
     $http.post('/ideas',$scope.newidea).success(
       function(response){
         console.log(response);
          if(response === "Idea added."){
            alert("Idea successfully")
             $location.path('/dashboard');
          }
       else {
         alert(response);
       }
      }

);
   }

   $scope.viewidea=function(){
     console.log($routeParams.id);
      var id = $routeParams.id;
     $http.get('/ideas/'+id).success(
       function(response){
         $scope.idea=response;
      });
   }

   $scope.userDetails=function(){

     $http.get('users/userDetails').success(
       function(response){
         $scope.user=response;
       }

     );
   }
 $scope.logout=function(){
     $http.get('/logout').success(
       function(response){
          if(response === "true"){$location.path('/')}

       }

     );
   }
   
  $scope.filter=function(){
      
    //  ideas/filter?itemsPerPage=2&pagenumber=1&start_date=16:03:10&end_date=16:03:11&author=Dh&title=Pr
      $scope.itemsPerPage=5;
      $scope.pageNumber=0;
     $http.get('/ideas/filter?itemsPerPage='+$scope.itemsPerPage+'&pagenumber='+$scope.pageNumber+'&start_date='+
     $scope.start_date+'&end_date='+$scope.end_date+'&author='+ $scope.author+'&title='+$scope.title).success(
       function(response){
          $scope.ideas =response;
       }

     );
   } 
   
   $scope.likeIdea=function(){
      console.log($scope.idea.id);
      var ideaID = {idea_id: $scope.idea.id};
      console.log(ideaID);
   $http.post('/likes/like',ideaID).success(
       function(response){
         console.log(response);
       }

     );
   }  
   
    $scope.islikeIdea=function(){
    var ideaID = $routeParams.id;
     
      console.log(ideaID);
   $http.get('likes/liked/'+ideaID).success(
       function(response){
           if(response === 'yes'){
               $scope.checked=true;
               $scope.liked="Idea is Liked"
           }
           else{
               $scope.liked="Like"
           }
         console.log(response);
       }

     );
   }  
}]);
