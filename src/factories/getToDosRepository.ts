import { IToDosRepository } from "../ports/IToDosRepository";
import PostgresTransactionsRepository from "../repositories/postgresql/PostgresToDosRepository";

export const getToDosRepository = (): IToDosRepository => {
	return new PostgresTransactionsRepository();
};
