import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, ArrowRight } from "lucide-react";

export default function WosApex() {
  const { data: products, isLoading } = useProducts();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter products for WOS APEX specifically if needed, 
  // but for now we follow the request to make it "same as Products"
  // If there's a specific "Apex" category, we could filter by it.
  
  const categories = products 
    ? Array.from(new Set(products.map(p => p.category))) 
    : [];

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12 pt-28">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">WOS APEX</h1>
          <p className="text-muted-foreground">High-performance industrial solutions and equipment.</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search Apex products..." 
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar Filters */}
        <div className="space-y-6">
          <div className="p-4 border rounded-lg bg-card">
            <div className="flex items-center gap-2 font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </div>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors ${
                  selectedCategory === null 
                    ? "bg-primary text-primary-foreground font-medium" 
                    : "hover:bg-secondary text-muted-foreground"
                }`}
              >
                All Categories
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors ${
                    selectedCategory === category 
                      ? "bg-primary text-primary-foreground font-medium" 
                      : "hover:bg-secondary text-muted-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-secondary aspect-square rounded-lg mb-3" />
                  <div className="h-6 bg-secondary w-3/4 rounded mb-2" />
                  <div className="h-4 bg-secondary w-1/2 rounded" />
                </div>
              ))}
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group block h-full">
                  <div className="border rounded-lg p-4 h-full hover:border-accent transition-colors bg-card hover:shadow-lg flex flex-col">
                    <div className="aspect-square bg-secondary rounded-md overflow-hidden mb-4 relative">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="mb-2">
                      <span className="text-xs font-bold text-accent uppercase tracking-wider">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
                      {product.description}
                    </p>
                    <div className="mt-auto pt-4 border-t">
                       {/* WOS APEX items link to external or specific detail if needed */}
                       <span className="text-sm font-medium text-primary flex items-center group-hover:underline cursor-pointer">
                        Request Quote <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <h3 className="text-lg font-medium text-muted-foreground">No Apex products found</h3>
              <Button 
                variant="link" 
                onClick={() => { setSearch(""); setSelectedCategory(null); }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
