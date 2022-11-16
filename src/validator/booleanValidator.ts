export default class BooleanValidator {
    constructor(data: boolean) {
        if (data === undefined) {
            throw {
                status: 400,
                message: `is_admin é necessário!`,
            };
        }

        if (typeof data !== "boolean") {
            throw {
                status: 400,
                message: "is_admin aceita apenas true ou false!",
            };
        }
    }
}
