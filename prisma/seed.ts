import { randomUUID } from "node:crypto";
import prisma from "../src/config/prisma";
import Bcrypt from "../src/utils/Bcrypt";

export const { USER_TEST_ID, USER_TEST_EMAIL, USER_TEST_PASSWORD } = process.env;

const seedPrismaDataBase = async () => {
    await prisma.user.deleteMany({});
    await prisma.toDo.deleteMany({});

    await prisma.user.createMany({
        data: [
            {
                id: USER_TEST_ID,
                name: "test",
                email: USER_TEST_EMAIL as string,
                password: await Bcrypt.hash(USER_TEST_PASSWORD as string),
                created_at: new Date(),
            },
        ],
        skipDuplicates: true,
    });

    await prisma.toDo.createMany({
        data: [
            {
                id: randomUUID(),
                user_id: USER_TEST_ID as string,
                title: "todo teste title",
                description: "Teste",
                done: false,
                created_at: new Date(),
            },
        ],
        skipDuplicates: false,
    });
};

seedPrismaDataBase()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
