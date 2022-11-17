// Arquivo para funções gerais de acesso ao PostegreSQL
import { Pool, PoolConfig } from "pg";
import { repoRes, Usuario } from "../../interfaces/repositoriesInterfaces";

// import * as dotenv from 'dotenv';
// dotenv.config()
const poolConfig: PoolConfig = {
    host: "localhost",
    port: 5432,
    database: "db_typescript",
    user: "postgres",
    password: "123",
};
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
        options?: options<Usuario>
    ): Promise<repoRes<any[]>> {
        // options = {
        //     filter_and: {"nome": "fulano", "email": "test@gm.com"},
        // }
        try {
            const values: Array<string> = [];
            let dolarOptions: Array<string> | string = [];
            if (options) {
                let countValues = values.length + 1;
                const filter: any = options.filter_and;
                for (let key in filter) {
                    dolarOptions.push(`${key} = $${countValues}`);
                    // ["key = $4"]
                    values.push(filter[key]);
                    countValues += 1;
                }
                dolarOptions = dolarOptions.join(" AND ");
                dolarOptions = `WHERE ${dolarOptions}`;
            } else {
                dolarOptions = "";
            }
            const queryText = `
                SELECT ${columns.toString()}
                FROM ${table}
                ${dolarOptions}
            `;
            const qr = {
                text: queryText,
                values: values,
            };

            const dbRes = await this.pool.query(qr);
            return { err: null, data: dbRes.rows };
        } catch (err) {
            return { err: err as Error, data: null };
        }
    }

    public async insert(table: string, infos: object): Promise<repoRes<any[]>> {
        try {
            const columns = Object.keys(infos);
            const values = Object.values(infos);
            let dolarValues: string | string[] = []; // Variavel para string $1, $2
            for (let i in values) {
                dolarValues.push(`$${parseInt(i) + 1}`);
            }
            dolarValues = dolarValues.toString();

            const queryText = `
                    INSERT INTO ${table}(${columns.toString()})
                    VALUES (${dolarValues})
                    RETURNING *
            `;
            const dbRes = await this.pool.query(queryText, values);
            return { err: null, data: dbRes.rows };
        } catch (err) {
            return { err: err as Error, data: null };
        }
    }

    public delete() {
        return;
    }

    public update() {
        return;
    }
}
