import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateQuote } from "@/hooks/use-quotes";
import { Button } from "./ui/Button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { z } from "zod";

const quoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Company is required"),
  email: z.string().email("Invalid email address"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  message: z.string().optional(),
  productId: z.number().optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

interface QuoteFormProps {
  productId?: number;
  productName?: string;
  className?: string;
}

export function QuoteForm({ productId, productName, className }: QuoteFormProps) {
  const { toast } = useToast();
  const createQuote = useCreateQuote();

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      quantity: 100,
      message: productId ? `I am interested in a quote for ${productName}.` : "",
      productId: productId || undefined,
    },
  });

  const onSubmit = (data: QuoteFormValues) => {
    // For pure frontend, we use mailto
    const subject = encodeURIComponent(`Quote Request: ${productName || "General Inquiry"}`);
    const body = encodeURIComponent(
      `Customer Name: ${data.name}\n` +
      `Company: ${data.company}\n` +
      `Customer Email: ${data.email}\n` +
      `Product: ${productName || "Not Specified"}\n` +
      `Quantity: ${data.quantity}\n\n` +
      `Message:\n${data.message || "No message provided."}`
    );
    
    window.location.href = `mailto:info@w-o-s.co.za?subject=${subject}&body=${body}`;
    
    createQuote.mutate(data as any, {
      onSuccess: () => {
        toast({
          title: "Opening Email Client",
          description: "Your default email client will open with the quote request details.",
        });
        form.reset();
      },
    });
  };

  return (
    <div className={className}>
      <h3 className="font-display text-2xl font-bold mb-6">Request a Quote</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@acme.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Details</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your specific packaging needs, dimensions, or branding requirements..." 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={createQuote.isPending}
          >
            {createQuote.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Quote Request"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
