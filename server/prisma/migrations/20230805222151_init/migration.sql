/*
  Warnings:

  - A unique constraint covering the columns `[senderId,receiverId]` on the table `friendRequest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receiverId,senderId]` on the table `friendRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `senderId` to the `friendRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `friendrequest` ADD COLUMN `senderId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `friendRequest_senderId_receiverId_key` ON `friendRequest`(`senderId`, `receiverId`);

-- CreateIndex
CREATE UNIQUE INDEX `friendRequest_receiverId_senderId_key` ON `friendRequest`(`receiverId`, `senderId`);

-- AddForeignKey
ALTER TABLE `friendRequest` ADD CONSTRAINT `friendRequest_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
