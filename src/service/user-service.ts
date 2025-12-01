import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, toUserResponse, UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bycrpt from "bcrypt"

export class UserService {
    static async register(request: CreateUserRequest) : Promise<UserResponse> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request)
    
        const totalRegisterWithSameUsername = await prismaClient.user.count({
            where: {
                username: registerRequest.username
            }
        })

        if(totalRegisterWithSameUsername != 0) {
            throw new ResponseError(400, "Username already exits")
        }

        registerRequest.password = await bycrpt.hash(registerRequest.password, 10)


        const user = await prismaClient.user.create({
            data: registerRequest
        })

        return toUserResponse(user)
    }   
}