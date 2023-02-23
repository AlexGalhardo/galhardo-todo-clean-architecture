import UserEntity from "../entities/UserEntity";

export interface IUserUseCaseDefaultResponse {
    success: boolean;
    data?: UserEntity;
    status?: string;
    error?: string;
}
export interface UserRepositoryResponse {
    success: boolean;
    status?: string;
    error?: string;
    userEntity?: UserEntity;
}

export interface IUserRegisterUseCaseParams {
    name: string;
    email: string;
    password: string;
}

export interface IUserLoginUseCaseParams {
    email: string;
    password: string;
}

export interface IUserUpdateByIdUseCaseParams {
    id: string;
    newName: string;
    newEmail: string;
    olderPassword: string;
    newPassword: string;
}

export interface IUsersRepository {
    create(user: UserEntity): Promise<UserRepositoryResponse>;
    save(user: UserEntity): Promise<UserRepositoryResponse>;
    getUserEntityById(userId: string): Promise<UserRepositoryResponse>;
    getUserEntityByEmail(userEmail: string): Promise<UserRepositoryResponse>;
    logout(userId: string): Promise<UserRepositoryResponse>;
    deleteById(userId: string): Promise<UserRepositoryResponse>;
}
