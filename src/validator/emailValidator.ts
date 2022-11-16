class EmailValidator {
    email: string;

    constructor(email: string) {
        this.email = email;
        const reg: RegExp = /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
        const valid: boolean = reg.test(this.email);
        if (!valid) {
            throw {
                status: 400,
                message: "E-mail inválido!",
            };
        }
    }
}

export default EmailValidator;
