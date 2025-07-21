import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const personas = pgTable("personas", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  theme: text("theme").notNull(),
  colors: text("colors").notNull(), // JSON string
  fonts: text("fonts").notNull(), // JSON string
});

export const journeySteps = pgTable("journey_steps", {
  id: serial("id").primaryKey(),
  personaId: text("persona_id").notNull(),
  stepId: text("step_id").notNull(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  image: text("image").notNull(),
  order: integer("order").notNull(),
});

export const actions = pgTable("actions", {
  id: serial("id").primaryKey(),
  personaId: text("persona_id").notNull(),
  stepId: text("step_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPersonaSchema = createInsertSchema(personas);
export const insertJourneyStepSchema = createInsertSchema(journeySteps);
export const insertActionSchema = createInsertSchema(actions);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Persona = typeof personas.$inferSelect;
export type JourneyStep = typeof journeySteps.$inferSelect;
export type Action = typeof actions.$inferSelect;
