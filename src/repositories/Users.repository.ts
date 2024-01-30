import { User } from "@prisma/client";
import prisma from "../config/prisma";
import * as jwt from "jsonwebtoken";

export interface UsersRepositoryPort {
    create(user: UserRepositoryCreateDTO): Promise<User>;
    update(user: User): Promise<User>;
    getById(id: string): Promise<User>;
    getByEmail(userEmail: string): Promise<User>;
    logout(id: string): Promise<User>;
    delete(id: string): Promise<User>;
}

export interface UserRepositoryCreateDTO {
    id: string;
    name: string;
    email: string;
    password: string;
}

export default class UsersRepository implements UsersRepositoryPort {
    async create({ id, name, email, password }: UserRepositoryCreateDTO): Promise<User> {
        try {
            return await prisma.user.create({
                data: {
                    id,
                    name,
                    email,
                    password,
                    jwt_token: jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" }),
                    created_at: new Date(),
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async update({ id, name, email, password }): Promise<User> {
        try {
            return await prisma.user.update({
                where: {
                    id,
                },
                data: {
                    id,
                    name,
                    email,
                    password,
                    updated_at: new Date(),
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id: string): Promise<User> {
        try {
            return await prisma.user.findUnique({
                where: {
                    id,
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getByEmail(email: string): Promise<User> {
        try {
            return await prisma.user.findUnique({
                where: {
                    email,
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(id: string): Promise<User> {
        try {
            return await prisma.user.delete({
                where: {
                    id,
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async logout(id: string): Promise<User> {
        try {
            return await prisma.user.update({
                where: {
                    id,
                },
                data: {
                    jwt_token: null,
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}
