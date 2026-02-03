"use client";

import { useState } from "react";
import { X, Layout, Clock, Flag, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (task: { title: string; course: string; time: string; priority: string }) => void;
}

export default function AddTaskModal({ isOpen, onClose, onAdd }: AddTaskModalProps) {
    const [title, setTitle] = useState("");
    const [course, setCourse] = useState("");
    const [time, setTime] = useState("");
    const [priority, setPriority] = useState("medium");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !course || !time) return;
        onAdd({ title, course, time, priority });
        setTitle("");
        setCourse("");
        setTime("");
        setPriority("medium");
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
                        className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Task</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Plan your next milestone</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors text-gray-400"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <Layout className="w-4 h-4 text-[#6C5DD3]" />
                                    Task Title
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Finish UI Design"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-none rounded-2xl focus:ring-2 focus:ring-[#6C5DD3] transition-all dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <LayoutGrid className="w-4 h-4 text-[#6C5DD3]" />
                                        Course
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={course}
                                        onChange={(e) => setCourse(e.target.value)}
                                        placeholder="Course name"
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-none rounded-2xl focus:ring-2 focus:ring-[#6C5DD3] transition-all dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-[#6C5DD3]" />
                                        Estimate
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        placeholder="e.g., 30 mins"
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-none rounded-2xl focus:ring-2 focus:ring-[#6C5DD3] transition-all dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <Flag className="w-4 h-4 text-[#6C5DD3]" />
                                    Priority
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['low', 'medium', 'high'].map((p) => (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => setPriority(p)}
                                            className={clsx(
                                                "py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border-2",
                                                priority === p
                                                    ? "bg-[#6C5DD3] border-[#6C5DD3] text-white shadow-lg shadow-[#6C5DD3]/20"
                                                    : "bg-transparent border-gray-100 dark:border-gray-700 text-gray-500 hover:border-gray-200 dark:hover:border-gray-600"
                                            )}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-[#171717] dark:bg-[#6C5DD3] text-white rounded-2xl font-bold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
