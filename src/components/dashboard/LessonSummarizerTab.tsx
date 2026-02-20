import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowRight, BookOpen, Upload, FileText, CheckCircle2, Copy, X, Text, Sparkles } from "lucide-react";
import api from "@/api/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export function LessonSummarizerTab() {
    const [mode, setMode] = useState<"upload" | "text">("upload");
    const [file, setFile] = useState<File | null>(null);
    const [textInput, setTextInput] = useState("");
    const [isDragOver, setIsDragOver] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (selectedFile: File) => {
        if (selectedFile.type !== "application/pdf") {
            toast.error("Please upload a valid PDF file.");
            return;
        }
        if (selectedFile.size > 200 * 1024 * 1024) { // 200MB limit
            toast.error("File size exceeds 200MB limit.");
            return;
        }
        setFile(selectedFile);
        setResult(null);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (mode !== "upload") return; // Only allow drop in upload mode
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleSummarize = async () => {
        if (mode === "upload" && !file) return;
        if (mode === "text" && !textInput.trim()) {
            toast.error("Please enter some text.");
            return;
        }

        setIsGenerating(true);
        setResult(null);

        try {
            let res;
            if (mode === "upload" && file) {
                const formData = new FormData();
                formData.append('file', file);
                res = await api.post('/lessons/summarize-pdf', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                res = await api.post('/lessons/summarize', { text: textInput });
            }

            setResult(res.data);
            toast.success("Summary generated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate summary");
        } finally {
            setIsGenerating(false);
        }
    };

    const clearAll = () => {
        setFile(null);
        setTextInput("");
        setResult(null);
    };

    return (
        <div className="w-full min-h-full bg-[#F8FAFC] text-slate-900 p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start min-h-[80vh]">

                {/* Left Side - Input UI */}
                <div className="space-y-8 sticky top-8">
                    <div className="space-y-2">
                        <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight text-slate-900 leading-tight">
                            AI Assistant For Teachers
                        </h1>
                        <p className="text-slate-500 text-lg font-medium">Use AI to analyze and summarize your lesson materials instantly.</p>
                    </div>

                    {/* Mode Switcher */}
                    <div className="flex p-1 bg-white rounded-xl w-fit border border-slate-200 shadow-sm">
                        <button
                            onClick={() => setMode("upload")}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${mode === "upload"
                                ? "bg-[#36656B] text-white shadow-md relative z-10"
                                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50 relative z-0"}`}
                        >
                            <Upload className="w-4 h-4" /> Upload PDF
                        </button>
                        <button
                            onClick={() => setMode("text")}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${mode === "text"
                                ? "bg-[#36656B] text-white shadow-md relative z-10"
                                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50 relative z-0"}`}
                        >
                            <Text className="w-4 h-4" /> Paste Text
                        </button>
                    </div>

                    <div className="space-y-4">
                        {mode === "upload" ? (
                            <>
                                <p className="font-semibold text-slate-700 ml-1">Upload PDF File Of Your Lesson</p>
                                {!file ? (
                                    <div
                                        className={`border-2 border-dashed rounded-2xl p-10 transition-all duration-200 flex flex-col items-center justify-center gap-4 bg-white ${isDragOver ? 'border-[#36656B] bg-teal-50' : 'border-slate-300 hover:bg-slate-50 hover:border-slate-400'}`}
                                        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                                        onDragLeave={() => setIsDragOver(false)}
                                        onDrop={handleDrop}
                                    >
                                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                                            <Upload className="w-8 h-8 text-slate-400" />
                                        </div>
                                        <div className="text-center space-y-1">
                                            <p className="text-lg font-bold text-slate-900">Drag and drop file here</p>
                                            <p className="text-sm text-slate-500 font-medium">Limit 200MB per file • PDF only</p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="mt-4 border-slate-300 text-slate-700 hover:bg-slate-100 bg-white rounded-xl px-8 h-12 font-bold focus-visible:ring-offset-2"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            Browse files
                                        </Button>
                                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="application/pdf" className="hidden" />
                                    </div>
                                ) : (
                                    <div className="border border-slate-200 rounded-2xl p-6 bg-white flex items-center justify-between shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#36656B] flex items-center justify-center border border-teal-100">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-lg">{file.name}</p>
                                                <p className="text-sm text-slate-500 font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Button variant="ghost" className="text-slate-400 hover:text-red-500 hover:bg-red-50" onClick={() => setFile(null)}>
                                                <X className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <p className="font-semibold text-slate-700 ml-1">Paste Or Type Your Content</p>
                                <Textarea
                                    placeholder="Paste your lesson plan, meeting notes, or educational content here..."
                                    className="min-h-[300px] bg-white border-slate-200 text-slate-700 placeholder:text-slate-400 rounded-2xl p-6 text-lg resize-none focus:ring-[#36656B] focus:border-[#36656B] transition-all font-medium leading-relaxed shadow-sm"
                                    value={textInput}
                                    onChange={(e) => setTextInput(e.target.value)}
                                />
                            </>
                        )}

                        {(file || (mode === "text" && textInput)) && (
                            <Button
                                onClick={handleSummarize}
                                disabled={isGenerating}
                                className="w-full bg-[#36656B] hover:bg-[#2A4D52] text-white font-bold h-14 rounded-xl text-lg shadow-xl shadow-teal-900/10 transition-all mt-4"
                            >
                                {isGenerating ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <BookOpen className="w-5 h-5 mr-2" />}
                                {isGenerating ? "Analyzing Content..." : "Generate Summary"}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Right Side - Result UI */}
                <div className="relative pt-8 lg:pt-0">
                    <AnimatePresence mode="wait">
                        {!result && !isGenerating && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="hidden lg:flex flex-col items-center justify-center text-center mt-20"
                            >
                                <div className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 transform rotate-1">
                                    <img
                                        src="/educational-flashcards.png"
                                        alt="Educational Worksheets and Flashcards"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/5"></div>
                                </div>
                                <p className="mt-8 text-slate-400 font-bold tracking-wide uppercase text-sm">Results will appear here</p>
                            </motion.div>
                        )}

                        {isGenerating && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xl relative overflow-hidden mt-10"
                            >
                                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-6" />
                                <h3 className="text-2xl font-bold text-slate-900">Analyzing Content...</h3>
                                <p className="text-slate-500 mt-2 font-medium">Our AI is extracting key concepts for you.</p>
                            </motion.div>
                        )}

                        {result && (
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="relative z-10"
                            >
                                <div className="bg-[#2A4D52] rounded-t-2xl px-6 py-4 flex items-center justify-between shadow-lg">
                                    <div className="flex items-center gap-3 text-white/95">
                                        <FileText className="w-5 h-5" />
                                        <span className="font-bold text-base tracking-wide">
                                            {mode === "upload" && file ? file.name : "Text Summary"}
                                        </span>
                                    </div>
                                    <button onClick={clearAll} className="text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-1.5 rounded-lg">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="bg-[#36656B] p-8 rounded-b-2xl shadow-2xl shadow-teal-900/10 space-y-6 max-h-[700px] overflow-y-auto custom-scrollbar border-t border-white/10">
                                    {/* Key Points Section */}
                                    <div className="space-y-4">
                                        {(result.keyPoints || []).map((point: string, i: number) => (
                                            <div key={i} className="flex gap-4 text-white group">
                                                <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                                                <p className="font-medium leading-relaxed text-[15px]">{point}</p>
                                            </div>
                                        ))}

                                        {/* Fallback Overview */}
                                        {(!result.keyPoints || result.keyPoints.length === 0) && result.overview && (
                                            <p className="text-white font-medium leading-relaxed text-lg">{result.overview}</p>
                                        )}
                                    </div>

                                    {/* Action Items Section */}
                                    {result.actionItems && result.actionItems.length > 0 && (
                                        <div className="mt-8 pt-6 border-t border-white/20">
                                            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-4 opacity-80 flex items-center gap-2">
                                                <ArrowRight className="w-3 h-3" /> Next Steps
                                            </h4>
                                            {result.actionItems.map((item: string, i: number) => (
                                                <div key={i} className="flex gap-3 text-white mb-3 items-start p-3 bg-black/5 rounded-lg border border-white/5 hover:bg-black/10 transition-colors">
                                                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 opacity-90 text-white" />
                                                    <p className="font-medium text-sm leading-snug">{item}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
