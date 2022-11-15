class PasswordValidator {
    password: string;

    constructor(password: string) {
        this.password = password;

        if (this.password.length === 0 || this.password.length > 20) {
            throw new Error("Senha inválida!");
        }
    }
}

export default PasswordValidator;
