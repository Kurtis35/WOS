import { pgTable, serial, text, integer, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  specifications: jsonb("specifications").$type<Record<string, string>>().notNull().default({}),
  features: text("features").array().notNull().default([]),
});

export const quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  quantity: integer("quantity").notNull(),
  message: text("message"),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertQuoteRequestSchema = createInsertSchema(quoteRequests).omit({ id: true });

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
export type Product = typeof products.$inferSelect;
export type QuoteRequest = typeof quoteRequests.$inferSelect;
