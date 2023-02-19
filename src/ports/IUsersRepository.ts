import UserEntity from "../entities/UserEntity";

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
	register ({ name, email, password }: IUserRegisterUseCaseParams): Promise<UserRepositoryResponse>;
	updateById ({
		id,
		newName,
		newEmail,
		olderPassword,
		newPassword,
	}: IUserUpdateByIdUseCaseParams): Promise<UserRepositoryResponse>;
	login ({ email, password }: IUserLoginUseCaseParams): Promise<UserRepositoryResponse>;
	getById (userId: string): Promise<UserRepositoryResponse>;
	logout (userId: string): Promise<UserRepositoryResponse>;
	deleteById (userId: string): Promise<UserRepositoryResponse>;
}
