import { prismaClient } from "../src/application/database";
import bycrpt from "bcrypt"

export class UserTest {
    
    static async delete() {
        await prismaClient.user.deleteMany({
            where: {
                username: "test"
            }
        })
    }

    static async create() {
        await prismaClient.user.create({
            data: {
                username: "test",
                name: "test",
                password: await bycrpt.hash("test", 10),
                token: "test"
            }   
        })
    }
}