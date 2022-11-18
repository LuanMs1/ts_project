import { Database } from "../repositories/index.js";

export default async function deleteMemberService(memberId: string) {
    try {
        const db = new Database();
        const data = await db.team.removeMember(memberId);
        if (data.err !== null) {
            throw data.err;
        }
        return data.data;
    } catch (error: any) {
        throw {
            message: error.message,
        };
    }
}
