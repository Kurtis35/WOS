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
      // 📦 1. PACKAGING MATERIAL
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
        name: "Paper Cores",
        description: "High-strength paper cores for industrial winding and packaging applications.",
        category: "Packaging Material",
        imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f",
        specifications: { "Material": "Industrial Paper", "Type": "Core" },
        features: ["Durable", "Recyclable"]
      },
      {
        name: "Angle Board",
        description: "Protective angle boards for pallet edge protection and load stability.",
        category: "Packaging Material",
        imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f",
        specifications: { "Type": "Edge Protection" },
        features: ["Stacking Strength", "Load Stability"]
      },
      {
        name: "Polypropylene Strapping",
        description: "High-tensile PP strapping for secure pallet bundling and carton sealing.",
        category: "Packaging Material",
        imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f",
        specifications: { "Material": "Polypropylene", "Type": "Strapping" },
        features: ["High Tensile", "Weather Resistant"]
      },
      {
        name: "Bulk Bins",
        description: "Large capacity bulk bins for agricultural and industrial storage.",
        category: "Packaging Material",
        imageUrl: "https://images.unsplash.com/photo-1583334547926-d71d37b4260d",
        specifications: { "Type": "Bulk Storage" },
        features: ["Stackable", "Heavy Duty"]
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

      // 🦺 2. SAFETY EQUIPMENT
      {
        name: "Industrial Hard Hats",
        description: "High-quality hard hats designed to meet industry safety standards.",
        category: "Safety Equipment",
        imageUrl: "https://images.unsplash.com/photo-1582553091915-a764d3060020",
        specifications: { "Standard": "SABS Approved", "Type": "Head Protection" },
        features: ["Impact Resistant", "Adjustable Fit"]
      },
      {
        name: "Safety Gloves Range",
        description: "Comprehensive range of industrial gloves for various applications.",
        category: "Safety Equipment",
        imageUrl: "https://images.unsplash.com/photo-1516937941344-00b4e0337589",
        specifications: { "Type": "Hand Protection" },
        features: ["High Grip", "Durable"]
      },
      {
        name: "Respiratory Protection",
        description: "Safety masks and respirators for industrial environments.",
        category: "Safety Equipment",
        imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
        specifications: { "Type": "Mask", "Protection": "N95/FFP2" },
        features: ["Breathable", "Secure Fit"]
      },
      {
        name: "Interceptor Askari Lo II Smooth",
        description: "Low-cut smooth finish safety shoe designed for comfort and professional appearance.",
        category: "Safety Equipment",
        imageUrl: "https://images.unsplash.com/photo-1590486803833-ffc6de271560",
        specifications: { "Brand": "Interceptor", "Style": "Lo II Smooth" },
        features: ["Steel Toe", "Anti-slip"]
      },
      {
        name: "Yield Hi-Viz Reflective Bandana",
        description: "High-visibility reflective bandana for maximum safety.",
        category: "Safety Equipment",
        imageUrl: "https://images.unsplash.com/photo-1516937941344-00b4e0337589",
        specifications: { "Brand": "Yield", "Type": "Reflective" },
        features: ["High Viz", "Lightweight"]
      },

      // 👕 3. WORK / PROMOTIONAL CLOTHING
      {
        name: "Men's Branded Polo",
        description: "Professional men's polo shirt, perfect for branding.",
        category: "Work/Promotional Clothing",
        imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d",
        specifications: { "Gender": "Men", "Type": "Polo" },
        features: ["Branding Ready", "Comfortable Fit"]
      },
      {
        name: "Women's Branded Polo",
        description: "Tailored women's polo shirt for corporate identity.",
        category: "Work/Promotional Clothing",
        imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d",
        specifications: { "Gender": "Women", "Type": "Polo" },
        features: ["Branding Ready", "Tailored"]
      },
      {
        name: "Industrial Overalls",
        description: "Heavy-duty work overalls for industrial use.",
        category: "Work/Promotional Clothing",
        imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d",
        specifications: { "Type": "Overall", "Durability": "High" },
        features: ["Reinforced Stitched", "Multiple Pockets"]
      },

      // 🧹 4. OFFICE & CLEANING EQUIPMENT
      {
        name: "Industrial Cleaning Chemicals",
        description: "High-strength cleaning chemicals for industrial environments.",
        category: "Office & Cleaning Equipment",
        imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
        specifications: { "Type": "Chemicals", "Size": "5L/25L" },
        features: ["Heavy Duty", "Concentrated"]
      },
      {
        name: "Office Supplies Bundle",
        description: "Essential office supplies for administrative needs.",
        category: "Office & Cleaning Equipment",
        imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
        specifications: { "Type": "Supplies" },
        features: ["Complete Set"]
      },

      // 🚜 5. AGRICULTURAL EQUIPMENT
      {
        name: "Produce Crates",
        description: "Durable crates for harvesting and transporting produce.",
        category: "Agricultural Equipment",
        imageUrl: "https://images.unsplash.com/photo-1583334547926-d71d37b4260d",
        specifications: { "Type": "Crate", "Material": "Plastic" },
        features: ["Stackable", "Ventilated"]
      },
      {
        name: "Farm Packaging Twine",
        description: "Strong twine for agricultural packaging and farm use.",
        category: "Agricultural Equipment",
        imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f",
        specifications: { "Type": "Twine" },
        features: ["High Strength", "Weather Resistant"]
      },
      // ✅ Office & Cleaning Equipment
      {
        name: "Cleaning Chemicals Range",
        description: "Industrial grade cleaning chemicals for business and factory use.",
        category: "Office & Cleaning Equipment",
        imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
        specifications: { "Type": "Chemicals", "Size": "Various" },
        features: ["Industrial Strength", "Effective"]
      },
      {
        name: "Office Supplies",
        description: "General office supplies and stationery for administrative needs.",
        category: "Office & Cleaning Equipment",
        imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
        specifications: { "Type": "Admin Supplies" },
        features: ["Reliable", "Essential"]
      }
    ];





    for (const product of seedProducts) {
      await storage.createProduct(product);
    }
    console.log("Seeded database with products");
  }
}
