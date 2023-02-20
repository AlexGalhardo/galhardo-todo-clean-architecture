import jwt from "jsonwebtoken";
import 'dotenv/config';

import DateTime from "../utils/DateTime";
import Bcrypt from "../utils/Bcrypt";
import ToDoEntity from "../entities/ToDoEntity";

export default class UserEntity {
	private jwtToken: string | null = null;

	constructor(
		private readonly id: string,
		private name: string,
		private email: string,
		private password: string,
		private readonly createdAt: string = DateTime.getNow,
		private updatedAt: string | null = null,
		private toDos: ToDoEntity[] = []
	) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.setJwtToken();
		this.toDos = toDos
	}

	static async init (
		id: string,
		name: string,
		email: string,
		password: string,
		createdAt: string = DateTime.getNow,
		updatedAt: string | null = null) {
		const hashPassword = await Bcrypt.hash(password)
		return new UserEntity(id, name, email, hashPassword)
	}

	get getId (): string {
		return this.id;
	}

	get getName (): string {
		return this.name;
	}

	get getEmail (): string {
		return this.email;
	}

	get getPassword (): string {
		return this.password;
	}

	public setName (newName: string): void {
		this.name = newName
	}

	public setEmail (newEmail: string): void {
		this.email = newEmail
	}

	public async setPassword (newPassword: string): Promise<void> {
		this.password = await Bcrypt.hash(newPassword)
	}

	get getJwtToken (): string {
		return this.jwtToken;
	}

	get getCreatedAt (): string {
		return this.createdAt;
	}

	get getUpdatedAt (): string {
		return this.updatedAt;
	}

	public addToDo (toDo: ToDoEntity) {
		this.toDos.push(toDo)
	}

	get getAllTodos (): ToDoEntity[] {
		return this.toDos;
	}

	public getToDoById (toDoId: string): ToDoEntity | null {
		for (let i = 0; i < this.toDos.length; i++) {
			if (this.toDos[i].getId === toDoId) {
				return this.toDos[i]
			}
		}
		return null
	}

	public setJwtToken (): void {
		this.jwtToken = jwt.sign({ user_id: this.id }, process.env.JWT_SECRET as string, {
			expiresIn: "1h",
		});
	}
}
