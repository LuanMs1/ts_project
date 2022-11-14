// Arquivo para acesso direto ao banco de dados
import { Postegres } from "./ORM/index";

const orm = new Postegres;

//Classe para construir os acessos ao banco
export class Database {
    private orm = new Postegres;
    constructor(){}

    // metodo para obter usuário do banco de dados a partir de email
    get_user(email: string){

        try{
            // seleciona senha de usuáro a partir de email
            const res = orm.select("usuario", [], {'email': email});
            if (res.err) throw res.err;

            return {error: null, data: res.data};
        }catch(err){
            return {error: err, data: null};
        }
    }

}