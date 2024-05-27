const { PrismaClient } = require('@prisma/client');
const { fakerDE } = require('@faker-js/faker');

const prisma = new PrismaClient();

const zooCount = 5;
const mitarbeiterCount = 100;

async function seed() {

  //zoos, abteilungen und tiere erstellen
  for (let i = 1; i <= zooCount; i++) {
      const zoo = await prisma.zoo.create({
          data: {
              land: fakerDE.location.country(),
              stadt: fakerDE.location.city(),
              adresse: fakerDE.location.streetAddress(),
              baujahr: fakerDE.date.past().getFullYear()
          }
      });
      
      const abteilungenCount = fakerDE.number.int({ min: 2, max: 7 });
      for (let i = 0; i < abteilungenCount; i++) {
        const abteilung = await prisma.abteilung.create({
          data: {
            name: fakerDE.animal.type(),
            zooId: zoo.id
          }
        });
        
        const tiereCount = fakerDE.number.int({ min: 5, max: 20 });
        for (let i = 0; i < tiereCount; i++) {
          const tier = await prisma.tier.create({
            data: {
              name: fakerDE.person.firstName(),
              art: fakerDE.animal.type(),
              abteilungId: abteilung.id
            }
          });
        }
      }
    }
    console.log("Zoos erstellt");
    console.log("Abteilungen erstellt");
    console.log("Tiere erstellt");


//mitarbeiter erstellen
const mitarbeiter = [];
for (let i = 0; i < mitarbeiterCount; i++) {
    const mitarbeiterData = await prisma.mitarbeiter.create({
        data: {
            name: fakerDE.person.fullName()
        }
    });
    mitarbeiter.push(mitarbeiterData);
    console.log(`Mitarbeiter ${mitarbeiterData.id} erstellt: ${mitarbeiterData.name}`);
}

console.log(`${mitarbeiterCount} Mitarbeiter in der DB`);

//mitarbeiter den abteilungen zuordnen
const abteilungen = await prisma.abteilung.findMany();
for (const mitarbeiter of mitarbeiter) {
    const abteilungenCount = fakerDE.number.int({ min: 1, max: 4 });
    const assignedAbteilungen = fakerDE.helpers.arrayElements(abteilungen, abteilungenCount);
    for (const abteilung of assignedAbteilungen) {
        await prisma.abteilungMitarbeiter.create({
            data: {
                abteilungId: abteilung.id,
                mitarbeiterId: mitarbeiter.id
            }
        });
        console.log(`Mitarbeiter ${mitarbeiter.id} zu Abteilung ${abteilung.id} zugewiesen`);
    }
}

}
console.log("Mitarbeiter den Abteilungen zugewiesen");

seed()
    .then(() => {
        console.log("Done seeding");
    })
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });