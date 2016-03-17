var myApp = angular.module('myApp',['ngRoute']);
myApp.config(function($routeProvider){

   $routeProvider.when('/',{
       controller: 'LoginController',
       templateUrl: 'views/login.html'

   })
   .when('/registration',{
       controller: 'RegistrationController',
       templateUrl: 'views/registration.html'

   })
   .when('/dashboard',{
       controller: 'DashboardController',
       templateUrl: 'views/dashboard.html'

   })
   .when('/dashboard/postidea',{
       controller: 'DashboardController',
       templateUrl: 'views/createidea.html'

   })
   .when('/dashboard/details/:id',{
       controller: 'DashboardController',
       templateUrl: 'views/viewidea.html'

   })

   .when('/users/updateUserDetails',{
       controller: 'RegistrationController',
       templateUrl: 'views/updateUserDetails.html'

   })

   .when('/users/changePassword',{
       controller: 'RegistrationController',
       templateUrl: 'views/changePassword.html'

   })

    .otherwise({
       redirectTo: '/'
   });
});
