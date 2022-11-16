// Arquivo para acesso direto ao banco de dados
import { Postegres } from "./ORM/index"
import {
    Usuario,
    Equipe,
    tables,
    table,
    uuid,
    repoRes,
} from "../interfaces/repositoriesInterfaces.js";

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
    squad: "squadId",
    is_adm: true,
};

//Classe para construir os acessos ao banco
export class Database {
    private orm = new Postegres();
    private tables = ["usuario", "equipe"];
    constructor() {}

    /** Get all users in the database */
    public async getUsers(): Promise<repoRes<table>> {
        try {
            // seleciona senha de usuáro a partir de email
            const res  = await this.orm.select("usuario", ['*']);
            if (res.err) throw res.err;
            return { err: null, data: res.data};
        }catch(err){
            return {err: err as Error, data: null};
        }
    }

    /** Get any user by id. Especific to logged user */
    public async getMyUsers( userId : uuid ): Promise<repoRes<table>>{

        try{
            if (!userId) throw new Error('Id necessário');
            const res = await this.orm.select("usuario", ['*'], {filter_and: {'id' : userId}})
            return { err: null, data: res.data };
        }catch(err){
            return {err: err as Error, data: null};
        }
    }

    /** Get any user by id. */
    public async getUserById( userId : uuid ): Promise<repoRes<table>>{

        try{
            if (!userId) throw new Error('Id necessário');
            const res = await this.orm.select("usuario", ['*'], {filter_and: {'id' : userId}})
            return { err: null, data: res.data };
        }catch(err){
            return {err: err as Error, data: null};
        }
    }

    /** Register user. Information of user required */
    public async postUser(infos: Usuario): Promise<repoRes<table>> {
        try {
            return { err: null, data: null };
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