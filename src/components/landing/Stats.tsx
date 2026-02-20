import { Globe, Users, Languages } from "lucide-react";

const stats = [
    {
        icon: Globe,
        value: "100+",
        label: "Countries",
        color: "text-white",
        bgColor: "bg-white/20"
    },
    {
        icon: Users,
        value: "250,000+",
        label: "Teachers helped",
        color: "text-white",
        bgColor: "bg-white/20"
    },
    {
        icon: Languages,
        value: "40",
        label: "Languages",
        color: "text-white",
        bgColor: "bg-white/20"
    }
];

const Stats = () => {
    return (
        <section className="relative z-20 -mt-8 w-full">
            <div className="bg-[#FA8112] shadow-xl border-y border-white/10 w-full overflow-hidden relative">

                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-300 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 relative z-10">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex items-center gap-3 relative w-full md:w-auto justify-center md:justify-start">
                            <div className={`p-2.5 rounded-lg bg-white/20 text-white shadow-sm border border-white/10`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <div className="text-2xl font-bold text-white font-display tracking-tight drop-shadow-sm">
                                    {stat.value}
                                </div>
                                <div className="text-white/90 font-bold text-xs uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>

                            {/* Divider for non-last items on desktop */}
                            {index !== stats.length - 1 && (
                                <div className="hidden lg:block absolute -right-12 md:-right-24 top-1/2 -translate-y-1/2 w-px h-12 bg-white/20" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
