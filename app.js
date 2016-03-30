'use strict';

(function(){

	var app = angular.module("kitchenApp", ["firebase"]);

	app.controller("MainCtrl", ["$scope", "$firebaseArray",
	  function($scope, $firebaseArray) {
			var ref = new Firebase("https://recipe-class-santosnarom.firebaseio.com/recipes");

		  $scope.recipes = $firebaseArray(ref);
			$scope.edit = false;
			$scope.welcome = false;

			$scope.start = function() {
		    $scope.welcome = true;
		  };

			$scope.unstart = function() {
		    $scope.welcome = false;
				$scope.newRecipeClass = '';
				$scope.newRecipeName = '';
				$scope.newRecipeText = '';
				$scope.edit = false;
		  };

		  $scope.addRecipe = function() {
		    $scope.recipes.$add({
		      name: $scope.newRecipeName,
		      class: $scope.newRecipeClass,
		      text: $scope.newRecipeText
		    }).then(function(){
					$scope.newRecipeClass = '';
					$scope.newRecipeName = '';
					$scope.newRecipeText = '';
				});

				if(ref){
					$scope.newRecipeClass = '';
					$scope.newRecipeName = '';
					$scope.newRecipeText = '';
				}
		  };

			$scope.removeRecipe = function(obj) {
		    $scope.recipes.$remove(obj);
		  };

			$scope.showEdit = function(obj) {
		    $scope.edit = $scope.edit ? false : true;
				$scope.editRecipeObj = obj;
				$scope.editRecipeName = obj.name;
				$scope.editRecipeClass = obj.class;
				$scope.editRecipeText = obj.text;

		  };

			$scope.editRecipe = function() {
				$scope.editRecipeObj.name = $scope.editRecipeName;
				$scope.editRecipeObj.class = $scope.editRecipeClass;
				$scope.editRecipeObj.text = $scope.editRecipeText;

				if(ref){
					$scope.editRecipeClass = '';
					$scope.editRecipeName = '';
					$scope.editRecipeText = '';
					$scope.edit = false;
				}

		    $scope.recipes.$save($scope.editRecipeObj).then(function(){
					$scope.editRecipeClass = '';
					$scope.editRecipeName = '';
					$scope.editRecipeText = '';
					$scope.edit = false;
				});

		  };

	  }
	]);

})();
