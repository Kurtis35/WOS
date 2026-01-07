import { Link, useLocation } from "wouter";
import { Button } from "./ui/Button";
import { Menu, X, Package } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    // Only scroll anchors on home page usually, but for simplicity let's route to home
    { href: "/#process", label: "Process" },
    { href: "/#sustainability", label: "Sustainability" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <img 
            src="https://files.cdn-files-a.com/uploads/7752700/400_filter_nobg_6953aaf5489bb.png" 
            alt="W.O.S Packaging" 
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={cn(
              "text-sm font-medium transition-colors hover:text-accent",
              location === link.href ? "text-primary font-bold" : "text-muted-foreground"
            )}>
              {link.label}
            </Link>
          ))}
          <Link href="/products">
             <Button variant="industrial" size="sm">
               Request Quote
             </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t bg-background p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-lg font-medium p-2 hover:bg-secondary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/products" onClick={() => setIsOpen(false)}>
            <Button className="w-full mt-2">Request Quote</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
