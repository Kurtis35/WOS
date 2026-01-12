import { Package } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16 border-t border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 text-white">
              <div className="bg-white text-black p-1.5 rounded-sm">
                <Package className="h-6 w-6" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight uppercase">
                WOS
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Industrial packaging solutions engineered for performance and sustainability.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-white transition-colors">Corrugated Boxes</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Protective Mailers</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Tape & Adhesives</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Custom Printing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Bakenshoogte Ind Pk</li>
              <li>Bot River, 7185</li>
              <li className="pt-2">info@w-o-s.co.za</li>
              <li>+27 083 320 6499</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} WOS Packaging Solutions. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
