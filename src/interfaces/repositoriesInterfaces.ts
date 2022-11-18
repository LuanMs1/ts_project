type tables = Usuario | Equipe;
type table = Array<tables>;
type uuid = string;

interface Usuario {
    id?: string;
    username?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    squad?: string | null;
    is_adm?: boolean;
}

interface Equipe {
    id?: string;
    name?: string;
    leader?: string;
}

interface repoRes<T> {
    err: Error | null;
    data: any;
}
interface options {
    filter_and: object;
}

export { Usuario, Equipe, tables, table, uuid, repoRes, options };
