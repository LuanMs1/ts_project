import { Database } from "../repositories/index.js";

export default async function deleteMemberService(memberId: string) {
    try {
        // const db = new Database();
        // const data = await db.deleteMember(memberId);
        // if (data.err !== null) {
        //     throw data.err;
        // }
        // return;
    } catch (error: any) {
        throw {
            message: error.message,
        };
    }
}