"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Settings,
    X,
    Bell,
    Moon,
    Lock,
    Shield,
    ShieldCheck,
    Smartphone,
    KeyRound,
    Globe,
    ChevronRight,
    AlertTriangle
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab?: string;
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const RECENT_ACTIVITY = [
    { device: "MacBook Pro 16", location: "Mumbai, India", date: "Today, 10:24 AM", icon: Globe, status: "Current Session" },
    { device: "iPhone 15 Pro", location: "Mumbai, India", date: "Yesterday, 08:15 PM", icon: Smartphone, status: "Logged In" },
];

export default function SettingsModal({ isOpen, onClose, initialTab = "Preferences", darkMode, toggleDarkMode }: SettingsModalProps) {
    const [activeTab, setActiveTab] = useState(initialTab);
    const [notifications, setNotifications] = useState(true);
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [securityScore, setSecurityScore] = useState(75);

    // Update active tab when modal opens or initialTab changes
    useState(() => {
        if (isOpen) setActiveTab(initialTab);
    });

    const tabs = [
        { id: "Preferences", icon: Moon, desc: "Theme & Notifications" },
        { id: "Security", icon: Lock, desc: "Password & Protection" },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl h-[700px] bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl flex overflow-hidden border border-gray-100 dark:border-gray-800 transition-colors"
                    >
                        {/* Sidebar */}
                        <div className="w-72 bg-gray-50/50 p-8 flex flex-col border-r border-gray-100 dark:bg-gray-900/50 dark:border-gray-800">
                            <h2 className="text-2xl font-black mb-10 text-gray-900 dark:text-white flex items-center gap-3">
                                <div className="p-2 bg-[#6C5DD3] rounded-xl text-white">
                                    <Settings className="w-5 h-5" />
                                </div>
                                Settings
                            </h2>
                            <div className="space-y-3">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={clsx(
                                            "w-full flex items-center gap-4 px-5 py-4 rounded-[1.5rem] transition-all group text-left",
                                            activeTab === tab.id
                                                ? "bg-white shadow-xl shadow-black/5 text-[#6C5DD3] dark:bg-gray-800"
                                                : "text-gray-500 hover:bg-white/50 dark:text-gray-400 dark:hover:bg-gray-800/50"
                                        )}
                                    >
                                        <tab.icon className={clsx("w-5 h-5", activeTab === tab.id ? "text-[#6C5DD3]" : "text-gray-400 group-hover:text-[#6C5DD3]")} />
                                        <div>
                                            <p className="font-bold text-sm">{tab.id}</p>
                                            <p className="text-[10px] opacity-60 font-medium">{tab.desc}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-auto p-6 bg-gradient-to-br from-[#6C5DD3] to-[#8E82EF] rounded-[2rem] text-white relative overflow-hidden group">
                                <div className="relative z-10">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Security Score</p>
                                    <p className="text-3xl font-black mb-1">{securityScore}%</p>
                                    <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${securityScore}%` }}
                                            className="h-full bg-white"
                                        />
                                    </div>
                                    <p className="text-[10px] mt-3 font-bold opacity-80">Your account is well protected!</p>
                                </div>
                                <ShieldCheck className="absolute -bottom-4 -right-4 w-24 h-24 opacity-10 group-hover:scale-110 transition-transform" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-10 relative overflow-y-auto bg-white dark:bg-gray-900 scroll-smooth no-scrollbar">
                            <button
                                onClick={onClose}
                                className="absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-2xl transition-all dark:hover:bg-gray-800"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </button>

                            <div className="max-w-xl mx-auto">
                                {activeTab === "Preferences" && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-8"
                                    >
                                        <div>
                                            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2">App Preferences</h3>
                                            <p className="text-gray-500 font-medium italic">Customize your learning environment</p>
                                        </div>

                                        <div className="space-y-4">
                                            {[
                                                {
                                                    id: 'notifications',
                                                    icon: Bell,
                                                    title: "Push Notifications",
                                                    desc: "Get updates about courses and groups",
                                                    active: notifications,
                                                    toggle: () => setNotifications(!notifications)
                                                },
                                                {
                                                    id: 'darkmode',
                                                    icon: Moon,
                                                    title: "Dark Appearance",
                                                    desc: "Reduce eye strain in low-light",
                                                    active: darkMode,
                                                    toggle: () => toggleDarkMode?.()
                                                }
                                            ].map((pref) => (
                                                <div key={pref.id} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-[2.5rem] dark:bg-gray-800/50 border border-gray-50 dark:border-gray-800 hover:border-[#6C5DD3]/20 transition-all">
                                                    <div className="flex items-center gap-5">
                                                        <div className="p-3 bg-white rounded-2xl text-[#6C5DD3] shadow-sm dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                                                            <pref.icon className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-gray-900 dark:text-white uppercase tracking-wider text-sm">{pref.title}</p>
                                                            <p className="text-xs text-gray-500 font-medium">{pref.desc}</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={pref.toggle}
                                                        className={clsx(
                                                            "w-14 h-7 rounded-full transition-all relative p-1",
                                                            pref.active ? "bg-[#6C5DD3]" : "bg-gray-200 dark:bg-gray-700"
                                                        )}
                                                    >
                                                        <motion.div
                                                            animate={{ x: pref.active ? 28 : 0 }}
                                                            className="w-5 h-5 bg-white rounded-full shadow-lg"
                                                        />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === "Security" && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-10"
                                    >
                                        <div>
                                            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Security Hub</h3>
                                            <p className="text-gray-500 font-medium italic">Manage passwords and account safety</p>
                                        </div>

                                        {/* Password Section */}
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Authentication</h4>
                                            <div className="bg-gray-50/50 dark:bg-gray-800/50 rounded-[2.5rem] p-8 space-y-6 border border-gray-50 dark:border-gray-800">
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-gray-500 ml-2">Current Password</label>
                                                        <div className="relative">
                                                            <input
                                                                type="password"
                                                                className="w-full bg-white dark:bg-gray-900 border-none rounded-2xl p-4 pl-12 text-sm focus:ring-2 focus:ring-[#6C5DD3] transition-all dark:text-white"
                                                                placeholder="••••••••"
                                                            />
                                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6C5DD3] ml-1" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-gray-500 ml-2">New Password</label>
                                                        <div className="relative">
                                                            <input
                                                                type="password"
                                                                className="w-full bg-white dark:bg-gray-900 border-none rounded-2xl p-4 pl-12 text-sm focus:ring-2 focus:ring-[#6C5DD3] transition-all dark:text-white"
                                                                placeholder="Keep it strong!"
                                                            />
                                                            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6C5DD3] ml-1" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="w-full py-4 bg-[#171717] dark:bg-[#6C5DD3] text-white rounded-2xl font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                                                    Update Password
                                                </button>
                                            </div>
                                        </div>

                                        {/* 2FA Toggle */}
                                        <div className="flex items-center justify-between p-8 bg-[#6C5DD3]/5 rounded-[2.5rem] border border-[#6C5DD3]/10">
                                            <div className="flex gap-5">
                                                <div className="p-3 bg-[#6C5DD3] rounded-2xl text-white shadow-lg shadow-[#6C5DD3]/20">
                                                    <ShieldCheck className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-gray-900 dark:text-white uppercase tracking-wider text-sm">2-Factor Auth (2FA)</p>
                                                    <p className="text-xs text-gray-500 font-medium">Extra layer of protection</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                                                className={clsx(
                                                    "w-14 h-7 rounded-full transition-all relative p-1",
                                                    is2FAEnabled ? "bg-[#6C5DD3]" : "bg-gray-200 dark:bg-gray-700"
                                                )}
                                            >
                                                <motion.div
                                                    animate={{ x: is2FAEnabled ? 28 : 0 }}
                                                    className="w-5 h-5 bg-white rounded-full shadow-lg"
                                                />
                                            </button>
                                        </div>

                                        {/* Login Activity */}
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Recent Activity</h4>
                                            <div className="space-y-3">
                                                {RECENT_ACTIVITY.map((log, i) => (
                                                    <div key={i} className="flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-800 group hover:border-[#6C5DD3]/20 transition-all">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-[#6C5DD3] transition-colors">
                                                                <log.icon className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold text-gray-900 dark:text-white">{log.device}</p>
                                                                <p className="text-[10px] text-gray-400 font-bold">{log.location} • {log.date}</p>
                                                            </div>
                                                        </div>
                                                        <div className={clsx(
                                                            "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                                            log.status === "Current Session" ? "bg-green-100 text-green-600 dark:bg-green-900/20" : "bg-gray-100 text-gray-500 dark:bg-gray-800"
                                                        )}>
                                                            {log.status}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Security Warning */}
                                        <div className="p-6 bg-orange-50 dark:bg-orange-900/10 rounded-[2rem] flex gap-4 items-start border border-orange-100 dark:border-orange-900/20">
                                            <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0" />
                                            <div>
                                                <p className="text-xs font-black text-orange-800 dark:text-orange-400 uppercase tracking-widest mb-1">Backup Recovery</p>
                                                <p className="text-[11px] text-orange-600 dark:text-orange-500/80 font-medium leading-relaxed">Ensure you have recovery codes saved in a safe place. If you lose access to your 2FA device, you may be locked out.</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function SettingsIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>
    );
}

