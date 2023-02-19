import { User } from "@prisma/client";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";

import prisma from "../../config/prisma";
import UserEntity from "../../entities/UserEntity";
import {
    IUserLoginUseCaseParams,
    IUserRegisterUseCaseParams,
    IUsersRepository,
    IUserUpdateByIdUseCaseParams,
    UserRepositoryResponse,
} from "../../ports/IUsersRepository";
import Bcrypt from "../../utils/Bcrypt";

export default class PostgresUsersRepository implements IUsersRepository {
    protected getUserEntityFromPrismaUser(queryResponse: User) {
        return new UserEntity(
            queryResponse.id,
            queryResponse.name,
            queryResponse.email,
            queryResponse.password,
            queryResponse.created_at,
            queryResponse.updated_at,
        );
    }

    async register({ name, email, password }: IUserRegisterUseCaseParams): Promise<UserRepositoryResponse> {
        const newUserId = randomUUID();

        const jwtToken = jwt.sign({ user_id: newUserId }, process.env.JWT_SECRET as string, {
            expiresIn: "24h",
        });

        const newUser = new UserEntity(newUserId, name, email, await Bcrypt.hash(password), jwtToken);

        try {
            const queryResponse = await prisma.user.create({
                data: {
                    id: newUser.getId,
                    name: newUser.getName,
                    email: newUser.getEmail,
                    password: newUser.getPassword,
                    jwt_token: newUser.getJwtToken,
                    created_at: newUser.getCreatedAt,
                },
            });

            if (queryResponse) {
                return {
                    success: true,
                    userEntity: newUser,
                };
            }
        } catch (error) {
            return { success: false, error };
        }
    }

    async updateById({
        id,
        name,
        email,
        oldPassword,
        newPassword,
    }: IUserUpdateByIdUseCaseParams): Promise<UserRepositoryResponse> {
        try {
            const userExists = await prisma.user.findFirst({
                where: {
                    email,
                },
            });

            if (!userExists) {
                return {
                    success: false,
                    error: `A user already exists with this email ${email}`,
                };
            }

            const oldPasswordIsCorrect = await Bcrypt.compare(oldPassword, userExists.password);
            if (!oldPasswordIsCorrect) {
                return {
                    success: false,
                    error: `The old password for user ${email} is not correct`,
                };
            }

            const queryResponse = await prisma.user.update({
                where: {
                    id,
                },
                data: {
                    name,
                    email,
                    password: await Bcrypt.hash(newPassword),
                },
            });

            if (queryResponse) {
                return { success: true, userEntity: this.getUserEntityFromPrismaUser(queryResponse) };
            }
        } catch (error) {
            return { success: false, error };
        }
    }

    async login({ email, password }: IUserLoginUseCaseParams): Promise<UserRepositoryResponse> {
        try {
            const queryResponse = await prisma.user.findFirst({ where: { email } });

            if (queryResponse) {
                const passwordIsValid = await Bcrypt.compare(password, queryResponse.password);

                if (passwordIsValid) {
                    return {
                        success: true,
                        userEntity: this.getUserEntityFromPrismaUser(queryResponse),
                    };
                }
                return { success: false, error: `Password for user ${queryResponse.email} invalid` };
            }
        } catch (error) {
            return { success: false, error };
        }
    }

    async userExists(userId: string): Promise<boolean> {
        try {
            const userExists = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });

            if (userExists) return true;

            return false;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async getById(userId: string): Promise<UserRepositoryResponse> {
        try {
            const queryResponse = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });

            if (queryResponse) {
                return {
                    success: true,
                    userEntity: this.getUserEntityFromPrismaUser(queryResponse),
                };
            }
        } catch (error) {
            return { success: false, error };
        }
    }

    async deleteById(userId: string): Promise<UserRepositoryResponse> {
        try {
            const queryResponse = await prisma.user.delete({
                where: {
                    id: userId,
                },
            });

            if (queryResponse) return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    }

    async logout(userId: string): Promise<UserRepositoryResponse> {
        try {
            const queryResponse = await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    jwt_token: null,
                },
            });

            if (queryResponse) return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    }
}
