# FUNÇÕES DE ACESSO BANCO DE DADOS

Classe Database
### Extrutura de retorno

    return {err: erro/null, data: res/null}

### USUÁRIO
Métodos:

Database.getUsers();
    - Ver todos usuários.

Database.getMyUser( _idUsuario );
    - Pega usuário logado

Database.getUserById( _idUsuario );
    - Pegar qualquer usuário

Database.postUser( _inputs );
    -Cadastra usuário
    -_inputs:
        {
            "uuid" REQUIRED
            "username" REQUIRED,
	        "email" REQUIRED,
	        "first_name" REQUIRED,
	        "last_name" REQUIRED,
	        "password" REQUIRED,
	        "squad",
	        "is_adm" REQUIRED,
        }
    - retorna erro ou null;

Database.updateUser( _idUsuario, _inputs);
    -Atualiza usuário
    -_inputs:
        {
            "username" ,
	        "email" ,
	        "first_name" ,
	        "last_name" ,
	        "password" ,
	        "squad",
	        "is_adm" ,
        }
    -retorna erro ou dados alterados;

Database.deleteUser( _idUsuario );
    - Deleta usuário
    - retorna erro ou null;

### EQUIPE

