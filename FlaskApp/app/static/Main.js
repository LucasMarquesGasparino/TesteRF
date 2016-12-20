angular.module('ui.filters', []);
angular.module('ui.directives', []);
angular.module('ui', [
    'ui.filters',
    'ui.directives']).value('ui.config', {});

angular.module('MyApp', ['ui.directives'])

.controller('TopLevel', function ($scope, $http) {
    //$scope.field1 = {label: 'Field 1', value: 'My Spoon is Too Big'};
    //$scope.field2 = {label: 'Field 2', value: 'I am a banana!'};
    //$scope.field3 = {label: 'Field 3', value: 'queen.of@france.com'};
	
	$scope.records = [
        "Alfreds Futterkiste",
        "Berglunds snabbköp",
        "Centro comercial Moctezuma",
        "Ernst Handel",
    ];
	
	$http.get("http://localhost:5000/get_records") 	
		.then( function(response) { $scope.myData = response.data }, function(error) {alert(error.data); alert(error.status)});
		
	$scope.changeLanguage = function() {
		if ($scope.labelName == "Nome"){
			$scope.labelName = englishText[0];
			$scope.labelPhone = englishText[1];
			$scope.labelEmailAdress = englishText[2];
			$scope.labelPhoneError = englishText[3];
			$scope.labelEmailAdressError = englishText[4];
		}
		else {
			$scope.labelName = portugueseText[0];
			$scope.labelPhone = portugueseText[1];
			$scope.labelEmailAdress = portugueseText[2];
			$scope.labelPhoneError = portugueseText[3];
			$scope.labelEmailAdressError = portugueseText[4];
		}
	}
	
	$scope.changeLanguage();
	
	var removeNonNumbers = function(theText) {
		
		var isItANumber = false;
		var lengthText  = theText.length;
		var lastChar    = theText.charAt(lengthText - 1);
		
		for (var i = 0; i < 10; i++){
			if (lastChar == i){
				isItANumber = true;
			}
		}
		
		if (!isItANumber){
			theText = theText.slice(0, -1);
		}
		
		return theText;
	}
	
    $scope.adjustPhoneInput = function() {
		
		$scope.fieldPhone.value = removeNonNumbers($scope.fieldPhone.value);
		
	}
	
	function successCallback(response) {
			alert("Working");
			$scope.people = response.data;
			console.log('mm', $scope.people);
	}
	
	var erro = function errorCallback(response) {
			alert(error);
	}
	
	$scope.showList = function() {	
		//changeLanguage();
		$http.get("http://localhost:5000/get_records") 	
		.then( function(response) { $scope.myData = response.data }, function(error) {alert(error.data); alert(error.status)});
	};
	
	$scope.insertRecord = function() {
		
	}
	
});

;
