-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "publishedDate" TEXT NOT NULL
);
INSERT INTO "new_Book" ("id", "publishedDate", "summary", "title") SELECT "id", "publishedDate", "summary", "title" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check("Book");
PRAGMA foreign_keys=ON;
