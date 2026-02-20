import { motion } from "framer-motion";
import { UploadCloud, FileText, Link, Check, FileUp, Loader2 } from "lucide-react";

const ResourceImport = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Visual - Upload Interface */}
                    <div className="flex-1 w-full relative">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            {/* Background Decoration - Teal Blob */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-teal-100/50 rounded-full blur-3xl -z-10" />

                            {/* Main Container - Teal Background */}
                            <div className="bg-[#4aa5a0] rounded-3xl shadow-2xl p-8 pb-32 relative overflow-hidden">

                                {/* Top Icons Row - White Cards with Green Icons */}
                                <div className="flex gap-4 mb-6">
                                    <div className="flex-1 bg-white rounded-xl h-24 flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 transition-transform">
                                        <FileUp className="w-10 h-10 text-[#2d6a66]" />
                                    </div>
                                    <div className="flex-1 bg-white rounded-xl h-24 flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 transition-transform">
                                        <UploadCloud className="w-10 h-10 text-[#2d6a66]" />
                                    </div>
                                    <div className="flex-1 bg-white rounded-xl h-24 flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 transition-transform">
                                        <Link className="w-10 h-10 text-[#2d6a66]" />
                                    </div>
                                </div>

                                {/* Main File Info Card */}
                                <div className="bg-[#f0f9f9] rounded-xl shadow-lg p-6 pb-20 relative z-10">
                                    <h4 className="font-bold text-lg text-slate-900 mb-4 truncate">
                                        Chapter 4: Photosynthesis.pdf
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                            <Check className="w-5 h-5 text-[#4aa5a0]" strokeWidth={3} />
                                            <span>Words extracted: 1,450</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                            <Check className="w-5 h-5 text-[#4aa5a0]" strokeWidth={3} />
                                            <span>Images: 12</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Floating "Uploading" Card */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="absolute bottom-8 left-4 right-4 bg-white rounded-xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.2)] p-6 z-20"
                                >
                                    <h3 className="text-center font-bold text-slate-900 mb-2">Uploading file...</h3>
                                    <p className="text-center text-xs text-slate-500 mb-4">This may take a few moments</p>

                                    {/* Progress Bar */}
                                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-[#2d5c58] rounded-full"
                                            initial={{ width: "10%" }}
                                            whileInView={{ width: "75%" }}
                                            transition={{ duration: 1.5, ease: "easeInOut" }}
                                        />
                                    </div>
                                </motion.div>

                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-teal-600 font-bold text-lg mb-4 tracking-wide uppercase">
                                Create Your Way
                            </h3>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
                                Generate lessons from <br />
                                <span className="text-[#4aa5a0]">
                                    your own resources
                                </span>
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Already have great materials? Co-Teacher makes them better.
                                Upload your PDFs, documents, or paste a website link, and our AI will
                                instantly convert them into interactive quizzes, vocab lists, and lesson plans.
                            </p>

                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 mt-1 shrink-0">
                                        <FileUp className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Upload existing files</h4>
                                        <p className="text-sm text-slate-500">Supports PDF, DOCX, PPTX, and more.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 mt-1 shrink-0">
                                        <Link className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Import from the web</h4>
                                        <p className="text-sm text-slate-500">Paste any article or YouTube link to extract key points.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 mt-1 shrink-0">
                                        <Loader2 className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Magical extraction</h4>
                                        <p className="text-sm text-slate-500">We pull out definitions, timelines, and facts automatically.</p>
                                    </div>
                                </li>
                            </ul>

                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ResourceImport;
