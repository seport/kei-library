/*
  Warnings:

  - Made the column `itemNumber` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER,
    "itemNumber" TEXT NOT NULL,
    "material" TEXT,
    "measurements" TEXT
);
INSERT INTO "new_Item" ("createdAt", "description", "id", "itemNumber", "material", "measurements", "name", "price") SELECT "createdAt", "description", "id", "itemNumber", "material", "measurements", "name", "price" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
