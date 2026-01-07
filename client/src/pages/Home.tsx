import { Link } from "wouter";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Box, Recycle, Package, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/use-products";

export default function Home() {
  const { data: products } = useProducts();
  const featuredProducts = products?.slice(0, 4) || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80" 
            alt="Warehouse" 
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="bg-primary/20 backdrop-blur-sm border border-white/10 p-6 rounded-sm mb-8 inline-block">
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-4">
                Your Ultimate <br/>
                Packaging Partner
              </h1>
              <p className="text-xl md:text-2xl font-medium text-gray-200">
                TOP QUALITY PACKAGING AND WORKWEAR SOLUTIONS FOR YOU.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white border-none rounded-none px-8">
                  <Package className="mr-2 h-5 w-5" /> PRODUCTS
                </Button>
              </Link>
              <a href="https://apex.w-o-s.co.za" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-none px-8">
                  <Phone className="mr-2 h-5 w-5" /> WOS APEX
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold mb-2 uppercase tracking-widest">Main Categories</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/products?category=Bags" className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                <img src="https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&q=80" alt="Packaging" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-6 left-6 text-white text-xl font-bold">Packaging Material</div>
              </div>
            </Link>
            <Link href="/products?category=Safety" className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                <img src="https://images.unsplash.com/photo-1590486803833-ffc6de271560?w=800&q=80" alt="Safety" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-6 left-6 text-white text-xl font-bold">Safety Equipment</div>
              </div>
            </Link>
            <Link href="/products?category=Clothing" className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80" alt="Clothing" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-6 left-6 text-white text-xl font-bold">Work Clothing</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">High-performance solutions for every industry.</p>
            </div>
            <Link href="/products" className="hidden md:flex items-center text-primary font-medium hover:underline">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.length > 0 ? featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group block">
                <div className="bg-secondary rounded-lg overflow-hidden aspect-[4/5] mb-4 relative">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </Link>
            )) : (
              // Empty state skeletons
              [1,2,3,4].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-secondary aspect-[4/5] rounded-lg mb-4" />
                  <div className="h-6 bg-secondary w-2/3 rounded mb-2" />
                  <div className="h-4 bg-secondary w-1/3 rounded" />
                </div>
              ))
            )}
          </div>
          
          <div className="mt-8 md:hidden text-center">
            <Link href="/products" className="inline-flex items-center text-primary font-medium hover:underline">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section id="sustainability" className="py-24 bg-zinc-50 border-y">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 text-green-600 font-bold mb-4">
                <Recycle className="h-5 w-5" />
                <span>SUSTAINABILITY FIRST</span>
              </div>
              <h2 className="text-4xl font-display font-bold mb-6">
                Eco-Friendly By Design
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe industrial strength doesn't have to come at an environmental cost. 
                Our packaging solutions utilize high-percentage recycled content and are 
                fully recyclable.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-green-600" />
                  <span>FSC® Certified Materials Available</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-green-600" />
                  <span>Water-based, non-toxic inks</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-green-600" />
                  <span>Closed-loop recycling programs</span>
                </li>
              </ul>
              <Link href="/products">
                <Button variant="outline">Browse Eco Options</Button>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-green-100 rounded-xl transform rotate-3" />
              {/* Unsplash: Recycling/Kraft Paper */}
              <img 
                src="https://images.unsplash.com/photo-1606297893963-c31a7f052445?w=800&q=80" 
                alt="Sustainable Materials" 
                className="relative rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CALLOUT */}
      <section id="contact" className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to upgrade your packaging?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Get a custom quote today. Our engineering team is ready to solve your toughest challenges.
          </p>
          <Link href="/products">
            <Button size="lg" variant="industrial" className="bg-white text-primary border-white hover:bg-transparent hover:text-white">
              Start Your Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
