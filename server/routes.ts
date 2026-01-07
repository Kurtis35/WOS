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
        name: "Industrial Pallets",
        description: "Comprehensive range of pallets for local and export use. Available in Black Block, Blue Block, White, and Green options.",
        category: "Packaging Material",
        imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f",
        specifications: {
          "Type": "Local & Export",
          "Colors": "Black, Blue, White, Green",
          "Material": "Reinforced Plastic/Wood",
          "Usage": "Industrial Storage"
        },
        features: ["Heavy Duty", "Export Certified", "Stackable"]
      },
      {
        name: "Econo E/V Outer Box",
        description: "Economical white or kraft 4-column outer box designed for E/V (Export/Import) purposes. Sturdy and cost-effective.",
        category: "Packaging Material",
        imageUrl: "https://images.unsplash.com/photo-1583334547926-d71d37b4260d",
        specifications: {
          "Type": "4-Column Outer",
          "Finish": "White or Kraft",
          "Purpose": "Export/Import",
          "Model": "Econo E/V"
        },
        features: ["Economical", "Sturdy", "Export Ready"]
      },
      {
        name: "MK4 E/V Inner Tray",
        description: "Standard or lightweight inner tray/insert for MK4 E/V outer boxes. Ensures product stability during transit.",
        category: "Packaging Material",
        imageUrl: "https://images.unsplash.com/photo-1627409228809-5a507856f6c9",
        specifications: {
          "Type": "Inner Tray",
          "Compatibility": "MK4 E/V Outer",
          "Weight": "Standard or LW",
          "Material": "Corrugated Board"
        },
        features: ["Product Protection", "Snug Fit", "Recyclable"]
      },
      {
        name: "Industrial Packaging Bags",
        description: "Specialized packaging bags including MK4 Green/Red and Econo Pak ranges from 1kg to 3kg.",
        category: "Packaging Material",
        imageUrl: "https://images.unsplash.com/photo-1605634691459-0a562499d349",
        specifications: {
          "Models": "MK4, MK6, Econo Pak",
          "Sizes": "1kg, 1.5kg, 3kg",
          "Colors": "Green, Red, Clear",
          "Type": "Polyethylene"
        },
        features: ["Tear Resistant", "Moisture Barrier", "Custom Branding Available"]
      },
      // Safety Equipment
      {
        name: "Interceptor Askari Safety Boots",
        description: "Premium safety footwear including Lo II Smooth and Mid variants. Designed for maximum protection and comfort.",
        category: "Safety Equipment",
        imageUrl: "https://images.unsplash.com/photo-1590486803833-ffc6de271560",
        specifications: {
          "Brand": "Interceptor",
          "Models": "Askari, Safiri, Shikamo",
          "Type": "Steel Toe Cap",
          "Sole": "Oil & Slip Resistant"
        },
        features: ["Breathable Lining", "Impact Protection", "Durable Sole"]
      },
      {
        name: "Industrial Hard Hats",
        description: "Durable head protection for construction and industrial environments. Available in various safety colors.",
        category: "Safety Equipment",
        imageUrl: "https://images.unsplash.com/photo-1582553091915-a764d3060020",
        specifications: {
          "Material": "High-Density Polyethylene",
          "Suspension": "6-Point Webbing",
          "Certification": "SABS Approved",
          "Colors": "White, Yellow, Red, Blue"
        },
        features: ["Impact Resistant", "Adjustable Fit", "Ventilated"]
      },
      {
        name: "High-Viz Reflective Gear",
        description: "Reflective safety vests and bandanas for maximum visibility in low-light industrial environments.",
        category: "Safety Equipment",
        imageUrl: "https://images.unsplash.com/photo-1516937941344-00b4e0337589",
        specifications: {
          "Type": "Vest / Bandana",
          "Material": "Polyester Mesh",
          "Visibility": "High-Performance Reflective Tape",
          "Brand": "Yield"
        },
        features: ["Lightweight", "Breathable", "Enhanced Visibility"]
      },
      // Work/Promotional Clothing
      {
        name: "Corporate & Work Apparel",
        description: "High-quality professional clothing for men and women, specifically designed for industrial and corporate environments.",
        category: "Work Clothing",
        imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d",
        specifications: {
          "Segments": "Men & Women",
          "Material": "Cotton/Polyester Blend",
          "Branding": "Embroidery/Print Ready",
          "Durability": "Industrial Strength"
        },
        features: ["Comfortable Fit", "Color Fast", "Easy Care"]
      }
    ];


    for (const product of seedProducts) {
      await storage.createProduct(product);
    }
    console.log("Seeded database with products");
  }
}
