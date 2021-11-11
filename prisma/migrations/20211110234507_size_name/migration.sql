/*
  Warnings:

  - Added the required column `name` to the `Size` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Size" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Size" ("createdAt", "id") SELECT "createdAt", "id" FROM "Size";
DROP TABLE "Size";
ALTER TABLE "new_Size" RENAME TO "Size";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
