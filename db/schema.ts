// user.ts
import { relations } from "drizzle-orm";
import { index, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
});

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    displayName: varchar("display_name", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    userId: uuid("user_id").notNull().unique(),
  },
  (t) => ({
    userIdIdx: index("user_id_idx").on(t.userId),
  })
);

export const followers = pgTable(
  "followers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("follower_id").notNull(),
    followingId: uuid("following_id").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    userIdIdx: index("followers_user_id_idx").on(t.userId),
    followingIdIdx: index("followers_following_id_idx").on(t.followingId),
  })
);

export const posts = pgTable(
  "posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    text: varchar("text", {
      length: 255,
    }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    userId: uuid("user_id").notNull(),
  },
  (t) => ({
    userIdIdx: index("user_posts_id_idx").on(t.userId),
  })
);

export const userRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  posts: many(posts),
}));

export const profileRelations = relations(profiles, ({ one, many }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  profile: one(profiles, {
    fields: [posts.userId],
    references: [profiles.userId],
  }),
}));

export type Post = typeof posts.$inferSelect;
export type User = typeof users.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
export type Follower = typeof followers.$inferSelect;
