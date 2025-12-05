import { NextFunction, request } from "express";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, LoginUserRequest, toUserResponse, UpdateUserRequest, UserResponse } from "../model/user-model";
import { UserRequest } from "../type/user-request";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bycrpt from "bcrypt"
import {v4 as uuid} from "uuid"
import { User } from "@prisma/client";

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

    static async login(request: LoginUserRequest) : Promise <UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);
        
        let user = await prismaClient.user.findUnique({
            where: {
                username: loginRequest.username
            }
        })

        if (!user) {
            throw new ResponseError(401, "Username or Password is wrong")
        }

        const isPasswordValid = await bycrpt.compare(loginRequest.password, user.password)
        if (!isPasswordValid) {
            throw new ResponseError(401, "Username or Password is wrong")
        }

        user = await prismaClient.user.update({
            where: {
                username: loginRequest.username
            },
            data: {
                token: uuid()
            }
        })

        const response = toUserResponse(user);
        response.token = user.token!
        return response
    }

    static async get(user: User) : Promise <UserResponse> {
        return toUserResponse(user)
    }

    static async update(user: User, req: UpdateUserRequest) : Promise <UserResponse> {
        const updateRequest = Validation.validate(UserValidation.UPDATE, req)

        if(updateRequest.name) {
            user.name = updateRequest.name
        }

        if(updateRequest.password) {
            user.password = await bycrpt.hash(updateRequest.password, 10)
        }

        const result = await prismaClient.user.update({
            where: {
                username: user.username
            },
            data: user
        })

        return toUserResponse(result)
    }
    
    static async logout(user: User) : Promise <UserResponse> {
        const result = await prismaClient.user.update({
            where: {
                username: user.name
            },
            data: {
                token: null
            }
        })

        return toUserResponse(result)
    }
}