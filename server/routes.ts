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
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_6506df1898516.jpg",
        specifications: { "Type": "Local", "Color": "Black", "Material": "Reinforced Wood/Plastic" },
        features: ["Local Transport", "Heavy Duty"]
      },
      {
        name: "Blue Block Local Pallet",
        description: "Durable blue block pallet for local supply chain operations.",
        category: "Packaging Material",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_6506df278da08.jpg",
        specifications: { "Type": "Local", "Color": "Blue", "Material": "Reinforced Wood/Plastic" },
        features: ["Color Coded", "Industrial Strength"]
      },
      {
        name: "Paper Cores",
        description: "High-strength paper cores for industrial winding and packaging applications.",
        category: "Packaging Material",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_6501a357eb453.jpg",
        specifications: { "Material": "Industrial Paper", "Type": "Core" },
        features: ["Durable", "Recyclable"]
      },
      {
        name: "Angle Board",
        description: "Protective angle boards for pallet edge protection and load stability.",
        category: "Packaging Material",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_6501a44e532a4.jpg",
        specifications: { "Type": "Edge Protection" },
        features: ["Stacking Strength", "Load Stability"]
      },
      {
        name: "Polypropylene Strapping",
        description: "High-tensile PP strapping for secure pallet bundling and carton sealing.",
        category: "Packaging Material",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_6502af17c7621.jpg",
        specifications: { "Material": "Polypropylene", "Type": "Strapping" },
        features: ["High Tensile", "Weather Resistant"]
      },
      {
        name: "Bulk Bins",
        description: "Large capacity bulk bins for agricultural and industrial storage.",
        category: "Packaging Material",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_65019d5e751eb.jpg",
        specifications: { "Type": "Bulk Storage" },
        features: ["Stackable", "Heavy Duty"]
      },
      {
        name: "9kg Gen Jumblekraft (2 col)",
        description: "A kraft-colored, 2-column jumble box, designed for 9kg of produce.",
        category: "Packaging Material",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_6502ade40774a.jpg",
        specifications: { "Capacity": "9kg", "Color": "Kraft", "Columns": "2" },
        features: ["Produce Packaging", "Breathable"]
      },
      {
        name: "MK9 Gen Jumble White (4 col)",
        description: "A white, 4-column jumble box, likely for larger produce like apples or pears.",
        category: "Packaging Material",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_6502ad75c2e15.jpg",
        specifications: { "Capacity": "9kg+", "Color": "White", "Columns": "4" },
        features: ["Premium Finish", "Large Capacity"]
      },
      {
        name: "MK4 E/V Gen Outer White (4 col)",
        description: "A white, 4-column outer box for E/V (Export/Import) purposes.",
        category: "Packaging Material",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_6502add73318d.jpg",
        specifications: { "Type": "Outer Box", "Color": "White", "Purpose": "E/V" },
        features: ["Export Grade", "High Visibility"]
      },

      // 🦺 2. SAFETY EQUIPMENT
      {
        name: "Industrial Hard Hats",
        description: "High-quality hard hats designed to meet industry safety standards.",
        category: "Safety Equipment",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_6506e78864708.jpg",
        specifications: { "Standard": "SABS Approved", "Type": "Head Protection" },
        features: ["Impact Resistant", "Adjustable Fit"]
      },
      {
        name: "Safety Gloves Range",
        description: "Comprehensive range of industrial gloves for various applications.",
        category: "Safety Equipment",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_6506ec5192138.jpg",
        specifications: { "Type": "Hand Protection" },
        features: ["High Grip", "Durable"]
      },
      {
        name: "Respiratory Protection",
        description: "Safety masks and respirators for industrial environments.",
        category: "Safety Equipment",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_6506ef2597401.jpg",
        specifications: { "Type": "Mask", "Protection": "N95/FFP2" },
        features: ["Breathable", "Secure Fit"]
      },
      {
        name: "Interceptor Askari Lo II Smooth",
        description: "Low-cut smooth finish safety shoe designed for comfort and professional appearance.",
        category: "Safety Equipment",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_6506e2325f6e5.jpg",
        specifications: { "Brand": "Interceptor", "Style": "Lo II Smooth" },
        features: ["Steel Toe", "Anti-slip"]
      },
      {
        name: "Yield Hi-Viz Reflective Bandana",
        description: "High-visibility reflective bandana for maximum safety.",
        category: "Safety Equipment",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_6506f233486be.jpg",
        specifications: { "Brand": "Yield", "Type": "Reflective" },
        features: ["High Viz", "Lightweight"]
      },

      // 👕 3. WORK / PROMOTIONAL CLOTHING
      {
        name: "Men's Branded Polo",
        description: "Professional men's polo shirt, perfect for branding.",
        category: "Work/Promotional Clothing",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_650742f10b77c.jpg",
        specifications: { "Gender": "Men", "Type": "Polo" },
        features: ["Branding Ready", "Comfortable Fit"]
      },
      {
        name: "Women's Branded Polo",
        description: "Tailored women's polo shirt for corporate identity.",
        category: "Work/Promotional Clothing",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_65074167e43da.jpg",
        specifications: { "Gender": "Women", "Type": "Polo" },
        features: ["Branding Ready", "Tailored"]
      },
      {
        name: "Industrial Overalls",
        description: "Heavy-duty work overalls for industrial use.",
        category: "Work/Promotional Clothing",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_650743b14643f.jpg",
        specifications: { "Type": "Overall", "Durability": "High" },
        features: ["Reinforced Stitched", "Multiple Pockets"]
      },

      // 🧹 4. OFFICE & CLEANING EQUIPMENT
      {
        name: "Industrial Cleaning Chemicals",
        description: "High-strength cleaning chemicals for industrial environments.",
        category: "Office & Cleaning Equipment",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_65070243e8519.jpg",
        specifications: { "Type": "Chemicals", "Size": "5L/25L" },
        features: ["Heavy Duty", "Concentrated"]
      },
      {
        name: "Office Supplies Bundle",
        description: "Essential office supplies for administrative needs.",
        category: "Office & Cleaning Equipment",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_650702d849206.jpg",
        specifications: { "Type": "Supplies" },
        features: ["Complete Set"]
      },

      // 🚜 5. AGRICULTURAL EQUIPMENT
      {
        name: "Produce Crates",
        description: "Durable crates for harvesting and transporting produce.",
        category: "Agricultural Equipment",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_65019d5e751eb.jpg",
        specifications: { "Type": "Crate", "Material": "Plastic" },
        features: ["Stackable", "Ventilated"]
      },
      {
        name: "Farm Packaging Twine",
        description: "Strong twine for agricultural packaging and farm use.",
        category: "Agricultural Equipment",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_6502af17c7621.jpg",
        specifications: { "Type": "Twine" },
        features: ["High Strength", "Weather Resistant"]
      },
      // ✅ Office & Cleaning Equipment (Additional)
      {
        name: "Cleaning Chemicals Range",
        description: "Industrial grade cleaning chemicals for business and factory use.",
        category: "Office & Cleaning Equipment",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_65070243e8519.jpg",
        specifications: { "Type": "Chemicals", "Size": "Various" },
        features: ["Industrial Strength", "Effective"]
      },
      {
        name: "Office Supplies",
        description: "General office supplies and stationery for administrative needs.",
        category: "Office & Cleaning Equipment",
        imageUrl: "https://files.cdn-files-a.com/uploads/7752700/800_650702d849206.jpg",
        specifications: { "Type": "Admin Supplies" },
        features: ["Reliable", "Essential"]
      }
    ];





    for (const product of seedProducts) {
      await storage.createProduct({
        ...product,
        specifications: product.specifications as Record<string, string>
      });
    }
    console.log("Seeded database with products");
  }
}
