import { Link } from "wouter";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Box, Recycle, Package, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProducts } from "@/hooks/use-products";
import { useState, useEffect } from "react";

// Slide show images
import hero1 from "@assets/WhatsApp_Image_2026-01-09_at_10.57.27_AM_1767949567780.jpeg";
import hero2 from "@assets/WhatsApp_Image_2026-01-09_at_11.12.57_AM_(1)_1767950295118.jpeg";
import hero3 from "@assets/WhatsApp_Image_2026-01-09_at_10.38.58_AM_(1)_1767950295120.jpeg";
import hero4 from "@assets/WhatsApp_Image_2026-01-09_at_10.38.58_AM_1767950295121.jpeg";

const slides = [hero1, hero2, hero3, hero4];

export default function Home() {
  const { data: products } = useProducts();
  const featuredProducts = products?.slice(0, 4) || [];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* HERO SECTION */}
      <section className="relative h-[400px] md:h-[500px] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={slides[currentSlide]}
              alt="Packaging Solution"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-full h-full object-contain brightness-75"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="bg-primary/20 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-sm mb-8 inline-block">
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-4">
                Your Ultimate <br className="hidden md:block"/>
                Packaging Partner
              </h1>
              <p className="text-lg md:text-2xl font-medium text-gray-200">
                TOP QUALITY PACKAGING AND WORKWEAR SOLUTIONS FOR YOU.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white border-none rounded-none px-8 py-6 text-sm font-bold">
                  <Package className="mr-2 h-5 w-5" /> VIEW PRODUCTS
                </Button>
              </Link>
              <Link href="/apex">
                <Button size="lg" variant="default" className="w-full sm:w-auto bg-[#00529B] hover:bg-[#003D73] text-white border-none rounded-none px-8 py-6 text-sm font-bold">
                  <Phone className="mr-2 h-5 w-5" /> WOS APEX
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold mb-2 uppercase tracking-widest">Main Categories</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/products?category=Curragated+Boxes/Cartons" className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                <img src="https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&q=80" alt="Boxes" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-6 left-6 text-white text-xl font-bold">Curragated Boxes</div>
              </div>
            </Link>
            <Link href="/products?category=Bags" className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80" alt="Bags" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-6 left-6 text-white text-xl font-bold">Bags</div>
              </div>
            </Link>
            <Link href="/products?category=Securing+%26+Protection" className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                <img src="https://images.unsplash.com/photo-1590486803833-ffc6de271560?w=800&q=80" alt="Protection" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-6 left-6 text-white text-xl font-bold">Securing & Protection</div>
              </div>
            </Link>
            <Link href="/products?category=Custom+Solutions" className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80" alt="Custom" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-6 left-6 text-white text-xl font-bold">Custom Solutions</div>
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

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6 uppercase tracking-widest">About WOS Packaging</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8" />
            <p className="text-lg text-muted-foreground mb-6">
              WOS Packaging- a Trading company of White Operating Solutions (pty) ltd in the Western Cape, South Africa.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              WOS is a family owned company, started in 2020 in the packaging industry, as well as factory and workwear clothing. The two departments has since then split up.
            </p>
            <div className="flex flex-col gap-2 mb-8 font-bold text-primary">
              <p>WOS Packaging/Pakmateriaal</p>
              <p>WOS APEX (Clothing, Workwear, Branding & Gifting)</p>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              We care deeply about providing excellent service here at WOS, especially to our fellow businesses in the agricultural sector as well the manufacturing sector.
            </p>
            <p className="text-lg font-medium text-primary italic">
              We love special relationships with suppliers and clients, and we're always just one message away.
            </p>
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

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-zinc-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold mb-2 text-center uppercase tracking-widest">Contact Us</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-16" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/20 p-4 rounded-full mb-6">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-4 text-white">Call Us</h3>
              <div className="space-y-2">
                <a href="tel:+27833206499" className="block text-gray-400 hover:text-white transition-colors">
                  +27 083 320 6499 (Chris)
                </a>
                <a href="tel:+27760355295" className="block text-gray-400 hover:text-white transition-colors">
                  +27 076 035 5295 (Jaun)
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/20 p-4 rounded-full mb-6">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-4 text-white">Email Us</h3>
              <a href="mailto:info@w-o-s.co.za" className="text-gray-400 hover:text-white transition-colors">
                info@w-o-s.co.za
              </a>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/20 p-4 rounded-full mb-6">
                <ArrowRight className="h-6 w-6 text-primary rotate-45" />
              </div>
              <h3 className="font-bold text-xl mb-4 text-white">Location</h3>
              <p className="text-gray-400">
                16 Industrial Road, Grabouw,<br />
                Western Cape, South Africa, 7160
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/20 p-4 rounded-full mb-6">
                <Recycle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-4 text-white">Business Hours</h3>
              <p className="text-gray-400">
                Mon - Fri: 08:00 - 16:00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CALLOUT */}
      <section id="contact-footer" className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight uppercase">Ready to upgrade your packaging?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Get a custom quote today. Our engineering team is ready to solve your toughest challenges.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products">
              <Button size="lg" className="bg-white text-primary border-none hover:bg-white/90 rounded-none px-10 font-bold uppercase tracking-widest">
                Start Your Quote
              </Button>
            </Link>
            <Link href="/apex">
              <Button size="lg" variant="default" className="bg-[#00529B] hover:bg-[#003D73] text-white border-none rounded-none px-10 font-bold uppercase tracking-widest">
                WOS APEX
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
