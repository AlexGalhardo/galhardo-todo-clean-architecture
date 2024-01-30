import UsersRepository from "../repositories/Users.repository";

export const getUsersRepository = (): UsersRepository => {
    return new UsersRepository();
};
