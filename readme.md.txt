WebPage (MDL e AngularJS 1) em aplica��o Flask com acesso ao MongoDB por pymongo



Requisitos: MongoDB e Python



Observa��es: durante o desenvolvimento, a aplica��o flask foi hospedada em localhost, com porta 5000;
  
	o banco de dados tamb�m foi hospedado em localhost, na porta 27017; assim, a aplica��o rodar� sem problemas no servidor local padr�o.



Informa��es:
       
	1 - o banco de dados teste_db encontra-se no diret�rio <../data/bd
>	    
        2 - a aplica��o flask est� em <../FlaskApp/app/__init__.py>

	3 - o Flask est� em ../FlaskApp/flask e pode ser ativado em ../FlaskApp/flask/Scripts/activate



Instru��es: 
	
	1 - executar o servidor para MongoDB com mongod.exe (Diret�rio padr�o: "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe") 
	pelo cmd (modo administrador) com o comando: 
	

	 
        <diretorio>/mongod.exe --dbpath ../data/db

	

	2 - ativar o flask a partir da *Informa��o 3
	
	3 - executar a aplica��o flask a partir do console do flask a partir da *Informa��o 2, com o comando:
  
	

	    	python __init__.py
   
    
 
	4 - acessar o servidor local, pois � l� que est� hospedada a p�gina web.