import { Link, useLocation } from "wouter";
import { Button } from "./ui/Button";
import { Menu, X, Package } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

import logoImg from "@assets/screenshot-1767873831635.png";

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img 
            src={logoImg} 
            alt="W.O.S Packaging" 
            className="h-10 w-auto mix-blend-screen"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={cn(
              "text-[10px] font-bold tracking-widest transition-colors hover:text-primary uppercase",
              location === link.href ? "text-primary" : "text-white"
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
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/90 p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-sm font-bold tracking-widest text-white p-2 hover:bg-white/10 rounded-none uppercase"
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
