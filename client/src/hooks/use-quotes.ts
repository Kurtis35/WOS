import { useMutation } from "@tanstack/react-query";

export function useCreateQuote() {
  return useMutation({
    mutationFn: async (data: { productId: number; customerName: string; customerEmail: string; quantity: number; message?: string }) => {
      // For frontend-only, we handle quotes via mailto links in the UI components
      // This hook remains as a placeholder or can be used for local logging
      console.log("Quote request (static):", data);
      
      // Simulate success
      return { success: true, message: "Quote request simulated locally" };
    },
  });
}
