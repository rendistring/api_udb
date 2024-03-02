-- CreateTable
CREATE TABLE `WishList` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductWishlist` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProductWishlist_AB_unique`(`A`, `B`),
    INDEX `_ProductWishlist_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProductWishlist` ADD CONSTRAINT `_ProductWishlist_A_fkey` FOREIGN KEY (`A`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductWishlist` ADD CONSTRAINT `_ProductWishlist_B_fkey` FOREIGN KEY (`B`) REFERENCES `WishList`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
