class TeamValidator {
    name: string;
    
    constructor(name: string, tipo: string) {
        this.name = name;

        if (this.name === undefined) {
            throw { message: `Insira o ${tipo}!` };
        }

        const reg: RegExp = /^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim;
        const valid: boolean = reg.test(this.name);
        if (!valid) {
            throw { message: `${tipo} inválido!` };
        }
    }
}

export default TeamValidator;
