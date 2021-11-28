"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const faker_1 = __importDefault(require("faker"));
const prisma = new client_1.PrismaClient();
const seedUsers = async () => {
    console.log('Seeding users');
    await prisma.user.deleteMany();
    try {
        const users = new Array(100);
        console.log(users.length);
        for (let user of users) {
            await prisma.user.create({
                data: {
                    email: faker_1.default.internet.email(),
                    firstName: faker_1.default.name.findName(),
                    lastName: faker_1.default.name.findName(),
                    password: faker_1.default.internet.password(),
                    createdAt: faker_1.default.date.past(),
                    updatedAt: faker_1.default.date.recent()
                }
            });
        }
    }
    catch (error) {
        console.log('error seeding users');
    }
};
async function main() {
    if (!(process.env.NODE_ENV === 'test')) {
        console.log('Only seed on development');
        return;
    }
    console.log('seeding');
    await seedUsers();
}
(async function run() {
    try {
        console.log('Start Seed process');
        await main();
    }
    catch (error) {
        console.log(error);
    }
})();
//# sourceMappingURL=seed.js.map