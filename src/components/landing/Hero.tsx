import { Search, Sparkles } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ScrollingShowcase } from "./ScrollingShowcase";

const Hero = () => {
  const navigate = useNavigate();

  const handleGenerate = () => {
    navigate("/for-teachers");
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#FFEDC7]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-slate-900">
          <h1 className="text-5xl md:text-7xl font-sans font-black leading-[1.1] mb-8">
            Plan Less, <span className="text-[#F97316] italic relative inline-block">Teach More <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#F97316] -skew-x-12 transform"></span></span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed text-slate-800 font-medium tracking-tight">
            Instantly generate curriculum-aligned lesson plans, quizzes, and worksheets tailored to your classroom.
          </p>

          <div className="flex justify-center relative z-20">
            <button
              className="bg-white hover:bg-gray-100 text-black rounded-full px-12 h-16 flex items-center justify-center gap-3 font-bold text-xl shadow-2xl hover:scale-105 transition-all border-4 border-white/20"
              onClick={handleGenerate}
            >
              <Sparkles className="w-6 h-6" />
              Generate Resources
            </button>
          </div>



          <div className="-mt-8 relative z-10 pointer-events-none select-none">
            <ScrollingShowcase />
          </div>

          <p className="mt-4 text-base opacity-70 font-medium tracking-wide relative z-20 text-black">
            Try it free — No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};


export default Hero;
