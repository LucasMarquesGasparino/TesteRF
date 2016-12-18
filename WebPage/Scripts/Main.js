angular.module('ui.filters', []);
angular.module('ui.directives', []);
angular.module('ui', [
    'ui.filters',
    'ui.directives']).value('ui.config', {});

angular.module('MyApp', ['ui.directives'])

.controller('TopLevel', function ($scope) {
    //$scope.field1 = {label: 'Field 1', value: 'My Spoon is Too Big'};
    //$scope.field2 = {label: 'Field 2', value: 'I am a banana!'};
    //$scope.field3 = {label: 'Field 3', value: 'queen.of@france.com'};
	
	
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
	
	
    $scope.adjustPhoneInput = function() {
		
		if ($scope.fieldPhone.value.length == 2){
			if (!($scope.fieldPhone.value.charAt(0) == '(')){
				$scope.fieldPhone.value = "(" + $scope.fieldPhone.value + ")";
			}
		}
		
		var isItANumber = false;
		var lastChar   = $scope.fieldPhone.value.charAt(lengthText - 1);
		for (var i = 0; i < 10; i++){
			if (lastChar == i){
				isItANumber = true;
			}
		}
		
		if (!isItANumber){
			$scope.fieldPhone.value = $scope.fieldPhone.value.slice(0, -1);
		}
		

		
	}
	
    $scope.doValidate = function (myForm) {
        var formValid = myForm.$valid;
        if (!formValid) {
            angular.forEach(myForm, function (value) {
                if (value && value.hasOwnProperty('$modelValue') && !value.$valid) {
                    console.log(value);
                    console.log($scope[value.$name]);
                    alert('Field "' + $scope[value.$name].label + '" is invalid.');
                }
            });
        }
        return formValid;
    };
});

;