import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/common/Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const isAuthenticated = !!user;

  const navLinks = [
    { name: "Teachers", href: "/for-teachers" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact us", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#296374] shadow-sm border-b border-white/80">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo className="w-10 h-10 bg-white/20 rounded-xl backdrop-blur-sm p-1" />
            <span className="font-display font-bold text-2xl text-white">
              AI Co-teacher
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard" className="bg-white hover:bg-gray-100 text-black rounded-lg px-6 py-2 font-bold shadow-lg shadow-black/10">Go to Dashboard</Link>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-white/80 px-4 py-2 font-medium">Log In</Link>
                <Link to="/signup" className="bg-white hover:bg-gray-100 text-black rounded-lg px-6 py-2 font-bold shadow-lg shadow-black/10">Sign up free</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div >
      </div >

      {/* Mobile Menu */}
      {
        isOpen && (
          <div className="md:hidden bg-[#005461] border-t border-white/10 shadow-xl overflow-hidden">
            <div className="container mx-auto px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-base font-medium text-white/90 hover:text-white py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 space-y-3 border-t border-white/10">
                {isAuthenticated ? (
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block w-full text-center bg-white text-black rounded-lg py-3 font-bold">Go to Dashboard</Link>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center text-white py-2 font-medium">Log In</Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)} className="block w-full text-center bg-white text-black rounded-lg py-3 font-bold">Sign up free</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )
      }
    </nav >
  );
};

export default Navbar;
