// Arquivo para funções gerais de acesso ao PostegreSQL
import { Pool } from "pg";
const poolConfig = {};
export class Postegres{
    private pool : Pool;
    constructor(){
        this.pool = new Pool(poolConfig);
    }

    // métodos para conecção com banco de dados
    select(table : string, columns: Array<string> = [], options: object = {} ){
        const response = {'nome': 'fulano', 'password': '1245', 'email': 'ful@g.com'} // expemplo de resposta da query
        return {err: null, data: response}; // objeto com erro ou resposta
    };

}