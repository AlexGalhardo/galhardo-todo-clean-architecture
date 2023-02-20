import "dotenv/config";
import DateTime from "../utils/DateTime";

export default class ToDoEntity {
    constructor(
        private readonly id: string,
        private readonly userId: string,
        private title: string,
        private description: string,
        private done: boolean = false,
        private readonly createdAt: string = DateTime.getNow,
        private updatedAt: string | null = null,
    ) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.done = done;
    }

    get getId(): string {
        return this.id;
    }

    get getUserId(): string {
        return this.userId;
    }

    get getTitle(): string {
        return this.title;
    }

    get getDescription(): string {
        return this.description;
    }

    get getDone(): boolean {
        return this.done;
    }

    get getCreatedAt(): string {
        return this.createdAt;
    }

    get getUpdatedAt(): string {
        return this.updatedAt;
    }

    public setTitle(newTitle: string): void {
        this.title = newTitle;
    }

    public setDescription(newDescription: string): void {
        this.description = newDescription;
    }

    public setDone(isDone: boolean): void {
        this.done = isDone;
    }

    public setUpdatedAt(): void {
        this.updatedAt = DateTime.getNow;
    }
}
