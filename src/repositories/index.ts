// Arquivo para acesso direto ao banco de dados
import { Postegres } from "./ORM/index";
import {
    Usuario,
    Equipe,
    tables,
    table,
    uuid,
    repoRes,
    options,
} from "../interfaces/repositoriesInterfaces.js";

// Futura implementação
abstract class Crud<T> {
    private table: string;
    protected orm = new Postegres();
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
            if (res.err) throw res.err;
            return { err: null, data: res.data };
        } catch (err) {
            return { err: err as Error, data: null };
        }
    }

    /** Register user. Information of user required */
    public async post(infos: T): Promise<repoRes<table>> {
        try {
            if (!infos) throw new Error("infos necessárias");
            const res = await this.orm.insert(this.table, infos);
            if (res.err) throw res.err;
            return { err: null, data: null };
        } catch (err) {
            return { err: err as Error, data: null };
        }
    }

    /** Update a user information */
    public async update(infos: T, id: uuid): Promise<repoRes<table>> {
        try {
            if (!infos) throw new Error("Necessária informações de usuário");
            const options: options = {
                filter_and: { id: id },
            };
            const res = await this.orm.update(this.table, infos, options);
            if (res.err) throw res.err;
            return { err: null, data: res.data };
        } catch (err) {
            return { err: err as Error, data: null };
        }
    }

    /** delete a user by id */
    public async del(userId: uuid): Promise<repoRes<table>> {
        try {
            if (!userId) throw new Error("Id necessário");
            const options: options = {
                filter_and: { id: userId },
            };
            const res = await this.orm.delete(this.table, options);
            if (res.err) throw res.err;
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

const equipe1: Equipe = {
    leader: "1a",
    name: "test",
    id: "1",
};

//Classe para construir os acessos ao banco
export class Database {
    private orm = new Postegres();
    constructor() {}

    public user = new (class extends Crud<Usuario> {
        constructor() {
            super("usuario");
        }
    })();

    public team = new (class extends Crud<Equipe> {
        constructor() {
            super("equipe");
        }
        public async postMember(
            teamId: uuid,
            userId: uuid
        ): Promise<repoRes<table>> {
            try {
                if (!teamId || !userId)
                    throw new Error("Id do team e do usuário necessário");

                const options: options = {
                    filter_and: { id: userId },
                };
                const infos: object = {
                    squad: teamId,
                };
                const res = await this.orm.update("usuario", infos, options);
                return { err: null, data: res.data };
            } catch (err) {
                return { err: err as Error, data: null };
            }
        }

        public async removeMember(userId: uuid): Promise<repoRes<table>> {
            try {
                if (!userId) throw new Error("Id do usuário necessário");

                const options: options = {
                    filter_and: { id: userId },
                };
                const infos: object = {
                    squad: null,
                };
                const res = await this.orm.update("usuario", infos, options);
                return { err: null, data: res.data };
            } catch (err) {
                return { err: err as Error, data: null };
            }
        }
    })();
}

const db = new Database();
// db.postTeam(equipe1);
// db.postUser(user1);
// db.postUser(user2);
// db.getUsers().then(res => console.log(res));
// db.getTeams().then(res => console.log(res));
// db.deleteTeam('1');
// db.deleteUser('1a').then(res => console.log(res));
// db.user.update({
//     username: "User 2",
//     email: "testinho2@gmail.com",
//     first_name: "Fulano2",
//     last_name: "cicrano2",
//     password: "criptografado2",
//     squad: null,
//     is_adm: true,
// }, '2a').then(res => console.log(res));

db.team.getAll().then((res) => console.log(res));
