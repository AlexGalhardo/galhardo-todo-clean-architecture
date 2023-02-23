import ToDoEntity from "../entities/ToDoEntity";

export interface IToDoUseCaseDefaultResponse {
    success: boolean;
    toDo?: ToDoEntity;
    toDos?: ToDoEntity[];
    status?: string;
    error?: string;
}
export interface ICreateToDoUseCaseParams {
    userId: string;
    title: string;
    description: string;
    done: boolean;
}

export interface IUpdateToDoByIdUseCaseParams {
    id: string;
    title: string;
    description: string;
    done: boolean;
}

export interface ToDoRepositoryResponse {
    success: boolean;
    status?: string;
    toDoEntity?: ToDoEntity;
    toDosEntities?: ToDoEntity[];
    error?: string;
}

export interface IToDosRepository {
    getAllByUserId(userId: string): Promise<ToDoRepositoryResponse>;
    getById(toDoId: string): Promise<ToDoRepositoryResponse>;
    create(newToDo: ToDoEntity): Promise<ToDoRepositoryResponse>;
    save(updatedToDo: ToDoEntity): Promise<ToDoRepositoryResponse>;
    deleteById(toDoId: string): Promise<ToDoRepositoryResponse>;
}
