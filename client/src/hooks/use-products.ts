import { useQuery } from "@tanstack/react-query";
import { products } from "@/lib/products";
import type { Product } from "@shared/schema";

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => {
      // Return static data instead of fetching from API
      return products as unknown as Product[];
    },
  });
}

export function useProduct(id: number) {
  return useQuery<Product>({
    queryKey: ["/api/products", id],
    queryFn: async () => {
      const product = products.find((p) => p.id === id);
      if (!product) throw new Error("Product not found");
      return product as unknown as Product;
    },
  });
}

export function useProductsByCategory(category: string) {
  return useQuery<Product[]>({
    queryKey: ["/api/products/category", category],
    queryFn: async () => {
      return products.filter(p => p.category === category) as unknown as Product[];
    },
    enabled: !!category,
  });
}
