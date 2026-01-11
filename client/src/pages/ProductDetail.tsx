import { useRoute, Link } from "wouter";
import { useProduct } from "@/hooks/use-products";
import { Button } from "@/components/ui/Button";
import { QuoteForm } from "@/components/QuoteForm";
import { ArrowLeft, Check, FileCheck, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ProductDetail() {
  const [match, params] = useRoute("/products/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: product, isLoading, isError } = useProduct(id);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link href="/products">
          <Button>Return to Catalog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 pt-16">
      {/* Breadcrumb / Back */}
      <div className="border-b bg-white/50 backdrop-blur-sm sticky top-20 z-10">
        <div className="container mx-auto px-4 h-12 flex items-center">
          <Link href="/products" className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center">
            <ArrowLeft className="h-3 w-3 mr-2" /> Back to Catalog
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Image */}
          <div className="space-y-8">
            <div className="aspect-square bg-secondary rounded-xl overflow-hidden border">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover mix-blend-multiply"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80";
                }}
              />
            </div>
            
            <div className="bg-card border rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-accent" /> Specifications
              </h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-sm text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Content & Form */}
          <div>
            <div className="mb-2">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest">
                {product.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-primary">
              {product.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>

            {product.features && (
              <div className="mb-10">
                <h3 className="font-bold text-lg mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 bg-primary/10 p-0.5 rounded-full text-primary">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator className="my-10" />

            <div id="quote-form" className="bg-zinc-50 border rounded-xl p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3 text-primary">
                 <FileCheck className="h-6 w-6" />
                 <h2 className="text-2xl font-display font-bold">Request Pricing</h2>
              </div>
              <p className="text-muted-foreground mb-6 text-sm">
                Fill out the form below to receive a custom quote for {product.name}. 
                Bulk discounts available for orders over 1000 units.
              </p>
              
              <QuoteForm productId={product.id} productName={product.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
