/*
  Warnings:

  - You are about to alter the column `amount` on the `products` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `amount` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transaction` MODIFY `total_amount` VARCHAR(191) NOT NULL;
