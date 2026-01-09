export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  specifications: Record<string, string>;
  features: string[];
}

export interface QuoteRequest {
  id: number;
  productId: number;
  customerName: string;
  customerEmail: string;
  quantity: number;
  message?: string;
}
