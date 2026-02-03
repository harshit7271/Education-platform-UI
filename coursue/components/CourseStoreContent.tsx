"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, ShoppingBag, ShieldCheck, Zap, ArrowRight, Play, MoreHorizontal } from "lucide-react";
import CheckoutModal from "./CheckoutModal";
import clsx from "clsx";

const STORE_COURSES = [
    {
        id: 1,
        title: "Mastering Next.js 14 & Framer Motion",
        category: "Development",
        author: "Alex Rivera",
        avatar: "https://i.pravatar.cc/150?u=alex",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800&h=500",
        price: "$49.99",
        rating: 4.9,
        reviews: 1240,
        duration: "12h 45m",
        lessons: 56,
        level: "Intermediate",
        trending: true
    },
    {
        id: 2,
        title: "Advanced UI Design Systems",
        category: "Design",
        author: "Sarah Valentine",
        avatar: "https://i.pravatar.cc/150?u=sarahv",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d28?auto=format&fit=crop&q=80&w=800&h=500",
        price: "$69.00",
        rating: 5.0,
        reviews: 2100,
        duration: "18h 30m",
        lessons: 84,
        level: "Expert",
        trending: false
    },
    {
        id: 3,
        title: "Fullstack Web Development Bootcamp",
        category: "Development",
        author: "Jordan Smith",
        avatar: "https://i.pravatar.cc/150?u=jordan",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800&h=500",
        price: "$99.00",
        rating: 4.8,
        reviews: 3500,
        duration: "45h 20m",
        lessons: 120,
        level: "Beginner",
        trending: true
    },
    {
        id: 4,
        title: "Brand Strategy & Visual Identity",
        category: "Marketing",
        author: "Emily Chen",
        avatar: "https://i.pravatar.cc/150?u=emily",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800&h=500",
        price: "$39.99",
        rating: 4.7,
        reviews: 850,
        duration: "8h 15m",
        lessons: 24,
        level: "All Levels",
        trending: false
    }
];

export default function CourseStoreContent({ isLoggedIn, onAuthRequired }: { isLoggedIn: boolean; onAuthRequired: () => void }) {
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const handleBuyNow = (course: any) => {
        if (!isLoggedIn) {
            onAuthRequired();
            return;
        }
        setSelectedCourse(course);
        setIsCheckoutOpen(true);
    };

    return (
        <div className="flex-1 min-h-screen bg-[#F5F5F7] p-4 md:p-8 overflow-y-auto dark:bg-gray-900 transition-colors">
            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                course={selectedCourse}
                onSuccess={() => {
                    // Logic to add to "My Courses" could go here
                }}
            />

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        Course Store
                        <ShoppingBag className="w-8 h-8 text-[#6C5DD3]" />
                    </h1>
                    <p className="text-gray-500 text-lg mt-2">Elevate your skills with premium content</p>
                </div>

                <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800" />
                        ))}
                    </div>
                    <p className="text-xs font-bold text-gray-600 dark:text-gray-400">
                        <span className="text-[#6C5DD3]">12k+</span> students joined this week
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {STORE_COURSES.map((course, i) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-[3rem] p-6 shadow-sm hover:shadow-2xl transition-all group flex flex-col md:flex-row gap-8 border border-transparent hover:border-[#6C5DD3]/20"
                    >
                        <div className="relative w-full md:w-64 h-64 md:h-auto overflow-hidden rounded-[2.5rem]">
                            <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                <button className="w-full py-3 bg-white/20 backdrop-blur-md rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/30 transition-all">
                                    <Play className="w-4 h-4 fill-current" />
                                    Preview Trailer
                                </button>
                            </div>
                            {course.trending && (
                                <div className="absolute top-4 left-4 bg-[#6C5DD3] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-[#6C5DD3]/30">
                                    <Zap className="w-3 h-3 fill-current" />
                                    Trending
                                </div>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col pt-2">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6C5DD3] bg-[#6C5DD3]/10 px-3 py-1 rounded-full">
                                    {course.category}
                                </span>
                                <button className="text-gray-300 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                                    <MoreHorizontal className="w-6 h-6" />
                                </button>
                            </div>

                            <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight mb-3 group-hover:text-[#6C5DD3] transition-colors">
                                {course.title}
                            </h3>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-900/20 px-3 py-1.5 rounded-xl">
                                    <Star className="w-4 h-4 text-orange-400 fill-current" />
                                    <span className="text-sm font-black text-orange-600 dark:text-orange-400">{course.rating}</span>
                                    <span className="text-xs text-orange-300 dark:text-orange-700">({course.reviews})</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-500 font-bold text-sm">
                                    <Clock className="w-4 h-4" />
                                    {course.duration}
                                </div>
                            </div>

                            <div className="mt-auto flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Price</p>
                                    <p className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                                        {course.price}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleBuyNow(course)}
                                    className="px-8 py-4 bg-[#171717] dark:bg-[#6C5DD3] text-white rounded-[1.5rem] font-black text-sm shadow-xl shadow-black/5 dark:shadow-[#6C5DD3]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group/btn"
                                >
                                    <span>Buy Now</span>
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Features Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                    { icon: ShieldCheck, title: "Secure Payment", desc: "Safe & encrypted checkout" },
                    { icon: Zap, title: "Lifetime Access", desc: "Learn at your own pace" },
                    { icon: Play, title: "HD Content", desc: "Premium video quality" }
                ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-5 p-8 bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="w-14 h-14 bg-[#6C5DD3]/10 rounded-2xl flex items-center justify-center text-[#6C5DD3]">
                            <feat.icon className="w-7 h-7" />
                        </div>
                        <div>
                            <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-wider text-sm">{feat.title}</h4>
                            <p className="text-xs text-gray-500 font-medium">{feat.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
