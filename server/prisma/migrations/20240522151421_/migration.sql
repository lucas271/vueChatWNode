/*
  Warnings:

  - The primary key for the `friendRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "friendRequest" DROP CONSTRAINT "friendRequest_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "friendRequest_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "friendRequest_id_seq";
