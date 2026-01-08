import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Products
  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  app.get(api.products.getByCategory.path, async (req, res) => {
    const products = await storage.getProductsByCategory(req.params.category);
    res.json(products);
  });

  // Quote Requests
  app.post(api.quotes.create.path, async (req, res) => {
    try {
      const input = api.quotes.create.input.parse(req.body);
      const quote = await storage.createQuoteRequest(input);
      res.status(201).json(quote);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Initial Seed
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProducts = await storage.getProducts();
  if (existingProducts.length === 0) {
    const seedProducts = [
      // Packaging Material
      {
        name: "Black Block Local Pallet",
        description: "Standard black block pallet designed for local industrial storage and transport within South Africa.",
        category: "Packaging Material",
        imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f",
        specifications: { "Type": "Local", "Color": "Black", "Material": "Reinforced Wood/Plastic" },
        features: ["Local Transport", "Heavy Duty"]
      },
      {
        name: "9kg Gen Jumblekraft (2 col)",
        description: "A kraft-colored, 2-column jumble box, designed for 9kg of produce.",
        category: "Packaging Material",
        imageUrl: "https://images.unsplash.com/photo-1583334547926-d71d37b4260d",
        specifications: { "Capacity": "9kg", "Color": "Kraft", "Columns": "2" },
        features: ["Produce Packaging", "Breathable"]
      },
      {
        name: "Packaging Bags Range",
        description: "Specialized packaging bags including MK4 Green/Red and Econo Pak ranges from 1kg to 3kg.",
        category: "Packaging Material",
        imageUrl: "https://images.unsplash.com/photo-1605634691459-0a562499d349",
        specifications: { "Models": "MK4, MK6, Econo Pak", "Sizes": "1kg, 1.5kg, 3kg" },
        features: ["Industrial Quality", "Tear Resistant"]
      },
      // Safety Equipment
      {
        name: "Interceptor Askari Lo II Smooth",
        description: "Low-cut smooth finish safety shoe designed for comfort and professional appearance without compromising safety.",
        category: "Safety Equipment",
        imageUrl: "https://images.unsplash.com/photo-1590486803833-ffc6de271560",
        specifications: { "Brand": "Interceptor", "Style": "Lo II Smooth", "Type": "Safety Shoe" },
        features: ["Smooth Leather", "Steel Toe", "Anti-slip"]
      },
      {
        name: "Industrial Hard Hats",
        description: "High-quality hard hats designed to meet industry safety standards.",
        category: "Safety Equipment",
        imageUrl: "https://images.unsplash.com/photo-1582553091915-a764d3060020",
        specifications: { "Type": "Head Protection", "Standard": "Industrial Safety" },
        features: ["Impact Resistant", "Adjustable Fit"]
      },
      {
        name: "Safety Gloves",
        description: "Reliable hand protection for every task, built to withstand tough conditions.",
        category: "Safety Equipment",
        imageUrl: "https://images.unsplash.com/photo-1516937941344-00b4e0337589",
        specifications: { "Type": "Work Gloves", "Material": "Industrial Grade" },
        features: ["High Dexterity", "Durable"]
      },
      // Work Clothing
      {
        name: "Mens Performance Polo",
        description: "High-quality performance polo shirt for professional workplace appearance.",
        category: "Work/Promotional Clothing",
        imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d",
        specifications: { "Gender": "Men", "Type": "Polo", "Material": "Performance Fabric" },
        features: ["Moisture Wicking", "Corporate Branding Ready"]
      },
      {
        name: "Ladies Performance Polo",
        description: "Tailored performance polo shirt for women in the workplace.",
        category: "Work/Promotional Clothing",
        imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d",
        specifications: { "Gender": "Women", "Type": "Polo", "Material": "Performance Fabric" },
        features: ["Tailored Fit", "Corporate Branding Ready"]
      }
    ];




    for (const product of seedProducts) {
      await storage.createProduct(product);
    }
    console.log("Seeded database with products");
  }
}
