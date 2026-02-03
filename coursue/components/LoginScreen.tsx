"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

interface LoginScreenProps {
    onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onLogin(); // Simulate successful login
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white w-full max-w-md p-8 md:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#6C5DD3]/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#8B7DE8]/10 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none" />

                <div className="flex items-center justify-center gap-2 mb-8 text-3xl font-bold text-gray-900">
                    <span>Coursue</span>
                    <Sparkles className="w-6 h-6 text-[#6C5DD3] fill-current" />
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-xl font-bold mb-2">Welcome Back! 👋</h1>
                    <p className="text-gray-500">Sign in to continue your learning journey</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email</label>
                        <input
                            type="email"
                            defaultValue="jason@example.com"
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all font-medium text-gray-700"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            defaultValue="password123"
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all font-medium text-gray-700"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#171717] text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <span>Sign In</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center mt-8 text-sm text-gray-400">
                    Don't have an account? <span className="text-[#6C5DD3] font-bold cursor-pointer hover:underline">Sign up</span>
                </p>
            </motion.div>
        </div>
    );
}
