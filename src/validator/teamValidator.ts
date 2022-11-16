class TeamValidator {
    name: string;

    constructor(name: string, tipo: string) {
        this.name = name;

        if (this.name === undefined) {
            throw {
                status: 400,
                message: `Insira o ${tipo}!`,
            };
        }

        const reg: RegExp = /^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim;
        const valid: boolean = reg.test(this.name);
        if (!valid) {
            throw {
                status: 400,
                message: `${tipo} inválido!`,
            };
        }
    }
}

export default TeamValidator;
