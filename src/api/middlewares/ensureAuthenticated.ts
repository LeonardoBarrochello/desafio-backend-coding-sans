import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../../config/auth";
import { prismaClient } from "../../database/prisma";
import { AppError } from "../../errors/AppError";


export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers["authorization"];
    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }
    var [, token] = authHeader.split("Bearer");
    token = token.replace(" ", "");
    try {
        const { sub: id } = verify(token, config.secret!);
        var user = await prismaClient.user.findFirst({
            where: {
                id: Number(id)
            }
        })
        if (!user) {
            throw new AppError("Invalid user", 401)
        }

    } catch (error) {
        throw new AppError("Invalid token", 401)
    }
    next()
}