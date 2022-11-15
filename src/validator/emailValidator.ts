class EmailValidator {
    email: string;

    constructor(email: string) {
        this.email = email;
        const reg = /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
        const valid = reg.test(this.email);
        if (!valid) {
            throw new Error("E-mail inválido!");
        }
    }
}

export default EmailValidator;
