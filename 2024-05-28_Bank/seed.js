//not finished yet
const { PrismaClient } = require('@prisma/client');
const { fakerDE } = require('@faker-js/faker');

const prisma = new PrismaClient();

const bankCount = 2;
const customerCount = 5;
const accountCount = 7;
const transactionCount = 15;

async function seed() {
    for (let i=0; i< bankCount; i++) {
        const bank = await prisma.bank.create({
            data: {
                bic: fakerDE.finance.bic()
            }
        })
    }
    const bankIDs = await prisma.bank.findMany({
        select: {
            id: true
        }
    })
    console.log(bankIDs);

    for (let i=0; i<accountCount; i++) {
        const account = await prisma.account.create({
            data: {
                iban: fakerDE.finance.iban(),
                bank: {
                    connect: {
                        id: bankIDs[fakerDE.number.int({min: 0, max: bankIDs.length-1})].id
                },
            }
        }})
    }
    const accountIDs = await prisma.account.findMany({
        select: {
            id: true
        }
    })
    console.log(accountIDs);

    for (let i=0; i<customerCount; i++) {
        const customer = await prisma.customer.create({
            data: {
                name: fakerDE.person.fullName(),
                email: fakerDE.internet.email(),
                accounts: {
                    connect: {
                        id: accountIDs[fakerDE.number.int({min: 0, max: accountIDs.length-1})].id
                    }
                }
            }
        })
    }
    const customerIDs = await prisma.customer.findMany({
        select: {
            id: true
        }
    })
    console.log(customerIDs);

    for (let i=0; i<transactionCount; i++) {
        const transaction = await prisma.transaction.create({
            data: {
                verwendungszweck: fakerDE.finance.transactionDescription(),
                date: fakerDE.date.past(),
                amount: fakerDE.number.float({min: 0, max: 10000}),
                fromAccount: {
                    connect: {
                        id: accountIDs[fakerDE.number.int({ min: 0, max: accountIDs.length - 1 })].id
                    }
                },
                toAccount: {
                    connect: {
                        id: accountIDs[fakerDE.number.int({ min: 0, max: accountIDs.length - 1 })].id
                    }
                }            }
        })
    }
 
}

seed()
    .then(() => {
        console.log("Done seeding");
    })
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });