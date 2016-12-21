//--------------------------------------------------------------------------------------
// Determinação e configuração do padrão de filtros e eventos disparados pelo AngularJS
angular.module('ui.filters', []);
angular.module('ui.directives', []);
angular.module('ui', [
    'ui.filters',
    'ui.directives']).value('ui.config', {});
	
//----------------------------
// Inicialização do AngularJS
angular.module('MyApp', ['ui.directives'])

// Controlador responsável pelo formulário do template do Flask
.controller('TopLevel', function ($scope, $http) {
	
	// Reserva de memória para os conteúdos dos campos
	$scope.info = {};
	
	// Obtenção das tuplas do banco de dados a partir de bivícuoa transmissão com a aplicação Flask
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
	
	
	//--------------------------------------------------------------
	// Eliminação do último caractere no caso de ele não ser número
	// ou estar além da quantidade de dígitos necessária
	//--------------------------------------------------------------
	//		theText : texto a ser executado
	var removeNonNumbersAndChangeMaxLength = function(theText) {
		
		var isItANumber = false;
		var lengthText  = theText.length;
		var lastChar    = theText.charAt(lengthText - 1);
		var thirdChar   = theText.charAt(2);
		var canDeleteLastNumber = false;
		
		// Analisa se o último caractere é um dos dez algarismos
		for (var i = 0; i < 10; i++){
			if (lastChar == i){
				isItANumber = true;
			}
		}
		
		
		// Quando o telefone já tem 10 números, analisa a possibilidade
		// do décimo-primeiro, que ocorre quando o terceiro dígito é 9
		if (lengthText == 11){
			if (thirdChar != '9'){
				canDeleteLastNumber = true;
			}
		}		
		
		// Remove o último caractere do texto
		if (!isItANumber || canDeleteLastNumber || lengthText == 12){
			theText = theText.slice(0, -1);
		}
		
		return theText;
	}
	
	//----------------------------------------------------------
	// Insere uma substring em lugar parametrizado duma string
	//----------------------------------------------------------
	//		string : texto alvo
	//	    substring : texto a ser inserido
	//		position: posição em que a substring é colocada
	var insertToString = function(string, substring, position){
		// Armazena a primeira parte da string
		var theText = string.slice(0, position);
		// Concatena a primeira parte da string com a substring
		theText     = theText + substring;
		// Concatena o todo com a última parte da string
		theText     = theText + string.slice(position);
		return theText;
	}
	
	//--------------------------------------------------------
	// Responsável pelo controle de entrada no campo telefone
    $scope.adjustPhoneInput = function() {

		// Regulariza o campo telefone
		$scope.info.telefone = removeNonNumbersAndChangeMaxLength($scope.info.telefone);
		
	}
	
	//-------------------------------------------------------------------
	// Responsável pela obtenção e exibição das tuplas do banco de dados
	$scope.showList = function() {	
		// Obtenção dos dados do BD a partir da aplicação Flask
		$http.get("http://localhost:5000/get_records") 	
		.then( function(response) { $scope.myData = response.data }, function(error) {alert(error.data); alert(error.status)});
	};
	
	//-------------------------------------------------------------------
	// Transmissão das informações da nova pessoa para a aplicação flask
	$scope.insertRecord = function() {
		// Formata o conteúdo do telefone
		var temporary = $scope.info.telefone;
		$scope.info.telefone = insertToString($scope.info.telefone, "-", $scope.info.telefone.length - 4);
		$scope.info.telefone = insertToString($scope.info.telefone, " ", 2);
		// Realiza o envio dos dados pelo protocolo http
		$http({
            url: 'http://localhost:5000/insert_records',
            method: "POST",
            data: JSON.stringify($scope.info),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (data) {
                alert("Inserido com sucesso"); 
            }, function (data, status) {
                alert(status);
            });
		// Remove as formatações do conteúdo do telefone
		$scope.info.telefone = temporary;
	}
	
});

;
