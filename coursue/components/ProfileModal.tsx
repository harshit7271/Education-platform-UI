"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Camera, Mail, Briefcase, FileText } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
    const [loading, setLoading] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onClose(); // Close on save
            alert("Profile updated successfully!");
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black z-50 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4"
                    >
                        <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl pointer-events-auto overflow-hidden relative dark:bg-gray-800 dark:text-white transition-colors">
                            {/* Header / Cover */}
                            <div className="h-32 bg-[#6C5DD3]/10 relative">
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 p-2 bg-white/50 hover:bg-white rounded-full transition-colors backdrop-blur-sm dark:bg-black/20 dark:hover:bg-black/40"
                                >
                                    <X className="w-5 h-5 text-gray-600 dark:text-white" />
                                </button>
                            </div>

                            {/* Avatar Section */}
                            <div className="px-8 relative -mt-16 mb-6 text-center">
                                <div className="relative inline-block">
                                    <img
                                        src="https://i.pravatar.cc/150?u=jason"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg dark:border-gray-800"
                                    />
                                    <button className="absolute bottom-2 right-2 bg-[#6C5DD3] text-white p-2 rounded-full border-4 border-white hover:scale-110 transition-transform shadow-md dark:border-gray-800">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                                <h2 className="text-2xl font-bold mt-4 dark:text-white">Jason Ranti</h2>
                                <p className="text-gray-400 font-medium">Product Designer</p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSave} className="px-8 pb-8 space-y-5">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                                        <input
                                            type="text"
                                            defaultValue="Jason Ranti"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none font-medium focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all dark:bg-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Title</label>
                                    <div className="relative">
                                        <Briefcase className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                                        <input
                                            type="text"
                                            defaultValue="Product Designer"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none font-medium focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all dark:bg-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email</label>
                                    <div className="relative">
                                        <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                                        <input
                                            type="email"
                                            defaultValue="jason@example.com"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none font-medium focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all dark:bg-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Bio</label>
                                    <div className="relative">
                                        <FileText className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                                        <textarea
                                            rows={2}
                                            defaultValue="Passionate about creating beautiful user experiences."
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none font-medium focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all resize-none dark:bg-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-[#171717] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 dark:bg-[#6C5DD3]"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : "Save Changes"}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
