CREATE TABLE `todos` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	`name` text(50) NOT NULL,
	`description` text(256),
	`completed` integer
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	`name` text(50),
	`email` text(50) NOT NULL,
	`password` text(256),
	`phone` text(20),
	`city` text(50),
	`street` text(100),
	`number` text(10),
	`zipcode` text(10)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `emailUniqueIndex` ON `users` (lower("email"));