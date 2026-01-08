import { Link, useLocation } from "wouter";
import { Button } from "./ui/Button";
import { Menu, X, Package } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/", label: "HOME" },
    { href: "/products", label: "STORE" },
    { href: "/products?category=Packaging+Material", label: "PACKAGING MATERIAL" },
    { href: "/products?category=Safety+Equipment", label: "SAFETY EQUIPMENT" },
    { href: "/products?category=Work/Promotional+Clothing", label: "CLOTHING" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 h-16">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img 
            src="https://files.cdn-files-a.com/uploads/7752700/400_filter_nobg_6953aaf5489bb.png" 
            alt="W.O.S Packaging" 
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={cn(
              "text-[10px] font-bold tracking-widest transition-colors hover:text-primary uppercase",
              location === link.href ? "text-primary" : "text-gray-600"
            )}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/products">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-none text-[10px] font-bold tracking-widest px-6 h-9">
              GET A QUOTE
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white p-4 flex flex-col gap-4 animate-in slide-in-from-top-2 shadow-lg">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-sm font-bold tracking-widest text-gray-800 p-2 hover:bg-gray-50 rounded-none uppercase"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
