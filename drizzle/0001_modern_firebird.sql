CREATE TABLE `email_verification` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`code` text NOT NULL,
	`sent_at` timestamp NOT NULL,
	CONSTRAINT `email_verification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `email_verification` ADD CONSTRAINT `email_verification_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;