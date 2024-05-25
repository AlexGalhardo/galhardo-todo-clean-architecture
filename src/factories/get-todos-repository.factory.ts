import PostgresTransactionsRepository, { ToDosRepositoryPort } from "../repositories/todos.repository";

export const getToDosRepository = (): ToDosRepositoryPort => {
    return new PostgresTransactionsRepository();
};
