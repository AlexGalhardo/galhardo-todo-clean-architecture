import { User } from "@prisma/client";

import prisma from "../../config/prisma";
import UserEntity from "../../entities/UserEntity";
import { IUsersRepository, UserRepositoryResponse } from "../../ports/IUsersRepository";

export default class PostgresUsersRepository implements IUsersRepository {
    private getUserEntityFromPrismaUser(queryResponse: User) {
        return new UserEntity(
            queryResponse.id,
            queryResponse.name,
            queryResponse.email,
            queryResponse.password,
            queryResponse.created_at,
            queryResponse.updated_at,
        );
    }

    async create(user: UserEntity): Promise<UserRepositoryResponse> {
        try {
            const queryResponse = await prisma.user.create({
                data: {
                    id: user.getId,
                    name: user.getName,
                    email: user.getEmail,
                    password: user.getPassword,
                    jwt_token: user.getJwtToken,
                    created_at: user.getCreatedAt,
                },
            });

            if (queryResponse) {
                return {
                    success: true,
                    userEntity: user,
                };
            }
        } catch (error) {
            return { success: false, error };
        }
    }

    async save(user: UserEntity): Promise<UserRepositoryResponse> {
        try {
            const queryResponse = await prisma.user.update({
                where: {
                    id: user.getId,
                },
                data: {
                    id: user.getId,
                    name: user.getName,
                    email: user.getEmail,
                    password: user.getPassword,
                    jwt_token: user.getJwtToken,
                    updated_at: user.getUpdatedAt,
                },
            });

            if (queryResponse) {
                return {
                    success: true,
                    userEntity: user,
                };
            }
        } catch (error) {
            return { success: false, error };
        }
    }

    async getUserEntityById(userId: string): Promise<UserRepositoryResponse> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (user) return { success: true, userEntity: this.getUserEntityFromPrismaUser(user) };
        } catch (error) {
            return { success: false, error };
        }
    }

    async getUserEntityByEmail(userEmail: string): Promise<UserRepositoryResponse> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: userEmail,
                },
            });

            if (user) {
                return {
                    success: true,
                    userEntity: this.getUserEntityFromPrismaUser(user),
                };
            }
            if (user === null) {
                return { success: false };
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
