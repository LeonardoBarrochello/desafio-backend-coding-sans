import { prismaClient } from "../database/prisma"
import { Request, Response } from "express";
import { IUserDTO } from "../dto/IUserDTO";
import { prisma } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { config } from "../config/auth";
import { AppError } from "../errors/AppError";

export class UserController {
    async create(request: Request, response: Response) {
        const { username, password }: IUserDTO = request.body;
        var userExists = await prismaClient.user.findFirst({
            where: {
                username
            }
        })
        if (userExists) {
            throw new AppError("username already in use")
        }
        await prismaClient.user.create({
            data: {
                username,
                password
            }
        })
        return response.status(201).send()
    }
    async login(request: Request, response: Response) {
        const { username, password }: IUserDTO = request.body;
        var user = await prismaClient.user.findFirst({
            where: {
                username
            }
        })
        if (!user) {
            throw new AppError("username or password is incorrect!")
        }
        if (password != user?.password) {
            throw new AppError("username or password is incorrect!")
        }

        var token = sign({
            username: user.username
        }, config.secret!, {
            subject: user.id.toString(),
            expiresIn: config.expires_in_token
        })

        return response.status(200).json({
            access_token: token,
        })
    }
}