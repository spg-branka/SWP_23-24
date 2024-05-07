-- CreateTable
CREATE TABLE "_AbteilungToMitarbeiter" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AbteilungToMitarbeiter_A_fkey" FOREIGN KEY ("A") REFERENCES "Abteilung" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AbteilungToMitarbeiter_B_fkey" FOREIGN KEY ("B") REFERENCES "Mitarbeiter" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mitarbeiter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "abteilungId" TEXT NOT NULL
);
INSERT INTO "new_Mitarbeiter" ("abteilungId", "id", "name") SELECT "abteilungId", "id", "name" FROM "Mitarbeiter";
DROP TABLE "Mitarbeiter";
ALTER TABLE "new_Mitarbeiter" RENAME TO "Mitarbeiter";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_AbteilungToMitarbeiter_AB_unique" ON "_AbteilungToMitarbeiter"("A", "B");

-- CreateIndex
CREATE INDEX "_AbteilungToMitarbeiter_B_index" ON "_AbteilungToMitarbeiter"("B");
