function MainCTRL($scope, $http){

	$http.get('/api/users')
		.success(function(retval){
			$scope.users = retval;
		});
}