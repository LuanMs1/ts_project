// Arquivo para funções gerais de acesso ao PostegreSQL
import { Pool, PoolConfig } from "pg";
import { repoRes, Usuario } from "../../interfaces/repositoriesInterfaces";
import { options } from "../../interfaces/repositoriesInterfaces";

import * as dotenv from "dotenv";
dotenv.config();
const poolConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};
export class Postegres {
    private pool: Pool;
    constructor() {
        this.pool = new Pool(poolConfig as PoolConfig);
    }

    // métodos para conecção com banco de dados
    public async select(
        table: string,
        columns: Array<string> = ["*"],
        options?: options
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

    public async delete(
        table: string,
        options: options
    ): Promise<repoRes<any[]>> {
        try {
            if (!options) {
                throw new Error("deu ruim, mande um options");
            }
            const keys = Object.keys(options.filter_and);
            const values = Object.values(options.filter_and);
            let dolarValues: String[] = [];
            let dolarOptions: string = "";
            for (let i in values) {
                dolarValues.push(`${keys[i]} = $${parseInt(i) + 1}`);
            }

            if (values.length > 1) {
                dolarOptions = dolarValues.join(" AND ");
            } else {
                dolarOptions = dolarValues.toString();
            }

            // coluna = $1 AND coluna2 = $2
            const queryText = `
                DELETE FROM ${table}
                WHERE (
                    ${dolarOptions}
                )
            `;
            console.log(queryText);
            console.log(values);
            const dbRes = await this.pool.query(queryText, values);
            return { err: null, data: null };
        } catch (error) {
            return { err: null, data: null };
        }
    }

    public async update(
        table: string,
        infos: object,
        options?: options
    ): Promise<repoRes<any[]>> {
        try {
            if (!options) {
                throw new Error("deu ruim, mande um options");
            }
            const columns = Object.keys(infos);
            const columnValue = Object.values(infos);
            const optionsKeys = Object.keys(options.filter_and);
            const optionsValues = Object.values(options.filter_and);
            const dolarValues: string[] = [];
            let dolarOptions: string | string[] = [];
            for (let i in columns) {
                dolarValues.push(`${columns[i]} = $${parseInt(i) + 1}`);
            }
            const length = dolarValues.length;
            for (let i in optionsKeys) {
                dolarOptions.push(
                    `${optionsKeys[i]} = $${parseInt(i) + length + 1}`
                );
            }
            const values = columnValue.concat(optionsValues);

            if (optionsKeys.length > 1) {
                dolarOptions = dolarOptions.join(" AND ");
            } else {
                dolarOptions = dolarOptions.toString();
            }

            const queryText = `
                    UPDATE ${table}
                    SET ${dolarValues.join(", ")}
                    WHERE ${dolarOptions}
                    RETURNING *
            `;

            const dbRes = await this.pool.query(queryText, values);

            console.log(dbRes);
            return { err: null, data: dbRes.rows[0] };
        } catch (err) {
            return { err: err as Error, data: null };
        }
    }
}
