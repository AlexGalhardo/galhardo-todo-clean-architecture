import ToDosRepository, { type ToDosRepositoryPort } from "../repositories/todos.repository";

export const getToDosRepository = (): ToDosRepositoryPort => {
    return new ToDosRepository();
};
