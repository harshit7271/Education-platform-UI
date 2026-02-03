"use client";

import { useState } from "react";
import { Sparkles, Settings, LogOut, Sun, Moon } from "lucide-react";
import { MENU_ITEMS, FRIENDS } from "@/lib/constants";
import { motion } from "framer-motion";
import clsx from "clsx";

interface SidebarProps {
    className?: string;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onSettingsClick?: () => void;
    onLogoutClick?: () => void;
    onAuthRequired?: () => void;
    isLoggedIn?: boolean;
    darkMode?: boolean;
    toggleDarkMode?: (isDark?: boolean) => void;
}

export default function Sidebar({
    className,
    activeTab,
    setActiveTab,
    onSettingsClick,
    onLogoutClick,
    onAuthRequired,
    isLoggedIn = true,
    darkMode = true,
    toggleDarkMode
}: SidebarProps) {

    return (
        <aside className={clsx("w-[250px] flex flex-col h-screen p-6 bg-[#F5F5F7] border-r border-gray-100 dark:bg-gray-900 dark:border-gray-800 transition-colors uppercase", className)}>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-10 text-2xl font-bold dark:text-white normal-case">
                <span>Coursue</span>
                <Sparkles className="w-5 h-5 text-[#6C5DD3] fill-current" />
            </div>

            {/* Menu */}
            <nav className="flex-1 space-y-2">
                {MENU_ITEMS.map((item) => (
                    <motion.button
                        key={item.label}
                        whileHover={{ x: 5 }}
                        onClick={() => setActiveTab(item.label)}
                        className={clsx(
                            "flex items-center gap-3 w-full px-4 py-3 rounded-2xl transition-all duration-300 group relative",
                            activeTab === item.label
                                ? "bg-white shadow-sm text-[#171717] dark:bg-gray-800 dark:text-white"
                                : "text-gray-500 hover:bg-white/50 dark:text-gray-400 dark:hover:bg-gray-800/50"
                        )}
                    >
                        <item.icon
                            className={clsx(
                                "w-5 h-5 transition-colors",
                                activeTab === item.label ? "text-[#6C5DD3]" : "text-gray-400 group-hover:text-[#6C5DD3] dark:text-gray-500"
                            )}
                        />
                        <span className={clsx("font-bold text-xs tracking-wider", activeTab === item.label ? "text-gray-900 dark:text-white" : "")}>
                            {item.label}
                        </span>
                        {activeTab === item.label && (
                            <motion.div
                                layoutId="activeIndicator"
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#6C5DD3] rounded-r-full"
                            />
                        )}
                    </motion.button>
                ))}
            </nav>

            {/* Friends (Only if logged in) */}
            {isLoggedIn && (
                <div className="mb-10">
                    <h3 className="text-[10px] font-black text-gray-400 tracking-[0.2em] mb-4 px-4 dark:text-gray-500">
                        FRIENDS
                    </h3>
                    <div className="space-y-4">
                        {FRIENDS.map((friend) => (
                            <div key={friend.name} className="flex items-center gap-3 px-4">
                                <img
                                    src={friend.avatar}
                                    alt={friend.name}
                                    className="w-10 h-10 rounded-full object-cover shadow-sm bg-gray-200"
                                />
                                <div>
                                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{friend.name}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">{friend.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Theme Toggle */}
            <div className="mb-6 p-1 bg-gray-200/50 dark:bg-gray-800/50 rounded-2xl flex relative overflow-hidden">
                <motion.div
                    className="absolute inset-y-1 bg-white dark:bg-gray-700 rounded-xl shadow-sm z-0"
                    initial={false}
                    animate={{
                        x: darkMode ? '100%' : '0%',
                        width: 'calc(50% - 4px)'
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <button
                    onClick={() => toggleDarkMode?.(false)}
                    className={clsx(
                        "flex-1 flex items-center justify-center gap-2 py-2.5 z-10 transition-colors",
                        !darkMode ? "text-[#6C5DD3]" : "text-gray-500 dark:text-gray-400"
                    )}
                >
                    <Sun className="w-4 h-4" />
                    <span className="text-[10px] font-black tracking-widest">LIGHT</span>
                </button>
                <button
                    onClick={() => toggleDarkMode?.(true)}
                    className={clsx(
                        "flex-1 flex items-center justify-center gap-2 py-2.5 z-10 transition-colors",
                        darkMode ? "text-[#6C5DD3] dark:text-[#8B7DE8]" : "text-gray-500"
                    )}
                >
                    <Moon className="w-4 h-4" />
                    <span className="text-[10px] font-black tracking-widest">DARK</span>
                </button>
            </div>

            {/* Settings */}
            <div className="space-y-2">
                <button
                    onClick={onSettingsClick}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-gray-500 hover:bg-white/50 transition-colors hover:text-[#171717] dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                    <Settings className="w-5 h-5" />
                    <span className="font-bold text-xs tracking-wider">Setting</span>
                </button>
                <button
                    onClick={isLoggedIn ? onLogoutClick : onAuthRequired}
                    className={clsx(
                        "flex items-center gap-3 w-full px-4 py-3 rounded-2xl transition-colors group",
                        isLoggedIn ? "text-gray-500 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20" : "text-[#6C5DD3] bg-[#6C5DD3]/10 hover:bg-[#6C5DD3]/20"
                    )}
                >
                    {isLoggedIn ? (
                        <>
                            <LogOut className="w-5 h-5 group-hover:text-red-500" />
                            <span className="font-bold text-xs tracking-wider uppercase">Logout</span>
                        </>
                    ) : (
                        <>
                            <LogOut className="w-5 h-5 rotate-180" />
                            <span className="font-bold text-xs tracking-wider uppercase">Sign In</span>
                        </>
                    )}
                </button>
            </div>
        </aside>
    );
}
