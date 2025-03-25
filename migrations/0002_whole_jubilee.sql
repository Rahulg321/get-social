CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"display_name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
DROP INDEX "user_id_idx";--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "profiles" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_posts_id_idx" ON "posts" USING btree ("user_id");