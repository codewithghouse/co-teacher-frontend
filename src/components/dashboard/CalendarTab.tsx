import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, MapPin, Users, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";

export function CalendarTab() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    const events = [
        {
            id: 1,
            title: "Mathematics Class - 8A",
            time: "09:00 AM - 10:30 AM",
            type: "class",
            color: "bg-blue-100 text-blue-700",
            location: "Room 302",
            attendees: 32
        },
        {
            id: 2,
            title: "Science Quiz Preparation",
            time: "11:30 AM - 12:45 PM",
            type: "class",
            color: "bg-emerald-100 text-emerald-700",
            location: "Lab 2",
            attendees: 28
        },
        {
            id: 3,
            title: "Staff Meeting",
            time: "02:00 PM - 03:00 PM",
            type: "meeting",
            color: "bg-purple-100 text-purple-700",
            location: "Conference Hall",
            attendees: 15
        },
        {
            id: 4,
            title: "Parent-Teacher Conference",
            time: "04:00 PM - 05:30 PM",
            type: "meeting",
            color: "bg-orange-100 text-orange-700",
            location: "Meeting Room 1",
            attendees: 4
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 font-display tracking-tight">Calendar</h1>
                    <p className="text-slate-500 font-bold mt-1">Manage your schedule and events</p>
                </div>
                <Button className="bg-[#4F46E5] hover:bg-[#4338ca] text-white font-bold gap-2 rounded-xl">
                    <Plus className="w-4 h-4" /> Add Event
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Calendar Area */}
                <div className="lg:col-span-8">
                    <Card className="border-none shadow-sm h-full">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-xl font-bold text-slate-900">September 2026</h2>
                                    <div className="flex gap-1">
                                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-slate-200"><ChevronLeft className="w-4 h-4" /></Button>
                                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-slate-200"><ChevronRight className="w-4 h-4" /></Button>
                                    </div>
                                </div>
                                <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
                                    <Button variant="ghost" size="sm" className="h-8 px-3 rounded-md text-slate-600 font-bold">Day</Button>
                                    <Button variant="ghost" size="sm" className="h-8 px-3 rounded-md text-slate-600 font-bold">Week</Button>
                                    <Button size="sm" className="h-8 px-3 rounded-md bg-white text-slate-900 shadow-sm font-bold">Month</Button>
                                </div>
                            </div>

                            {/* Custom Month Grid Placeholder (since shadcn Calendar is small, we simulate a big one for dashboard feel or wrap shadcn one) */}
                            {/* Actually creating a full grid manually is safer for "wow" factor than default small calendar */}
                            <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                                    <div key={day} className="bg-slate-50 p-2 text-center text-xs font-bold text-slate-500 uppercase tracking-wide">
                                        {day}
                                    </div>
                                ))}
                                {Array.from({ length: 35 }).map((_, i) => {
                                    const day = i + 1;
                                    const isToday = day === 15;
                                    return (
                                        <div key={i} className={`bg-white min-h-[100px] p-2 hover:bg-slate-50 transition-colors group relative border-none outline-none`}>
                                            <span className={`text-sm font-bold ${isToday ? 'bg-[#4F46E5] text-white w-7 h-7 flex items-center justify-center rounded-full mb-2' : 'text-slate-700'}`}>
                                                {i < 30 ? i + 1 : ""}
                                            </span>
                                            {i === 8 && (
                                                <div className="p-1.5 rounded-md bg-blue-100 border border-blue-200 text-[10px] font-bold text-blue-700 truncate mb-1 cursor-pointer">
                                                    Math 101
                                                </div>
                                            )}
                                            {i === 14 && (
                                                <div className="p-1.5 rounded-md bg-emerald-100 border border-emerald-200 text-[10px] font-bold text-emerald-700 truncate mb-1 cursor-pointer">
                                                    Science Lab
                                                </div>
                                            )}
                                            {i === 14 && (
                                                <div className="p-1.5 rounded-md bg-purple-100 border border-purple-200 text-[10px] font-bold text-purple-700 truncate cursor-pointer">
                                                    Staff Meet
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Side Panel */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="border-none shadow-sm">
                        <CardContent className="p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-xl border-none mx-auto"
                            />
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-slate-900">Upcoming Events</h3>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-indigo-600">View All</Button>
                        </div>

                        {events.map((event, idx) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${event.color}`}>
                                        {event.type}
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-300 opacity-0 group-hover:opacity-100 hover:text-slate-600">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </div>
                                <h4 className="font-bold text-slate-900 mb-1">{event.title}</h4>
                                <div className="space-y-1.5 mt-3">
                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                        <Clock className="w-3.5 h-3.5" /> {event.time}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                        <MapPin className="w-3.5 h-3.5" /> {event.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                        <Users className="w-3.5 h-3.5" /> {event.attendees} Attendees
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
