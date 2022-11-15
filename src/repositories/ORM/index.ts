// Arquivo para funções gerais de acesso ao PostegreSQL
import { Pool, PoolConfig } from "pg";
// import * as dotenv from 'dotenv';
// dotenv.config()
const poolConfig : PoolConfig = {
    host: "localhost",
    port: 5432,
    database: "db_typescript",
    user: "postgres",
    password: "080596",
};

interface options{
    filter_and: Array<string>,
}
export class Postegres{
    private pool : Pool;
    constructor(){
        this.pool = new Pool(poolConfig);
    }

    // métodos para conecção com banco de dados
    public async select(table : string, columns: Array<string> = ['*'], options: options | undefined ){
        // {
        //     filter_and: []
        // }
        try{
            const values = [];
            const columnSize = columns.length;
            let dolarColumns : any | string = []; // [$1, $2]
            for (let i = 0; i < columnSize; i++){
                dolarColumns.push(`$${i + 1} `);
            }
            dolarColumns = dolarColumns.toString();
            // dolarColumns = $1, $2
            values.push(... columns);
            //values ['username', 'email']
            // values.push(table);
            const queryText = `
                SELECT ${dolarColumns}
                FROM ${table}
            `
            const qr = {
                text: queryText,
                values: values
            }
            console.log(queryText);
            console.log(values);


            const dbRes = await this.pool.query(qr);
            return {err: null, data: dbRes};
        }catch(err){
            return err;
        }
        // return {err: null, data: response}; // objeto com erro ou resposta
    };

    public insert(){
        return;
    };

    public delete(){
        return;
    };

    public update(){
        return;
    };

}

const orm = new Postegres;
orm.select('usuario', ["username", "email"]).then(res => console.log(res));