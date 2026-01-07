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
        name: "Woven Polypropylene Sacks",
        description: "Strong, durable woven bags for bulk storage and transport of grains, fertilizers, and building materials. UV stabilized for long-term outdoor storage.",
        category: "Bags",
        imageUrl: "https://images.unsplash.com/photo-1595246140625-573b715d11dc",
        specifications: {
          "Material": "UV Stabilized Polypropylene",
          "Strength": "High-tensile woven fabric",
          "Dimensions": "Custom sizes available",
          "Print": "BOPP or Flexo printing"
        },
        features: ["Tear Resistant", "Breathable", "Reusable"]
      },
      {
        name: "Bulk Bags (FIBC)",
        description: "Flexible Intermediate Bulk Containers (FIBC) for industrial-scale transport of dry, flowable products. Certified for safe handling and stackability.",
        category: "Bags",
        imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
        specifications: {
          "Material": "Heavy-duty Woven PP",
          "SWL": "500kg - 2000kg",
          "Safety Factor": "5:1 or 6:1",
          "Loops": "4 Standard Lifting Loops"
        },
        features: ["U-Panel Construction", "Dust Proof Seams", "Liner Available"]
      },
      {
        name: "BOPP Laminated Bags",
        description: "High-gloss, photographic quality printed bags for retail packaging. Provides excellent moisture barrier and superior shelf appeal.",
        category: "Bags",
        imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363",
        specifications: {
          "Material": "BOPP Laminated Woven PP",
          "Printing": "Reverse Rotogravure",
          "Finish": "Gloss or Matte",
          "Capacity": "5kg - 50kg"
        },
        features: ["Waterproof", "Vibrant Graphics", "Puncture Resistant"]
      },
      {
        name: "Potato & Fruit Mesh Bags",
        description: "Leno mesh bags providing maximum ventilation for fresh produce. Soft but strong enough to handle weight without bruising content.",
        category: "Mesh",
        imageUrl: "https://images.unsplash.com/photo-1518843875459-f738682238a6",
        specifications: {
          "Material": "Polyethylene (HDPE)",
          "Type": "Leno Mesh",
          "Capacity": "2kg - 25kg",
          "Colors": "Red, Orange, Yellow, Purple"
        },
        features: ["Highly Breathable", "Drawstring Closure", "Lightweight"]
      },
      {
        name: "Agricultural Shade Cloth",
        description: "Knitted HDPE fabric for crop protection and nursery use. Provides consistent shade percentages and wind protection.",
        category: "Materials",
        imageUrl: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea",
        specifications: {
          "Material": "HDPE Monofilament",
          "Shade %": "20% - 80%",
          "UV Life": "5+ years",
          "Width": "1.5m - 6m"
        },
        features: ["UV Resistant", "Fray Proof", "Temperature Control"]
      },
      {
        name: "Pallet Wrap & Shrink Film",
        description: "Industrial strength pallet wrap for securing loads. High clarity for easy barcode scanning and superior cling properties.",
        category: "Materials",
        imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f",
        specifications: {
          "Material": "LLDPE",
          "Thickness": "17mic - 25mic",
          "Width": "450mm - 500mm",
          "Stretch": "Up to 300%"
        },
        features: ["Silent Unwind", "High Clarity", "Puncture Resistant"]
      }
    ];

    for (const product of seedProducts) {
      await storage.createProduct(product);
    }
    console.log("Seeded database with products");
  }
}
