import { Contact, User } from "@prisma/client";
import { ContactResponse, CreateContactRequest, toContactResponse, UpdateContactRequest } from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class ContactService {
    static async create (user: User, req: CreateContactRequest) : Promise <ContactResponse> {
        const createRequest = Validation.validate(ContactValidation.CREATE, req)

        const record = {
            ...createRequest,
            ...{username:  user.name}
        }

        const contact = await prismaClient.contact.create({
            data: record
        })

        return toContactResponse(contact)
    }

    static async checkContactMustExists(username: string, contatId: number) : Promise <Contact> {
        const contact = await prismaClient.contact.findUnique({
            where: {
                id: contatId,
                username: username
            }
        })

        if(!contact) {
            throw new ResponseError(404, "Contact is not found")
        }

        return contact;
    }

    static async get (user: User, id: number) : Promise <ContactResponse> {
        const contact = await this.checkContactMustExists(user.username, id)
        return toContactResponse(contact)
    }

    static async update(user: User, req: UpdateContactRequest) : Promise <ContactResponse> {
        const updateRequest = Validation.validate(ContactValidation.UPDATE, req)
        await this.checkContactMustExists(user.username, updateRequest.id)          

        const contact = await prismaClient.contact.update({
            where:{
                id: updateRequest.id,
                username: user.username
            },
            data: updateRequest
        })

        return toContactResponse(contact)

    }
}