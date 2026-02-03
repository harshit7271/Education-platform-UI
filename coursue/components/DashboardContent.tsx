"use client";

import { useState } from "react";
import { Search, MoreHorizontal, ChevronLeft, ChevronRight, Play, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PROGRESS_CARDS, WATCH_LIST, LESSONS } from "@/lib/constants";
import clsx from "clsx";

interface DashboardContentProps {
    activeTab: string;
    onJoinClick?: () => void;
    onDashboardClick?: () => void;
    onCourseClick?: (course: any) => void;
    onAuthRequired?: () => void;
    isLoggedIn?: boolean;
    isPremium?: boolean;
}

export default function DashboardContent({ activeTab, onJoinClick, onDashboardClick, onCourseClick, onAuthRequired, isLoggedIn, isPremium }: DashboardContentProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleAction = (callback: () => void) => {
        if (!isLoggedIn && onAuthRequired) {
            onAuthRequired();
            return;
        }
        callback();
    };

    if (activeTab !== "Overview") {
        return (
            <div className="flex-1 min-h-screen bg-[#F5F5F7] p-8 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{activeTab}</h2>
                    <p className="text-gray-500">This feature is coming soon!</p>
                </div>
            </div>
        );
    }

    // Filter content based on search
    const filteredWatchList = WATCH_LIST.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredLessons = LESSONS.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mentor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex-1 min-h-screen bg-[#F5F5F7] p-4 md:p-8 overflow-y-auto dark:bg-gray-900 transition-colors">
            {/* Header */}
            <header className="flex items-center justify-between mb-8 pb-4">
                <div className="relative w-full md:max-w-xl">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-12 pr-4 py-3.5 bg-white border-none rounded-2xl text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                        placeholder="Search your course..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </header>

            {/* Hero Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-gradient-to-r from-[#6C5DD3] to-[#8B7DE8] rounded-[2rem] p-8 md:p-10 mb-10 overflow-hidden shadow-xl shadow-[#6C5DD3]/20 text-white"
            >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

                <div className="relative z-10 max-w-lg">
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
                        {isPremium ? "Welcome back, Pro Member!" : "Sharpen Your Skills with"}
                    </h1>
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-8">
                        {isPremium ? "Continue Your Journey" : "Professional Online Courses"}
                    </h1>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={isPremium ? onDashboardClick : onJoinClick}
                        className={clsx(
                            "px-6 py-3 rounded-full font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-shadow",
                            isPremium ? "bg-white text-[#6C5DD3]" : "bg-[#171717] text-white"
                        )}
                    >
                        <span>{isPremium ? "Go to Dashboard" : "Join Now"}</span>
                        <div className={clsx("p-1 rounded-full", isPremium ? "bg-[#6C5DD3]/10" : "bg-white/20")}>
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </motion.button>
                </div>
            </motion.div>

            {/* Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {PROGRESS_CARDS.map((card, i) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-5 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer dark:bg-gray-800"
                        onClick={() => onCourseClick?.(card)}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={clsx("p-3 rounded-2xl", card.color)}>
                                <div className="w-6 h-6 border-2 border-current rounded-md border-dashed opacity-50"></div>
                            </div>
                            <button className="text-gray-300 hover:text-gray-600">
                                <MoreHorizontal className="w-6 h-6" />
                            </button>
                        </div>
                        <h3 className="font-bold text-lg mb-1 group-hover:text-[#6C5DD3] transition-colors dark:text-white">{card.title}</h3>
                        <p className="text-sm text-gray-400 font-medium">{card.watched}/{card.total} watched</p>
                    </motion.div>
                ))}
            </div>

            {/* Continue Watching */}
            <div id="continue-watching" className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold dark:text-white">Continue Watching</h2>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                            <ChevronLeft className="w-5 h-5 text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                            <ChevronRight className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {filteredWatchList.length === 0 ? (
                    <p className="text-gray-500 italic">No courses found matching "{searchQuery}"</p>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredWatchList.map((item, i) => (
                            <motion.div
                                key={item.title}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                onClick={() => handleAction(() => alert(`Playing ${item.title}`))}
                                className="bg-white p-4 rounded-3xl shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row gap-4 cursor-pointer dark:bg-gray-800"
                            >
                                <div className={clsx("w-full md:w-40 h-32 rounded-2xl flex-shrink-0 relative overflow-hidden group", item.color)}>
                                    {/* Placeholder Image Overlay */}
                                    <img src={item.image} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Play className="w-4 h-4 text-white fill-current ml-0.5" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center py-2 flex-1">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{item.category}</span>
                                    <h3 className="font-bold text-lg leading-snug mb-3 pr-4 line-clamp-2 dark:text-gray-100">{item.title}</h3>
                                    <div className="flex items-center gap-2 mt-auto">
                                        <img src={item.avatar} className="w-6 h-6 rounded-full" />
                                        <span className="text-xs text-gray-500 font-medium">{item.mentor}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Your Lesson */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold dark:text-white">Your Lesson</h2>
                    <button className="text-[#6C5DD3] text-sm font-bold hover:underline">See all</button>
                </div>

                <div className="space-y-4">
                    {filteredLessons.map((lesson, i) => (
                        <motion.div
                            key={lesson.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                            onClick={() => handleAction(() => alert(`Opening lesson: ${lesson.title}`))}
                            className="flex items-center justify-between bg-white p-4 rounded-3xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer dark:bg-gray-800"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-12 h-12 rounded-2xl bg-gray-100 overflow-hidden">
                                    <img src={lesson.avatar} className="w-full h-full object-cover" />
                                </div>
                                <div className="hidden md:block w-32">
                                    <p className="text-sm font-bold text-gray-900">{lesson.mentor}</p>
                                    <p className="text-xs text-gray-400">{lesson.date}</p>
                                </div>
                                <div className="hidden sm:block">
                                    <span className="px-3 py-1 bg-[#6C5DD3]/10 text-[#6C5DD3] text-xs font-bold rounded-lg border border-[#6C5DD3]/20">
                                        {lesson.tag}
                                    </span>
                                </div>
                                <p className="font-bold text-gray-900 dark:text-white line-clamp-1 flex-1 px-4">{lesson.title}</p>
                            </div>
                            <button className="p-2 border border-gray-200 rounded-full text-gray-400 group-hover:bg-[#171717] group-hover:border-[#171717] group-hover:text-white transition-all">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Mobile-only Stats and Mentors (from RightSidebar) */}
            <div className="mt-12 xl:hidden space-y-10">
                <div className="bg-white rounded-[2rem] p-6 shadow-sm dark:bg-gray-800 min-w-0">
                    <h3 className="text-xl font-bold mb-6 dark:text-white">Daily Activity</h3>
                    <div className="h-[200px] w-full min-w-0">
                        {/* Note: In a real app we'd share a component, but here we can just add a placeholder or simple bars */}
                        <div className="flex items-end justify-between h-full gap-2 px-2">
                            {[40, 70, 45, 90, 65, 50, 80].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                    <div
                                        style={{ height: `${h}%` }}
                                        className={clsx(
                                            "w-full rounded-t-lg transition-all",
                                            i === 3 ? "bg-green-400" : "bg-[#6C5DD3]/20 dark:bg-gray-700"
                                        )}
                                    />
                                    <span className="text-[10px] font-bold text-gray-400">
                                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pb-10">
                    <h3 className="text-xl font-bold mb-6 dark:text-white">Your Mentors</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { name: "Jason Ranti", role: "UI/UX Designer", avatar: "https://i.pravatar.cc/150?u=jason" },
                            { name: "Angelina Lee", role: "Product Manager", avatar: "https://i.pravatar.cc/150?u=angelina" }
                        ].map((m) => (
                            <div key={m.name} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm dark:bg-gray-800">
                                <img src={m.avatar} className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">{m.name}</p>
                                    <p className="text-xs text-gray-400">{m.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
