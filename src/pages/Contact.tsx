import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send, MapPin, Phone } from "lucide-react";

const Contact = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-grow pt-24 pb-12 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16 space-y-4">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900">
                            We'd love to hear from you
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Have questions, feedback, or ideas on how to make Co-Teacher better?
                            Drop us a message below!
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-slate-700">
                                        Name
                                    </label>
                                    <Input
                                        id="name"
                                        placeholder="Your name"
                                        className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-slate-700">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-slate-700">
                                        Message
                                    </label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us what's on your mind..."
                                        className="min-h-[160px] bg-slate-50 border-slate-200 focus:bg-white transition-colors resize-none"
                                    />
                                </div>

                                <Button className="w-full h-12 bg-[#1E56A0] hover:bg-[#163172] text-white font-bold text-lg rounded-lg transition-all shadow-lg shadow-indigo-900/10 flex items-center justify-center gap-2">
                                    Send Message
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>

                        {/* Support Info / Decoration */}
                        <div className="space-y-8 md:pl-8">
                            <div className="bg-[#1E56A0]/5 rounded-2xl p-8 border border-[#1E56A0]/10">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                                    Get in touch
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-[#1E56A0]/10 flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-5 h-5 text-[#1E56A0]" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">Email Support</p>
                                            <p className="text-slate-600">support@co-teacher.com</p>
                                            <p className="text-sm text-slate-500 mt-1">We usually reply within 24 hours.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-[#1E56A0]/10 flex items-center justify-center flex-shrink-0">
                                            <MessageSquare className="w-5 h-5 text-[#1E56A0]" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">Live Chat</p>
                                            <p className="text-slate-600">Available on Dashboard</p>
                                            <p className="text-sm text-slate-500 mt-1">Mon-Fri, 9am - 6pm EST</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-[#1E56A0]/10 flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-5 h-5 text-[#1E56A0]" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">Phone</p>
                                            <p className="text-slate-600">+1 (555) 123-4567</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-[#1E56A0]/10 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-5 h-5 text-[#1E56A0]" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">Office</p>
                                            <p className="text-slate-600">123 Education Lane<br />Tech City, TC 90210</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
