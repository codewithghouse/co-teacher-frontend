import { Link } from "react-router-dom";
import { Twitter, Linkedin, Facebook, Instagram, Mail } from "lucide-react";
import { Logo } from "@/components/common/Logo";

const Footer = () => {
  return (
    <footer className="bg-[#111827] pt-24 pb-12 text-slate-400">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          <div className="col-span-1 xs:col-span-2 md:col-span-2 space-y-8">
            <Link to="/" className="flex items-center gap-2 group">
              <Logo className="w-12 h-12 bg-[#1A3263] rounded-2xl shadow-2xl p-2 transition-transform group-hover:scale-110" />
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                AI Co-teacher
              </span>
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm font-medium">
              Empowering educators worldwide with ethical AI tools to simplify teaching and inspire learning.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#1A3263] hover:border-[#1A3263] transition-all duration-300 shadow-sm"
                  aria-label={`Social Media ${i}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="xs:col-span-1">
            <h4 className="font-bold text-white mb-6 uppercase tracking-[0.2em] text-[10px]">Product</h4>
            <ul className="space-y-4 font-semibold text-sm">
              <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/app/lesson-plans" className="hover:text-white transition-colors">Lesson Planner</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">School Solutions</a></li>
            </ul>
          </div>

          <div className="xs:col-span-1">
            <h4 className="font-bold text-white mb-6 uppercase tracking-[0.2em] text-[10px]">Company</h4>
            <ul className="space-y-4 font-semibold text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div className="xs:col-span-1">
            <h4 className="font-bold text-white mb-6 uppercase tracking-[0.2em] text-[10px]">Legal</h4>
            <ul className="space-y-4 font-semibold text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-blue-100 font-bold text-sm">© 2024 AI Co-teacher. All rights reserved.</p>
          <p className="text-blue-100 font-bold text-sm italic">Built for teachers, by teachers ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
