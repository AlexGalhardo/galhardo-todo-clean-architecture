import { IUsersRepository } from "../ports/IUsersRepository";
import PostgresUsersRepository from "../repositories/postgresql/PostgresUsersRepository";

export const getUsersRepository = (): IUsersRepository => {
	return new PostgresUsersRepository();
};
