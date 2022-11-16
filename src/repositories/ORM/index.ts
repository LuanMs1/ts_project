// Arquivo para funções gerais de acesso ao PostegreSQL
import { Pool, PoolConfig } from "pg";
import  {repoRes, Usuario}  from "../../interfaces/repositoriesInterfaces";

// import * as dotenv from 'dotenv';
// dotenv.config()
const poolConfig: PoolConfig = {
    host: "localhost",
    port: 5432,
    database: "db_typescript",
    user: "postgres",
    password: "080596",
};
interface options<T>{
    filter_and: T,
}
export class Postegres {
    private pool: Pool;
    constructor() {
        this.pool = new Pool(poolConfig);
    }

    // métodos para conecção com banco de dados
    public async select(
        table: string,
        columns: Array<string> = ["*"],
        options?: options<Usuario>
    ): Promise<repoRes<any[]>> {
        // options = {
        //     filter_and: {"nome": "fulano", "email": "test@gm.com"},
        // }
        try {
            const values: Array<string> = [];
            let dolarOptions : Array<string> | string = [];
            if (options) {
                let countValues = values.length + 1;
                const filter : any = options.filter_and;
                for (let key in filter){
                    dolarOptions.push(`${key} = $${countValues}`);
                    // ["key = $4"]
                    values.push(filter[key]);
                    countValues += 1;
                }
                //{"nome": "fulano", "email": "test@gm.com"}
                // $1 = $3 AND $2 = $4
                // ["nome", "email", "fulano", "test@gm.com"]
                // ["$1 = $2", "$3 = $4"].join(' AND ');
                dolarOptions = dolarOptions.join(" AND ");
                dolarOptions = `WHERE ${dolarOptions}`;
            }else {
                dolarOptions = "";
            }
            const queryText = `
                SELECT ${columns.toString()}
                FROM ${table}
                ${dolarOptions}
            `;
            const qr = {
                text: queryText,
                values: values
            }

            const dbRes = await this.pool.query(qr);
            return { err: null, data: dbRes.rows };
        } catch (err) {
            return { err: err as Error, data: null };
        }
    }

    public insert() {
        return;
    }

    public delete() {
        return;
    }

    public update() {
        return;
    }
}