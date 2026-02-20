import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PricingPage = () => {
    const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            description: "Time committed and free forever",
            features: [
                "Create 5 resources every week",
                "Create lessons and activities",
                "No card details required",
                "Export for Google & Microsoft"
            ],
            cta: "Get Started",
            variant: "outline"
        },
        {
            name: "Pro",
            price: billingPeriod === "monthly" ? "$19" : "$190",
            period: billingPeriod === "monthly" ? "month" : "year",
            description: "Best bet for individual teachers",
            features: [
                "Create unlimited resources",
                "Align to curriculum & standards",
                "Access specialist AI tools",
                "Lessons up to 25 slides",
                "Custom 'Create' mode",
                "Add Youtube videos"
            ],
            cta: "Go Pro",
            variant: "primary",
            highlight: true
        },
        {
            name: "Schools",
            price: "Custom",
            period: "license",
            description: "Let's chat",
            features: [
                "Admin panel",
                "Add teacher accounts",
                "Admin controls and tracking",
                "Centralized billing"
            ],
            cta: "Get in touch",
            variant: "outline"
        }
    ];

    const faqs = [
        {
            question: "Can I cancel or change my subscription at any time?",
            answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time from your dashboard settings. No hidden fees or lock-in contracts."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, Mastercard, American Express) and secure online payment methods like Stripe."
        },
        {
            question: "How many lessons can I create with the free plan?",
            answer: "The free plan allows you to create up to 5 full lesson plans or resources per week. This resets every Monday."
        },
        {
            question: "What happens to my resources if I cancel my subscription?",
            answer: "You will retain access to all resources you've created. However, you will lose access to premium AI features for creating new content."
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            <main className="flex-1 pt-32 pb-20">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-display"
                        >
                            Get in touch
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-slate-500 font-medium"
                        >
                            A simple and affordable way to save <span className="text-slate-900 font-bold italic">hours</span> of your time. ⏳
                        </motion.p>
                    </div>

                    {/* Billing Toggle */}
                    <div className="flex justify-center mb-12">
                        <Tabs defaultValue="monthly" onValueChange={(v) => setBillingPeriod(v as any)} className="w-[400px]">
                            <TabsList className="grid w-full grid-cols-2 bg-slate-50 border border-slate-200 p-1 h-14 rounded-full shadow-sm">
                                <TabsTrigger value="monthly" className="rounded-full text-base font-bold data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">Monthly</TabsTrigger>
                                <TabsTrigger value="yearly" className="rounded-full text-base font-bold data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
                                    Yearly <span className="ml-2 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-wide">Save 20%</span>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32">
                        {plans.map((plan, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative flex flex-col p-8 rounded-[2rem] transition-all duration-300
                                    ${plan.highlight
                                        ? "bg-slate-900 text-white shadow-2xl scale-105 z-10"
                                        : "bg-white border border-slate-200 text-slate-900 hover:shadow-xl hover:border-slate-300"
                                    }
                                `}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                        Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                                    <p className={`text-sm font-medium mb-6 ${plan.highlight ? "text-slate-400" : "text-slate-500"}`}>
                                        {plan.description}
                                    </p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-black tracking-tight">{plan.price}</span>
                                        {plan.price !== "Custom" && (
                                            <span className={`text-sm font-bold ${plan.highlight ? "text-slate-500" : "text-slate-400"}`}>
                                                /{plan.period}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-10 flex-1">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className={`mt-0.5 rounded-full p-0.5 ${plan.highlight ? "bg-orange-500/20 text-orange-400" : "bg-green-100 text-green-700"}`}>
                                                <Check className="w-3 h-3 stroke-[4]" />
                                            </div>
                                            <span className={`text-sm font-medium ${plan.highlight ? "text-slate-300" : "text-slate-600"}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    asChild
                                    className={`h-14 rounded-xl text-base font-bold w-full
                                        ${plan.highlight
                                            ? "bg-orange-500 hover:bg-orange-600 text-white border-none"
                                            : "bg-white border-2 border-slate-200 hover:border-slate-900 hover:bg-slate-50 text-slate-900"
                                        }
                                    `}
                                >
                                    <Link to="/signup">{plan.cta}</Link>
                                </Button>
                            </motion.div>
                        ))}
                    </div>

                    {/* FAQ Section */}
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-slate-900 mb-8 font-display">
                            Frequently asked questions...
                        </h3>
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                            <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, i) => (
                                    <AccordionItem key={i} value={`item-${i}`} className="border-b-slate-100 last:border-0 px-2">
                                        <AccordionTrigger className="text-left font-bold text-slate-900 hover:text-indigo-600 text-lg py-6">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-slate-600 font-medium text-base pb-6 leading-relaxed">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PricingPage;
