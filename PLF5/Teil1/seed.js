const { PrismaClient } = require('@prisma/client');
const { fakerDE } = require('@faker-js/faker');

const prisma = new PrismaClient();

const zooCountTarget = 5;
const mitarbeiterCountTarget = 100;

async function seed() {
    const zooCountCurrent = await prisma.zoo.count();
    for (const i = 1; i <= zooCountTarget - zooCountCurrent; i++) {
        const zoo = await prisma.zoo.create({
            data: {
                land: fakerDE.location(),
                stadt: fakerDE.location(),
                adresse: fakerDE.location.adresse(),
                baujahr: fakerDE.date.past()
            }
        });
    }
    zooCountCurrent = await prisma.zoo.count();
    console.log(zooCountCurrent + " Zoos in der DB");

    const mitarbeiterCountCurrent = await prisma.mitarbeiter.count();
    for (const i = 1; i <= mitarbeiterCountTarget - mitarbeiterCountCurrent; i++) {
        const mitarbeiter = await prisma.mitarbeiter.create({
            data: {
                name: fakerDE.person.fullName()
            }
        }
        );
    }
    mitarbeiterCountCurrent = await prisma.mitarbeiter.count();
    console.log(mitarbeiterCountCurrent + " Mitarbeiter in der DB");

}

seed().then((console.log("done seeding")));