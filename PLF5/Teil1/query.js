const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Ausgabe der Namen aller Zoos
async function namenAllerZoos() {
    const zoos = await prisma.zoo.findMany();
    return zoos;
}

//anhand einer zooId alle Infos über den Zoo ausgeben
async function infosZoo(zooId) {
    const infoZoo = await prisma.zoo.findMany({
        where: {
            id: zooId
        }
    });
    return infoZoo;
}



async function main() {
    try {
        //const zooId = irgendeine id
        namenAllerZoos();
        infosZoo(zooId);
    }
    catch {
        console.log(error.message);
    }
    finally {
        await prisma.$disconnect();
    }
}
