"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, X, Mail, Lock } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: () => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<"login" | "signup">("login");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onLoginSuccess();
            onClose();
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-colors"
                    >
                        {/* Decorative background */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-[#6C5DD3]/10 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#8B7DE8]/10 rounded-full blur-3xl -ml-24 -mb-24 pointer-events-none" />

                        <div className="p-10 md:p-14">
                            <button
                                onClick={onClose}
                                className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-all"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>

                            <div className="flex items-center justify-center gap-2 mb-10 text-3xl font-black text-gray-900 dark:text-white">
                                <span>Coursue</span>
                                <Sparkles className="w-6 h-6 text-[#6C5DD3] fill-current" />
                            </div>

                            <div className="text-center mb-10">
                                <h1 className="text-2xl font-black mb-2 dark:text-white">
                                    {mode === "login" ? "Welcome Back! 👋" : "Join the Community! ✨"}
                                </h1>
                                <p className="text-gray-500 font-medium">
                                    {mode === "login" ? "Sign in to continue your journey" : "Start your path to mastery today"}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-wider text-gray-400 ml-1">Email Address</label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            required
                                            defaultValue="jason@example.com"
                                            className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-[#6C5DD3] rounded-2xl transition-all dark:text-white outline-none pl-12 font-bold"
                                            placeholder="you@example.com"
                                        />
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C5DD3]" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-wider text-gray-400 ml-1">Password</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            required
                                            defaultValue="password123"
                                            className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-[#6C5DD3] rounded-2xl transition-all dark:text-white outline-none pl-12 font-bold"
                                            placeholder="••••••••"
                                        />
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C5DD3]" />
                                    </div>
                                </div>

                                {mode === "login" && (
                                    <div className="flex justify-end">
                                        <button type="button" className="text-xs font-bold text-[#6C5DD3] hover:underline">Forgot password?</button>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#171717] dark:bg-[#6C5DD3] text-white font-black py-5 rounded-[1.5rem] shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span>{mode === "login" ? "Sign In" : "Create Account"}</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-10 text-center">
                                <p className="text-sm font-bold text-gray-400">
                                    {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                                    <button
                                        onClick={() => setMode(mode === "login" ? "signup" : "login")}
                                        className="text-[#6C5DD3] ml-1 hover:underline active:opacity-70 transition-all font-black"
                                    >
                                        {mode === "login" ? "Sign Up" : "Log In"}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
