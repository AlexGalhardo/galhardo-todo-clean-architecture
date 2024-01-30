import "dotenv/config";
import { randomUUID } from "node:crypto";
import prisma from "../src/config/prisma";
import Bcrypt from "../src/utils/Bcrypt";
import * as jwt from "jsonwebtoken";

export const { USER_TEST_ID, USER_TEST_EMAIL, USER_TEST_PASSWORD } = process.env;

const seedDatabase = async () => {
    await prisma.user.deleteMany({});
    await prisma.toDo.deleteMany({});

    await prisma.user.createMany({
        data: [
            {
                id: USER_TEST_ID,
                name: "test",
                email: USER_TEST_EMAIL as string,
                password: await Bcrypt.hash(USER_TEST_PASSWORD as string),
                jwt_token: jwt.sign({ USER_TEST_ID, USER_TEST_EMAIL }, String(process.env.JWT_SECRET), {
                    expiresIn: "1h",
                }),
                created_at: new Date(),
            },
        ],
        skipDuplicates: true,
    });

    await prisma.toDo.createMany({
        data: [
            {
                id: randomUUID(),
                user_id: String(USER_TEST_ID),
                title: "todo teste title",
                description: "Teste",
                done: false,
                created_at: new Date(),
            },
        ],
        skipDuplicates: false,
    });
};

seedDatabase()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
