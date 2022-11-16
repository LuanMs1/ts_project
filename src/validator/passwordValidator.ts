class PasswordValidator {
    password: string;

    constructor(password: string) {
        this.password = password;

        if (this.password === undefined) {
            throw { message: "Forneça uma senha!" };
        }

        if (this.password.length === 0) {
            throw { message: "Senha inválida!" };
        }

        if (this.password.length > 20) {
            throw { message: "A senha deve ter no máximo 20 caracteres!" };
        }
    }
}

export default PasswordValidator;
