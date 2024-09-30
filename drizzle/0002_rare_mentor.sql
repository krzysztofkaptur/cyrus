CREATE TABLE `testimonials` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	`name` text(50),
	`avatar` text(256),
	`test` text(256)
);
