import { User } from "@prisma/client";

import prisma from "../../config/prisma";
import UserEntity from "../../entities/UserEntity";
import {
	IUsersRepository,
	UserRepositoryResponse,
} from "../../ports/IUsersRepository";

interface PrismaUserWithToDos {
	id: string;
	name: string;
	email: string;
	password: string;
	jwt_token: string;
	created_at: string;
	updated_at: string;
	ToDos: {
		id: string;
		created_at: string;
		updated_at: string;
		title: string;
		description: string;
		done: boolean;
	}[];
}

export default class PostgresUsersRepository implements IUsersRepository {
	private getUserEntityFromPrismaUser (queryResponse) {
		return new UserEntity(
			queryResponse.id,
			queryResponse.name,
			queryResponse.email,
			queryResponse.password,
			queryResponse.created_at,
			queryResponse.updated_at,
			queryResponse.ToDos
		);
	}

	async create (user: UserEntity): Promise<UserRepositoryResponse> {
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

	async save (user: UserEntity): Promise<UserRepositoryResponse> {
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

	async getUserEntityById (userId: string): Promise<UserRepositoryResponse> {
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				select: {
					id: true,
					name: true,
					email: true,
					password: true,
					jwt_token: true,
					created_at: true,
					updated_at: true,
					ToDo: {
						select: {
							id: true,
							title: true,
							description: true,
							done: true,
							created_at: true,
							updated_at: true
						}
					}
				}
			});
			if (user) return { success: true, userEntity: this.getUserEntityFromPrismaUser(user) }
		}
		catch (error) {
			return { success: false, error };
		}
	}

	async getUserEntityByEmail (userEmail: string): Promise<UserRepositoryResponse> {
		try {
			const user = await prisma.user.findUnique({
				where: {
					email: userEmail,
				},
				select: {
					id: true,
					name: true,
					email: true,
					password: true,
					jwt_token: true,
					created_at: true,
					updated_at: true,
					ToDo: {
						select: {
							id: true,
							title: true,
							description: true,
							done: true,
							created_at: true,
							updated_at: true
						}
					}
				}
			});

			if (user) {
				return {
					success: true,
					userEntity: this.getUserEntityFromPrismaUser(user)
				}
			}
		} catch (error) {
			return { success: false, error };
		}
	}

	async deleteById (userId: string): Promise<UserRepositoryResponse> {
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

	async logout (userId: string): Promise<UserRepositoryResponse> {
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
