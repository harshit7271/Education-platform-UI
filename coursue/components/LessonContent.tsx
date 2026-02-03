"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, Clock, Star, MoreHorizontal } from "lucide-react";
import clsx from "clsx";

const COURSES = [
    { id: 1, title: "UI Design Principles", category: "Design", author: "Jason Ranti", image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d28?auto=format&fit=crop&q=80&w=300&h=200", progress: 75, duration: "3h 20m", rating: 4.8 },
    { id: 2, title: "Advanced Prototyping", category: "UX Design", author: "Sarah Johnson", image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=300&h=200", progress: 30, duration: "5h 45m", rating: 4.9 },
    { id: 3, title: "Design Systems 101", category: "System", author: "Mike Chen", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=300&h=200", progress: 0, duration: "4h 15m", rating: 4.7 },
    { id: 4, title: "Figma Mastery", category: "Tools", author: "Emily Davis", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=300&h=200", progress: 100, duration: "2h 30m", rating: 5.0 },
    { id: 5, title: "Web Typography", category: "Typography", author: "David Wilson", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=300&h=200", progress: 45, duration: "1h 50m", rating: 4.6 },
    { id: 6, title: "Color Theory", category: "Design", author: "Jessica Lee", image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=300&h=200", progress: 10, duration: "2h 45m", rating: 4.8 },
];

interface LessonContentProps {
    isLoggedIn?: boolean;
    onAuthRequired?: () => void;
}

export default function LessonContent({ isLoggedIn, onAuthRequired }: LessonContentProps) {
    const [activeFilter, setActiveFilter] = useState("All");

    const handleAction = (callback: () => void) => {
        if (!isLoggedIn && onAuthRequired) {
            onAuthRequired();
            return;
        }
        callback();
    };

    const filteredCourses = useMemo(() => {
        let result = [...COURSES];

        if (activeFilter === "Popular") {
            result.sort((a, b) => b.rating - a.rating);
        } else if (activeFilter === "Newest") {
            result.sort((a, b) => b.id - a.id);
        } else if (activeFilter === "Completed") {
            result = result.filter(c => c.progress === 100);
        }

        return result;
    }, [activeFilter]);

    return (
        <div className="flex-1 min-h-screen bg-[#F5F5F7] p-4 md:p-8 overflow-y-auto dark:bg-gray-900 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Lessons</h1>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                    {['All', 'Popular', 'Newest', 'Completed'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={clsx(
                                "px-6 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap shadow-sm",
                                activeFilter === filter
                                    ? "bg-[#171717] text-white dark:bg-[#6C5DD3] shadow-lg shadow-black/10 dark:shadow-[#6C5DD3]/20 scale-105"
                                    : "bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            )}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredCourses.map((course) => (
                        <motion.div
                            key={course.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white p-4 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group dark:bg-gray-800"
                        >
                            <div className="relative mb-4 overflow-hidden rounded-3xl h-48">
                                <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <button
                                        onClick={() => handleAction(() => { })}
                                        className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                                    >
                                        <PlayCircle className="w-6 h-6 fill-current" />
                                    </button>
                                </div>
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-900 shadow-sm">
                                    {course.category}
                                </div>
                            </div>

                            <div className="px-2">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-gray-900 leading-tight dark:text-white group-hover:text-[#6C5DD3] transition-colors">{course.title}</h3>
                                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><MoreHorizontal className="w-5 h-5" /></button>
                                </div>
                                <p className="text-xs text-gray-400 mb-4 font-medium">by {course.author}</p>

                                <div className="flex items-center justify-between text-xs text-gray-500 font-medium bg-gray-50 p-3 rounded-2xl mb-4 dark:bg-gray-700 dark:text-gray-300">
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4 text-[#6C5DD3]" />
                                        {course.duration}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Star className="w-4 h-4 text-orange-400 fill-current" />
                                        {course.rating}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold text-gray-900 dark:text-gray-300">
                                        <span>Progress</span>
                                        <span>{course.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${course.progress}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="h-full bg-[#6C5DD3] rounded-full shadow-[0_0_10px_rgba(108,93,211,0.3)]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
