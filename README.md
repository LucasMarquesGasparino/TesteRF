WebPage (MDL e AngularJS 1) em aplicação Flask com acesso ao MongoDB por pymongo

Requisitos: MongoDB e Python

Observações: durante o desenvolvimento, a aplicação flask foi hospedada em localhost, com porta 5000;
	o banco de dados também foi hospedado em localhost, na porta 27017; assim, a aplicação rodará sem problemas no servidor local padrão.

Informações:

		1 - o banco de dados teste_db encontra-se no diretório <../data/bd>
	    2 - a aplicação flask está em <../FlaskApp/app/__init__.py>
	    3 - o Flask está em <../FlaskApp/flask> e pode ser ativado em <../FlaskApp/flask/Scripts/activate>

Instruções: 

	1 - executar o servidor para MongoDB com mongod.exe (Diretório padrão: <C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe>) pelo
      cmd (modo administrador) com 	o comando: 
		 
        <diretorio>/mongod.exe --dbpath ../data/db

	2 - ativar o flask a partir da *Informação 3
	3 - executar a aplicação flask a partir do console do flask a partir da *Informação 2, com o comando:
  
		    python __init__.py
        
	4 - acessar o servidor local, pois é lá que está executada a página web
