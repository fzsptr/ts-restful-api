import supertest from "supertest"
import { ContactTest, UserTest } from "./test-util"
import { email } from "zod"
import { web } from "../src/application/web"
import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database"

// describe('POST /api/contacts', () => { 

//     beforeEach(async () => {
//         await UserTest.create()
//     })

//     afterEach(async () => {
//         await ContactTest.deleteAll()
//         await UserTest.delete()
//     })

//     it('should be contact create', async() => {
//         const response = await supertest(web)
        
//             .post("/api/contacts")
//             .set("X-API-TOKEN", "test")
//             .send({
//                 first_name: "fauzi",
//                 last_name: "saputra",
//                 email: "fauzi@mail.com",
//                 phone: "08913141324"
//             })
        
//         logger.debug(response.body)
//         expect(response.status).toBe(200)
//         expect(response.body.data.id).toBeDefined()
//         expect(response.body.data.first_name).toBe("fauzi")
//         expect(response.body.data.last_name).toBe("saputra")
//         expect(response.body.data.email).toBe("fauzi@mail.com")
//         expect(response.body.data.phone).toBe("08913141324")
//     })

//     it('should be reject contact create if data invalid', async() => {
//         const response = await supertest(web)
        
//             .post("/api/contacts")
//             .set("X-API-TOKEN", "test")
//             .send({
//                 first_name: "",
//                 last_name: "",
//                 email: "fauzi",
//                 phone: "090878203819048904189082390"
//             })
        
//         logger.debug(response.body)
//         expect(response.status).toBe(400)
//         expect(response.body.errors).toBeDefined()
//     })
    
//     it('should be reject contact create if token invalid', async() => {
//         const response = await supertest(web)
        
//             .post("/api/contacts")
//             .set("X-API-TOKEN", "salah")
//             .send({
//                 first_name: "fauzi",
//                 last_name: "saputra",
//                 email: "fauzi@mail.com",
//                 phone: "08913141324"
//             })
        
//         logger.debug(response.body)
//         expect(response.status).toBe(401)
//         expect(response.body.errors).toBeDefined()
//     })
// })

describe('GET /api/contacts/:contactId', () => { 
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })
    
    it('should be able get contact', async() => {
        const contact = await ContactTest.get()
        const response = await supertest(web)

            .get(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.first_name).toBe(contact.first_name)
        expect(response.body.data.last_name).toBe(contact.last_name)
        expect(response.body.data.email).toBe(contact.email)
        expect(response.body.data.phone).toBe(contact.phone)
    })

    it('should reject get contact if contact is not found', async() => {
        const contact = await ContactTest.get()
        const response = await supertest(web)

            .get(`/api/contacts/${contact.id + 1}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
 })