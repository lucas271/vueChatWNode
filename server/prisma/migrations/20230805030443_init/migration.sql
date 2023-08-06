/*
  Warnings:

  - You are about to drop the column `senderId` on the `friendrequest` table. All the data in the column will be lost.
  - The primary key for the `friendship` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `friendship` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `friendship` table. All the data in the column will be lost.
  - You are about to drop the `_friendshiptouser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[friend_id,user_id]` on the table `Friendship` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,friend_id]` on the table `Friendship` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `friend_id` to the `Friendship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Friendship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Friendship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_friendshiptouser` DROP FOREIGN KEY `_FriendshipToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_friendshiptouser` DROP FOREIGN KEY `_FriendshipToUser_B_fkey`;

-- DropIndex
DROP INDEX `Friendship_id_idx` ON `friendship`;

-- AlterTable
ALTER TABLE `friendrequest` DROP COLUMN `senderId`;

-- AlterTable
ALTER TABLE `friendship` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `friend_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `_friendshiptouser`;

-- CreateIndex
CREATE UNIQUE INDEX `Friendship_friend_id_user_id_key` ON `Friendship`(`friend_id`, `user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Friendship_user_id_friend_id_key` ON `Friendship`(`user_id`, `friend_id`);

-- AddForeignKey
ALTER TABLE `Friendship` ADD CONSTRAINT `Friendship_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Friendship` ADD CONSTRAINT `Friendship_friend_id_fkey` FOREIGN KEY (`friend_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
