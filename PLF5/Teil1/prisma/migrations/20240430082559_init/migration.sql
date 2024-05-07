-- CreateTable
CREATE TABLE "Zoo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "land" TEXT NOT NULL,
    "stadt" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "baujahr" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Abteilung" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "zooId" TEXT NOT NULL,
    CONSTRAINT "Abteilung_zooId_fkey" FOREIGN KEY ("zooId") REFERENCES "Zoo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tier" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "art" TEXT NOT NULL,
    "abteilungId" TEXT NOT NULL,
    CONSTRAINT "Tier_abteilungId_fkey" FOREIGN KEY ("abteilungId") REFERENCES "Abteilung" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Mitarbeiter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "abteilungId" TEXT NOT NULL,
    CONSTRAINT "Mitarbeiter_abteilungId_fkey" FOREIGN KEY ("abteilungId") REFERENCES "Abteilung" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
