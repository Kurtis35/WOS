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
        name: "Blue Block Local Pallet",
        description: "Durable blue block pallet for local supply chain operations.",
        category: "Packaging Material",
        imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f",
        specifications: { "Type": "Local", "Color": "Blue", "Material": "Reinforced Wood/Plastic" },
        features: ["Color Coded", "Industrial Strength"]
      },
      {
        name: "Black Block Export Pallet",
        description: "Export-grade black block pallet, heat-treated and certified for international shipping.",
        category: "Packaging Material",
        imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f",
        specifications: { "Type": "Export", "Color": "Black", "Certification": "ISPM-15" },
        features: ["International Shipping", "Heat Treated"]
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
        name: "MK9 Gen Jumble White (4 col)",
        description: "A white, 4-column jumble box, likely for larger produce like apples or pears.",
        category: "Packaging Material",
        imageUrl: "https://images.unsplash.com/photo-1583334547926-d71d37b4260d",
        specifications: { "Capacity": "9kg+", "Color": "White", "Columns": "4" },
        features: ["Premium Finish", "Large Capacity"]
      },
      {
        name: "MK4 E/V Gen Outer White (4 col)",
        description: "A white, 4-column outer box for E/V (Export/Import) purposes.",
        category: "Packaging Material",
        imageUrl: "https://images.unsplash.com/photo-1583334547926-d71d37b4260d",
        specifications: { "Type": "Outer Box", "Color": "White", "Purpose": "E/V" },
        features: ["Export Grade", "High Visibility"]
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
        name: "Interceptor Askari Mid",
        description: "Mid-cut safety boot providing additional ankle support for rugged industrial environments.",
        category: "Safety Equipment",
        imageUrl: "https://images.unsplash.com/photo-1590486803833-ffc6de271560",
        specifications: { "Brand": "Interceptor", "Style": "Mid", "Type": "Safety Boot" },
        features: ["Ankle Support", "High Durability"]
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
        name: "Mens Adventure Jacket",
        description: "Rugged adventure jacket for outdoor work and industrial environments.",
        category: "Work/Promotional Clothing",
        imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d",
        specifications: { "Gender": "Men", "Type": "Jacket", "Style": "Adventure" },
        features: ["Weather Resistant", "Multiple Pockets"]
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
