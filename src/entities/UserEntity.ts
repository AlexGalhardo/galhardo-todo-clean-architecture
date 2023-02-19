import jwt from "jsonwebtoken";

import DateTime from "../utils/DateTime";

export default class UserEntity {
    private jwtToken: string | null = null;

    constructor(
        private readonly id: string,
        private name: string,
        private email: string,
        private password: string,
        private readonly createdAt: string = DateTime.getNow,
        private updatedAt: string | null = null,
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.setJwtToken();
    }

    get getId(): string {
        return this.id;
    }

    get getName(): string {
        return this.name;
    }

    get getEmail(): string {
        return this.email;
    }

    get getPassword(): string {
        return this.password;
    }

    get getJwtToken(): string {
        return this.jwtToken;
    }

    get getCreatedAt(): string {
        return this.createdAt;
    }

    protected setJwtToken(): void {
        this.jwtToken = jwt.sign({ user_id: this.id }, process.env.JWT_SECRET as string, {
            expiresIn: "1h",
        });
    }

    public updatePassword(oldPassword: string, newPassword: string): boolean {
        if (oldPassword === this.password) {
            this.password = newPassword;
            this.updatedAt = DateTime.getNow;
            return true;
        }
        return false;
    }
}
