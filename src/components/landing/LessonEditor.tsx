import { motion } from "framer-motion";
import {
    Edit3,
    Sparkles,
    AlignLeft,
    Bold,
    Italic,
    List,
    Undo,
    Redo,
    Type,
    Image,
    Grid,
    HelpCircle,
    Maximize2,
    Minimize2,
    Wand2,
    Check
} from "lucide-react";

const LessonEditor = () => {
    return (
        <section className="py-24 bg-[#F0FFDF] overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Content */}
                    <div className="flex-1 max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-amber-500 font-bold text-lg mb-4 tracking-wide uppercase">
                                Full Control
                            </h3>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
                                Edit and refine <br />
                                <span className="text-[#1E56A0]">until it's perfect</span>
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                The AI gets you 90% of the way there. You take it to the finish line.
                                Use our powerful rich text editor to tweak content, or use AI shortcuts
                                to instantly simplify, expand, or translate specific sections.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                                        <Wand2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">AI Shortcuts</h4>
                                        <p className="text-sm text-slate-500">"Make shorter", "Simplify for Grade 5", "Translate to Spanish"</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                                        <Edit3 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Rich Text Editing</h4>
                                        <p className="text-sm text-slate-500">Full control over formatting, lists, and structure.</p>
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    </div>

                    {/* Right Visual - Editor Mockup */}
                    <div className="flex-1 w-full relative perspective-1000">
                        <motion.div
                            initial={{ opacity: 0, rotateY: -10, scale: 0.95 }}
                            whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="flex gap-4 items-center">
                                {/* Left Toolbar Strip (Mock) */}
                                <div className="hidden md:flex flex-col gap-6 bg-white rounded-full py-6 px-3 shadow-lg text-slate-400 items-center">
                                    <div className="space-y-4 border-b border-slate-100 pb-4">
                                        <div className="w-5 h-5 rounded hover:text-indigo-600 cursor-pointer"><Undo className="w-5 h-5" /></div>
                                        <div className="w-5 h-5 rounded hover:text-indigo-600 cursor-pointer"><Redo className="w-5 h-5" /></div>
                                    </div>
                                    <div className="space-y-6">
                                        <Type className="w-5 h-5 hover:text-indigo-600 cursor-pointer" />
                                        <Image className="w-5 h-5 hover:text-indigo-600 cursor-pointer" />
                                        <Grid className="w-5 h-5 hover:text-indigo-600 cursor-pointer" />
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-slate-100">
                                        <HelpCircle className="w-5 h-5 hover:text-indigo-600 cursor-pointer" />
                                    </div>
                                </div>

                                {/* Main Slide Area - 3 Column Layout */}
                                <div className="flex-1 bg-[#FDFBF7] aspect-auto md:aspect-[4/3] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative isolate p-8 flex flex-col md:flex-row items-center gap-6">

                                    {/* Left Col: Newton */}
                                    <div className="w-full md:w-1/3 shrink-0">
                                        <div className="w-full aspect-[3/4] bg-slate-900 rounded-lg overflow-hidden shadow-lg -rotate-2 border-4 border-white">
                                            <img
                                                src="/features/newton_portrait.png"
                                                alt="Isaac Newton"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Middle Col: Text */}
                                    <div className="flex-1 text-center md:text-left">
                                        <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 font-display leading-tight">
                                            The Moon's Gravity
                                        </h1>
                                        <div className="prose prose-slate prose-sm md:prose-base leading-relaxed text-slate-600">
                                            <p>
                                                The Moon's gravity is much weaker than Earth's. In fact, it is only about
                                                <span className="bg-indigo-100 text-indigo-800 px-1 rounded mx-1 font-bold">
                                                    one-sixth as strong
                                                </span>.
                                            </p>
                                            <p className="text-slate-500 mt-2">
                                                This means a 60kg person would weigh only 10kg on the lunar surface.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Col: Moon */}
                                    <div className="w-full md:w-1/3 shrink-0">
                                        <div className="w-full aspect-square bg-slate-100 rounded-lg overflow-hidden shadow-lg rotate-2 border-4 border-white mb-8 md:mb-0">
                                            <img
                                                src="/features/moon_gravity.png"
                                                alt="Astronaut on Moon"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Floating AI Popup - Centered */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] bg-white rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 p-1 z-20"
                                    >
                                        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-50 mb-1">
                                            <div className="flex items-center gap-2">
                                                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                                                <span className="font-bold text-sm text-slate-800">Edit slide</span>
                                            </div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                        </div>

                                        <div className="p-2 space-y-1">
                                            <div className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
                                                <div className="w-5 h-5 rounded bg-emerald-100 flex items-center justify-center text-emerald-600"><Wand2 className="w-3 h-3" /></div>
                                                <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">Simplify language</span>
                                            </div>
                                            <div className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
                                                <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center text-blue-600"><Maximize2 className="w-3 h-3" /></div>
                                                <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">Expand content</span>
                                            </div>
                                            <div className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
                                                <div className="w-5 h-5 rounded bg-amber-100 flex items-center justify-center text-amber-600"><Check className="w-3 h-3" /></div>
                                                <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">Fix grammar</span>
                                            </div>
                                            <div className="h-px bg-slate-100 my-1" />
                                            <div className="bg-slate-50 p-2 rounded-lg">
                                                <div className="flex gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" />
                                                    <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse delay-75" />
                                                    <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse delay-150" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default LessonEditor;
