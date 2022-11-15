class StringValidator {
    name: string;

    constructor(name: string) {
        this.name = name;
        const reg = /^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim;
        const valid = reg.test(this.name);
        if (!valid) {
            throw new Error("Nome inválido!");
        }
    }
}

export default StringValidator;
