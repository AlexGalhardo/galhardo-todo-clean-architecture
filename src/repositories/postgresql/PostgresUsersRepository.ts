import { User } from "@prisma/client";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";

import prisma from "../../config/prisma";
import Bcrypt from "../../utils/Bcrypt";
import DateTime from "../../utils/DateTime";
import { IUpdateUserParams, IUsersRepository, registerUserParams } from "../../ports/IUsersRepository";

export default class PostgresUsersRepository implements IUsersRepository {
	async register (registerUserObject: registerUserParams): Promise<{ userRegistred: User; jwtToken: string } | null> {
		const { email, name } = registerUserObject;
		const { password } = registerUserObject;

		const newuser_id = randomUUID();

		const jwtToken = jwt.sign({ user_id: newuser_id }, process.env.JWT_SECRET as string, {
			expiresIn: "24h",
		});

		const queryResponse = await prisma.user.create({
			data: {
				id: newuser_id,
				name,
				email,
				password: await Bcrypt.hash(password),
				jwtToken,
				created_at: DateTime.getNow(),
			},
		});

		return {
			userRegistred: queryResponse,
			jwtToken,
		};
	}

	async updateById (updateUserParamsObject: IUpdateUserParams): Promise<User> {
		const { name, email, password } = updateUserParamsObject;

		const queryResponse = await prisma.user.update({
			where: {
				id: updateUserParamsObject.id,
			},
			data: {
				name,
				email,
				password: await Bcrypt.hash(password),
			},
		});

		return queryResponse;
	}

	async login (email: string, password: string): Promise<User | null> {
		const user = await prisma.user.findFirst({
			where: {
				email,
			},
		});

		if (user) {
			const passwordIsValid = await Bcrypt.compare(password, user.password);

			if (passwordIsValid) return user;
		}

		return null;
	}

	async userExists (userId: string): Promise<boolean> {
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

	async getAll (): Promise<User[] | null> {
		return prisma.user.findMany({});
	}

	async getById (userId: string): Promise<User | null> {
		const queryResponse = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		return queryResponse;
	}

	async deleteAll (): Promise<boolean> {
		await prisma.user.deleteMany({});
		return true;
	}

	async deleteById (userId: string): Promise<boolean> {
		const queryResponse = await prisma.user.delete({
			where: {
				id: userId,
			},
		});

		if (queryResponse) return true;

		return false;
	}

	async logout (userId: string): Promise<boolean> {
		const queryResponse = await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				jwtToken: null,
			},
		});

		if (queryResponse) return true;

		return false;
	}
}
