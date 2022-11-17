// Arquivo para acesso direto ao banco de dados
import { Postegres } from "./ORM/index";
import {
    Usuario,
    Equipe,
    tables,
    table,
    uuid,
    repoRes,
} from "../interfaces/repositoriesInterfaces.js";

// Futura implementação
abstract class Access<T> {
    private table: string;
    private orm = new Postegres();
    constructor(_table: string) {
        this.table = _table;
    }
    public async getAll(): Promise<repoRes<table>> {
        try {
            // seleciona senha de usuáro a partir de email
            const res = await this.orm.select(this.table, ["*"]);
            if (res.err) throw res.err;
            return { err: null, data: res.data };
        } catch (err) {
            return { err: err as Error, data: null };
        }
    }

    /** Get any user by id. Especific to logged user */
    public async getById(id: uuid): Promise<repoRes<table>> {
        try {
            if (!id) throw new Error("Id necessário");
            const res = await this.orm.select(this.table, ["*"], {
                filter_and: { id: id },
            });
            return { err: null, data: res.data };
        } catch (err) {
            return { err: err as Error, data: null };
        }
    }

    /** Register user. Information of user required */
    public async post(infos: T): Promise<repoRes<table>> {
        try {
            return { err: null, data: null };
        } catch (err) {
            return { err: err as Error, data: null };
        }
    }

    /** Update a user information */
    public async update(infos: T): Promise<repoRes<T>> {
        try {
            if (!infos) throw new Error("Necessária informações de usuário");
            return { err: null, data: infos };
        } catch (err) {
            return { err: err as Error, data: null };
        }
    }

    /** delete a user by id */
    public async del(userId: uuid): Promise<repoRes<table>> {
        try {
            if (!userId) throw new Error("Id necessário");
            return { err: null, data: null };
        } catch (err) {
            return { err: err as Error, data: null };
        }
    }
}
// user examples:
const user1: Usuario = {
    id: "1a",
    username: "User 1",
    email: "teste1@gmail.com",
    first_name: "Fulano1",
    last_name: "cicrano1",
    password: "criptografado",
    squad: null,
    is_adm: false,
};

const user2: Usuario = {
    id: "2a",
    username: "User 2",
    email: "teste2@gmail.com",
    first_name: "Fulano2",
    last_name: "cicrano2",
    password: "criptografado",
    squad: null,
    is_adm: true,
};

//Classe para construir os acessos ao banco
export class Database {
    private orm = new Postegres();
    constructor() {}

    public async getUsers(): Promise<repoRes<table>> {
        try {
            // seleciona senha de usuáro a partir de email
            const res = await this.orm.select("usuario", ["*"]);
            if (res.err) throw res.err;
            return { err: null, data: res.data };
        } catch (err) {
            return { err: err as Error, data: null };
        }
    }

    /** Get any user by id. Especific to logged user */
    public async getMyUser(id: uuid): Promise<repoRes<table>> {
        try {
            if (!id) throw new Error("Id necessário");
            const res = await this.orm.select("usuario", ["*"], {
                filter_and: { id: id },
            });
            return { err: null, data: res.data };
        } catch (err) {
            return { err: err as Error, data: null };
        }
    }
    public async getUserById(id: uuid): Promise<repoRes<table>> {
        try {
            if (!id) throw new Error("Id necessário");
            const res = await this.orm.select("usuario", ["*"], {
                filter_and: { id: id },
            });
            return { err: null, data: res.data };
        } catch (err) {
            return { err: err as Error, data: null };
        }
    }

    public async getUserByEmail(email: string): Promise<repoRes<table>> {
        try {
            if (!email) throw new Error("email necessário");
            const res = await this.orm.select("usuario", ["*"], {
                filter_and: { email: email },
            });
            if (res.err) throw res.err;
            return { err: null, data: res.data };
        } catch (err) {
            return { err: err as Error, data: null };
        }
    }

    /** Register user. Information of user required */
    public async postUser(infos: Usuario): Promise<repoRes<table>> {
        try {
            if (!infos) throw new Error("informações necessárias");
            const res = await this.orm.insert("usuario", infos);
            if (res.err) throw res.err;
            return { err: null, data: res.data };
        } catch (err) {
            return { err: err as Error, data: null };
        }
    }

    /** Update a user information */
    public async updateUser(infos: Usuario): Promise<repoRes<Usuario>> {
        try {
            if (!infos) throw new Error("Necessária informações de usuário");
            return { err: null, data: infos };
        } catch (err) {
            return { err: err as Error, data: null };
        }
    }

    /** delete a user by id */
    public async deleteUser(userId: uuid): Promise<repoRes<table>> {
        try {
            if (!userId) throw new Error("Id necessário");
            return { err: null, data: null };
        } catch (err) {
            return { err: err as Error, data: null };
        }
    }
}
