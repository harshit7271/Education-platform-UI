"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { useState } from "react";

interface JoinModalProps {
    isOpen: boolean;
    onClose: () => void;
    onJoin: (name: string) => void;
}

export default function JoinModal({ isOpen, onClose, onJoin }: JoinModalProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                onJoin("New Student");
                setSuccess(false);
                onClose();
            }, 1000);
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
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                    >
                        <div className="bg-white w-full max-w-md p-8 rounded-[2rem] shadow-2xl pointer-events-auto relative overflow-hidden dark:bg-gray-800">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors dark:hover:bg-gray-700"
                                type="button"
                            >
                                <X className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                            </button>

                            {success ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4 dark:bg-green-900/20">
                                        <Check className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">Welcome Aboard!</h2>
                                    <p className="text-gray-500 dark:text-gray-400">You have successfully joined the premium plan.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="text-center mb-8">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">Join Coursue Premium</h2>
                                        <p className="text-gray-500 dark:text-gray-400">Unlock unlimited access to all professional courses.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#6C5DD3] focus:border-transparent outline-none transition-all dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#6C5DD3] focus:border-transparent outline-none transition-all dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-[#6C5DD3] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#6C5DD3]/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                                        >
                                            {loading ? (
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                "Activate Membership"
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
