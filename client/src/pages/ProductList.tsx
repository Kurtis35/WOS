import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useProducts } from "@/hooks/use-products";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, ArrowRight } from "lucide-react";

export default function ProductList() {
  const { data: products, isLoading } = useProducts();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    if (category) {
      setSelectedCategory(category);
    }
  }, []);

  // Extract unique categories
  const categories = [
    "Corrugated Cartons",
    "Packaging Bags",
    "Pallets",
    "Protection & Securing",
    "Industrial Consumables",
  ];
  const productOrder: Record<string, number> = {
    "9kg Jumble Cartons": 1,
    "6kg Jumble Cartons": 2,
    "7kg Jumble Cartons": 3,
    "MK4 Local Cartons": 4,
    "Econo EV Cartons": 5,
    "Bulk Bins": 6,

    "Econo 1kg Bag": 1,
    "Econo 1.5kg Bag": 2,
    "Econo 3kg Bag": 3,
    "MK4 Green Bag": 4,
    "MK4 Red Bag": 5,
    "MK6 Green Bag": 6,

    "Black Block Pallet": 1,
    "White Block Pallet": 2,
    "Black Block Export Pallet": 3,
    "White Block Export Pallet": 4,
    "Green Block Export Pallet": 5,
    "Blue Block Export Pallet": 6,

    "Angle Board": 1,
    "Polypropylene Strapping": 2,
    Buckles: 3,
    "Shrink Wrap": 4,
    "Farm Packaging Twine": 5,

    "Paper Cores": 1,
    "Clean Melt Glue": 2,
    "Slugs Glue": 3,
  };
  const filteredProducts = products
    ?.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const orderA = productOrder[a.name] ?? 999;
      const orderB = productOrder[b.name] ?? 999;
      return orderA - orderB;
    });
  const groupedProducts = filteredProducts?.reduce(
    (groups: Record<string, any[]>, product) => {
      const group = product.subcategory || "Other";

      if (!groups[group]) {
        groups[group] = [];
      }

      groups[group].push(product);

      return groups;
    },
    {}
  );

  return (
    <div className="container mx-auto px-4 py-12 pt-28">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">Our Products</h1>
          <p className="text-muted-foreground">
            Industrial grade packaging for every application.
          </p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
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
              {categories.map((category) => (
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
          {filteredProducts && filteredProducts.length > 0 ? (
            <div className="space-y-12">
              Object.entries(groupedProducts ?? {}).map(
                ([groupName, products]) => (
                  <div key={groupName}>
                    <h2 className="text-2xl font-bold mb-6 border-b pb-2">
                      {groupName}
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products.map((product: any) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          className="group block h-full"
                        >
                          <div className="border rounded-lg p-4 h-full hover:border-accent transition-colors bg-card hover:shadow-lg flex flex-col">
                            <div className="aspect-square bg-white rounded-md overflow-hidden mb-4 relative flex items-center justify-center p-2">
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                loading="lazy"
                                decoding="async"
                                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
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
                              <span className="text-sm font-medium text-primary flex items-center group-hover:underline">
                                View Details
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
                    
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <h3 className="text-lg font-medium text-muted-foreground">
                No products found
              </h3>
              <Button
                variant="link"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory(null);
                }}
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
