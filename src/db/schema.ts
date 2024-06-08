import { sql } from "drizzle-orm";
import { mysqlTable,binary, int, text,varchar,datetime,tinyint } from "drizzle-orm/mysql-core";

export const NotesTable = mysqlTable("note", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  body: text("description"),
});


export const users = mysqlTable("user", {
  id: varchar("id", { length:255  }).primaryKey().default(sql`(uuid())`),

  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(), 
  emailVerified: datetime("emailVerified", { mode: "date" }),
  image: text("image"),
  username: varchar("username", { length: 256 }).unique(),
  
  password: varchar("password", { length: 256 }),
  about: varchar("about", { length: 500 }),
  phone: varchar("phone", { length: 30 }),


 

  created_at: datetime('created_at',{ mode: 'date' }).default(sql`CURRENT_TIMESTAMP`),
  updated_at: datetime('updated_at',{ mode: 'date' }),
  deleted_at: datetime('deleted_at',{ mode: 'date' }),
})

export const sessions = mysqlTable("session", {
  id: varchar("id", {
		length: 255
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 255
	})
		.notNull()
		.references(() => users.id),
	expiresAt: datetime("expires_at").notNull(),
    
      ip: varchar("ip", { length: 255 }),
     userAgent: varchar("user_agent", { length: 255 }),
     createdAt: datetime("created_at", { mode: 'date' }).default(sql`CURRENT_TIMESTAMP`),
  })
  