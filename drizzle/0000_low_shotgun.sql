CREATE TABLE `note` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	CONSTRAINT `note_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires_at` datetime NOT NULL,
	`ip` varchar(255),
	`user_agent` varchar(255),
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL DEFAULT (uuid()),
	`name` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`emailVerified` datetime,
	`image` text,
	`username` varchar(256),
	`password` varchar(256),
	`about` varchar(500),
	`phone` varchar(30),
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime,
	`deleted_at` datetime,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`),
	CONSTRAINT `user_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;