CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50),
	"description" varchar(256),
	"completed" boolean
);
--> statement-breakpoint
DROP TABLE "cities";--> statement-breakpoint
DROP TABLE "countries";