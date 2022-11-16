// Arquivo para funções gerais de acesso ao PostegreSQL
import { Pool, PoolConfig } from "pg";
import { repoRes } from "../../interfaces/repositoriesInterfaces.js";
// import * as dotenv from 'dotenv';
// dotenv.config()
const poolConfig: PoolConfig = {
    host: "localhost",
    port: 5432,
    database: "db_typescript",
    user: "postgres",
    password: "080596",
};
interface usuario {
    nome?: string;
    password?: string | null;
}
interface options<T> {
    filter_and: T;
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
        options?: options<usuario>
    ): Promise<repoRes<any[]>> {
        // options = {
        //     filter_and: {"nome": "fulano", "email": "test@gm.com"},
        // }
        try {
            const values: Array<string> = [];
            const columnSize = columns.length;
            let dolarColumns: any | string = []; // [$1, $2]
            for (let i = 0; i < columnSize; i++) {
                dolarColumns.push(`$${i + 1} `);
            }
            dolarColumns = dolarColumns.toString();
            values.push(...columns);
            let dolarOptions: Array<string> | string = [];

            if (options) {
                let countValues = values.length + 1;
                const filter: any = options.filter_and;
                const optionsKeys = Object.keys(filter);
                const optionsValues = Object.values(filter);
                for (let key in filter) {
                    dolarOptions.push(`$${countValues} = $${countValues + 1}`);
                    // ["$3 = $4"]
                    values.push(key);
                    values.push(...filter[key]);
                    countValues += 2;
                }
                //{"nome": "fulano", "email": "test@gm.com"}
                // $1 = $3 AND $2 = $4
                // ["nome", "email", "fulano", "test@gm.com"]
                // ["$1 = $2", "$3 = $4"].join(' AND ');
            }
            dolarOptions = dolarOptions.join(" AND ");
            console.log(dolarOptions);
            console.log(values);
            const queryText = `
                SELECT ${dolarColumns}
                FROM ${table}
                WHERE ${dolarOptions}
            `;
            const qr = {
                text: queryText,
                values: values,
            };
            console.log(queryText);
            console.log(values);

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
// const orm = new Postegres;
// orm.select('usuario', ["username", "email"], {filter_and: {nome: "test", password: "1234"}}).then(res => console.log(res));
