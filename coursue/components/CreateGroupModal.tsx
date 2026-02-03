"use client";

import { useState } from "react";
import { X, Users, LayoutGrid, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface CreateGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (group: { name: string; category: string; image: string }) => void;
}

const CATEGORIES = ["Design", "Development", "Product", "Marketing", "Business"];

const DEFAULT_IMAGES = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=150&h=150",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=150&h=150",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=150&h=150",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=150&h=150"
];

export default function CreateGroupModal({ isOpen, onClose, onCreate }: CreateGroupModalProps) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Design");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) return;

        const randomImage = DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)];
        onCreate({ name, category, image: randomImage });

        setName("");
        setCategory("Design");
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        <div className="p-8 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    Create Group
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Start a new community today</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-colors text-gray-400"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 ml-1">
                                    <Users className="w-4 h-4 text-[#6C5DD3]" />
                                    Group Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g., UI Design Enthusiasts"
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:border-[#6C5DD3] rounded-2xl transition-all dark:text-white outline-none"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 ml-1">
                                    <LayoutGrid className="w-4 h-4 text-[#6C5DD3]" />
                                    Category
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => setCategory(cat)}
                                            className={clsx(
                                                "px-4 py-2 rounded-xl text-xs font-bold transition-all border-2",
                                                category === cat
                                                    ? "bg-[#6C5DD3] border-[#6C5DD3] text-white shadow-lg shadow-[#6C5DD3]/20"
                                                    : "bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-600 text-gray-500 hover:border-gray-200 dark:hover:border-gray-500"
                                            )}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-[#171717] dark:bg-[#6C5DD3] text-white rounded-2xl font-bold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                                >
                                    <span>Create Group</span>
                                    <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="w-full mt-3 py-4 text-gray-400 font-bold hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
