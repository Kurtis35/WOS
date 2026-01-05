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
      {
        name: "Corrugated Shipping Box",
        description: "Heavy-duty double-wall corrugated boxes ideal for shipping industrial parts and equipment. Customizable dimensions and strength ratings.",
        category: "Boxes",
        imageUrl: "https://images.unsplash.com/photo-1583334547926-d71d37b4260d",
        specifications: {
          "Material": "Double-wall corrugated cardboard",
          "Strength": "ECT-44",
          "Dimensions": "Custom",
          "Print": "Flexographic up to 3 colors"
        },
        features: ["Recyclable", "Heavy Duty", "Stackable"]
      },
      {
        name: "Industrial Kraft Paper Bag",
        description: "Multi-wall kraft paper bags designed for bulk materials like cement, flour, and chemicals. Moisture resistant options available.",
        category: "Bags",
        imageUrl: "https://images.unsplash.com/photo-1605634691459-0a562499d349",
        specifications: {
          "Material": "Virgin Kraft Paper",
          "Ply": "2-4 ply",
          "Capacity": "25kg - 50kg",
          "Valve": "Internal sleeve valve"
        },
        features: ["Tear Resistant", "Biodegradable", "Food Grade Available"]
      },
      {
        name: "Industrial Stretch Film",
        description: "High-performance stretch film for palletizing and securing loads. Excellent puncture resistance and load retention.",
        category: "Materials",
        imageUrl: "https://images.unsplash.com/photo-1628135805779-78096f9c9432",
        specifications: {
          "Gauge": "80 gauge",
          "Width": "18 inches",
          "Length": "1500 feet",
          "Type": "Cast Stretch Film"
        },
        features: ["Clear Transparency", "High Elongation", "Quiet Unwind"]
      },
      {
        name: "Custom Printed Mailer",
        description: "Branded mailer boxes for e-commerce and subscription boxes. High-quality print finish to enhance unboxing experience.",
        category: "Custom",
        imageUrl: "https://images.unsplash.com/photo-1628608823528-7694f475d400",
        specifications: {
          "Material": "E-flute corrugated",
          "Print": "Digital or Offset",
          "Finish": "Matte or Gloss",
          "MOQ": "500 units"
        },
        features: ["Self-locking", "Full Color Print", "Eco-friendly Ink"]
      },
       {
        name: "Heavy Duty Wooden Crate",
        description: "Custom built wooden crates for export and heavy machinery. ISPM-15 certified for international shipping.",
        category: "Boxes",
        imageUrl: "https://images.unsplash.com/photo-1585644198038-164406208a3d",
        specifications: {
          "Material": "Heat-treated Pine",
          "Certification": "ISPM-15",
          "Load Capacity": "Up to 5000kg",
          "Assembly": "Nailed or Screwed"
        },
        features: ["Export Ready", "Reusable", "Forklift Access"]
      },
       {
        name: "Protective Bubble Wrap",
        description: "Air-cushioned bubble wrap for protecting fragile items during transit. Available in rolls or sheets.",
        category: "Materials",
        imageUrl: "https://images.unsplash.com/photo-1595079676614-7935c11d87e1",
        specifications: {
          "Bubble Size": "10mm (Small) or 25mm (Large)",
          "Roll Width": "300mm - 1500mm",
          "Material": "LDPE",
          "Anti-static": "Available"
        },
        features: ["Lightweight", "Shock Absorbing", "Flexible"]
      }
    ];

    for (const product of seedProducts) {
      await storage.createProduct(product);
    }
    console.log("Seeded database with products");
  }
}
