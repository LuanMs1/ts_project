export default interface registerUser {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    squad?: string;
    is_admin: boolean;
}
