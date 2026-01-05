import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertQuoteRequest } from "@shared/routes";

export function useCreateQuote() {
  return useMutation({
    mutationFn: async (data: InsertQuoteRequest) => {
      const res = await fetch(api.quotes.create.path, {
        method: api.quotes.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.quotes.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit quote request");
      }
      
      return api.quotes.create.responses[201].parse(await res.json());
    },
  });
}
