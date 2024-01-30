import PostgresTransactionsRepository, { ToDosRepositoryPort } from "../repositories/ToDos.repository";

export const getToDosRepository = (): ToDosRepositoryPort => {
    return new PostgresTransactionsRepository();
};
