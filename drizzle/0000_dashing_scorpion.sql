CREATE TABLE `todos` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	`name` text(50) NOT NULL,
	`description` text(256),
	`completed` integer
);
