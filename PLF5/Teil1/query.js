const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Ausgabe der Namen aller Zoos
async function getAllZooNames() {
    try {
        const zoos = await prisma.zoo.findMany();
        return zoos;
    } 
    catch (error) {
        console.error("Fehler beim Abrufen aller Zoos:", error);
        throw error;
    }
}

//anhand einer zooId alle Infos über den Zoo ausgeben
async function getZooById(zooId) {
    try {
        const zoo = await prisma.zoo.findUnique({
            where: {
                id: zooId
            }
        });
        return zoo;
    }
    catch (error) {
        console.error("Fehler beim Abrufen von Zoos anhand ihrer ID:", error);
        throw error;
    }
}

//alle Abteilungen des Zoos ausgeben
async function getDepartments(zooId) {
    try {
        const departments = await prisma.abteilung.findMany({
            where: {
                zooId: zooId
            }
        });
        return departments;
    } catch (error) {
        console.error("Fehler beim Abrufen der Abteilungen:", error);
        throw error;
    }
}

//alle Abteilungen des Zoos ausgeben und zusätzlich die Anzahl der Tiere in jeder Abteilung
async function getDepartmentsWithAnimalCount(zooId) {
    try {
        const departments = await prisma.abteilung.findMany({
            where: {
                zooId: zooId
            },
            include: {
                tiere: true
            }
        });
        return departments.map(department => ({
            ...department,
            animalCount: department.tiere.length
        }));
    } catch (error) {
        console.error("Fehler beim Abrufen der Abteilungen und der Anzahl der Tiere:", error);
        throw error;
    }
}

//alle Mitarbeiter in einem bestimmten Zoo ausgeben
async function getEmployees(zooId) {
    try {
        const employees = await prisma.mitarbeiter.findMany({
            where: {
                abteilungen: {
                    some: {
                        zooId: zooId
                    }
                }
            }
        });
        return employees;
    } catch (error) {
        console.error("Fehler beim Abrufen der Mitarbeiter:", error);
        throw error;
    }
}

//alle Mitarbeiter in einem bestimmten Zoo ausgeben und zusätzlich in welchen Abteilungen sie arbeiten
async function getEmployeesWithDepartments(zooId) {
    try {
        const employees = await prisma.mitarbeiter.findMany({
            where: {
                abteilungen: {
                    some: {
                        zooId: zooId
                    }
                }
            },
            include: {
                abteilungen: true
            }
        });
        return employees;
    } catch (error) {
        console.error("Fehler beim Abrufen der Mitarbeiter und ihrer Abteilungen:", error);
        throw error;
    }
}



async function main() {
    try {
        //Ausgabe der Namen aller Zoos
        const allZooNames = await getAllZooNames();
        console.log("Namen aller Zoos:", allZooNames);

        //anhand einer Zoo-Id alles Infos über den Zoo ausgeben
        const zooId = "clvw6fkid000111u1tu9mweeu"; // Beispielwert für die Zoo-ID
        const zooInfo = await getZooById(zooId);
        console.log("Infos zum Zoo mit ID", zooId + ":", zooInfo);

        //alle Abteilungen des Zoos ausgeben
        const departments = await getDepartments(zooId);
        console.log("Abteilungen des Zoos mit ID", zooId + ":", departments);

        //alle Abteilungen des Zoos ausgeben und zusätzlich die Anzahl der Tiere in jeder Abteilung
        const departmentsWithAnimalCount = await getDepartmentsWithAnimalCount(zooId);
        console.log("Abteilungen des Zoos mit ID", zooId + " und Anzahl der Tiere:", departmentsWithAnimalCount);

        //alle Mitarbeiter in einem bestimmten Zoo ausgeben
        const employees = await getEmployees(zooId);
        console.log("Mitarbeiter des Zoos mit ID", zooId + ":", employees);

        //alle Mitarbeiter in einem bestimmten Zoo ausgeben und zusätzlich in welchen Abteilungen sie arbeiten
        const employeesWithDepartments = await getEmployeesWithDepartments(zooId);
        console.log("Mitarbeiter des Zoos mit ID", zooId + " und ihre Abteilungen:", employeesWithDepartments);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        await prisma.$disconnect();
    }
}


main();
