"use client";

import { useState } from "react";
import { X, CreditCard, Calendar, Lock, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    course: {
        title: string;
        price: string;
        image: string;
    } | null;
    onSuccess: () => void;
}

export default function CheckoutModal({ isOpen, onClose, course, onSuccess }: CheckoutModalProps) {
    const [step, setStep] = useState<"form" | "processing" | "success">("form");
    const [formData, setFormData] = useState({
        card: "",
        expiry: "",
        cvv: ""
    });

    if (!course) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep("processing");
        setTimeout(() => {
            setStep("success");
            setTimeout(() => {
                onSuccess();
                onClose();
                setTimeout(() => setStep("form"), 500);
            }, 2000);
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
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
                        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        {step === "form" && (
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold dark:text-white">Secure Checkout</h2>
                                        <p className="text-gray-500 text-sm">Complete your purchase to start learning</p>
                                    </div>
                                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl">
                                        <X className="w-6 h-6 text-gray-400" />
                                    </button>
                                </div>

                                <div className="flex gap-6 mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-3xl items-center border border-gray-100 dark:border-gray-700">
                                    <img src={course.image} className="w-20 h-20 rounded-2xl object-cover shadow-sm" />
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white leading-tight mb-1">{course.title}</h3>
                                        <p className="text-[#6C5DD3] font-black text-xl">{course.price}</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 ml-1">
                                            <CreditCard className="w-4 h-4 text-[#6C5DD3]" />
                                            Card Number
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="0000 0000 0000 0000"
                                            className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-[#6C5DD3] rounded-2xl transition-all dark:text-white outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 ml-1">
                                                <Calendar className="w-4 h-4 text-[#6C5DD3]" />
                                                Expiry Date
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-[#6C5DD3] rounded-2xl transition-all dark:text-white outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 ml-1">
                                                <Lock className="w-4 h-4 text-[#6C5DD3]" />
                                                CVV
                                            </label>
                                            <input
                                                required
                                                type="password"
                                                placeholder="***"
                                                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-[#6C5DD3] rounded-2xl transition-all dark:text-white outline-none"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-5 bg-[#171717] dark:bg-[#6C5DD3] text-white rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                                    >
                                        <span>Confirm & Pay {course.price}</span>
                                        <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    </button>
                                </form>

                                <p className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-2">
                                    <Lock className="w-3 h-3" />
                                    Your payment information is encrypted and secure.
                                </p>
                            </div>
                        )}

                        {step === "processing" && (
                            <div className="p-20 flex flex-col items-center justify-center text-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="mb-6"
                                >
                                    <Loader2 className="w-16 h-16 text-[#6C5DD3]" />
                                </motion.div>
                                <h2 className="text-2xl font-bold dark:text-white mb-2">Processing Payment</h2>
                                <p className="text-gray-500">Please do not close this window...</p>
                            </div>
                        )}

                        {step === "success" && (
                            <div className="p-20 flex flex-col items-center justify-center text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", damping: 12 }}
                                    className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6"
                                >
                                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                                </motion.div>
                                <h2 className="text-3xl font-black dark:text-white mb-2">Purchase Success!</h2>
                                <p className="text-gray-500 mb-8">Welcome to the course. You can start learning now!</p>
                                <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-2xl text-green-600 dark:text-green-400 font-bold text-sm">
                                    Redirecting to your dashboard...
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
