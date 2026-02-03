"use client";

import { useState } from "react";
import { MessageCircle, Bell, Plus, UserPlus, UserCheck } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis } from "recharts";
import { STATS_DATA, MENTORS } from "@/lib/constants";
import clsx from "clsx";

interface RightSidebarProps {
    onChatClick?: () => void;
    onNotificationClick?: () => void;
    onProfileClick?: () => void;
}

export default function RightSidebar({ onChatClick, onNotificationClick, onProfileClick }: RightSidebarProps) {
    const [following, setFollowing] = useState<string[]>([]);

    const toggleFollow = (name: string) => {
        setFollowing((prev) =>
            prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
        );
    };

    return (
        <aside className="w-[300px] flex flex-col h-screen p-6 bg-[#F5F5F7] sticky top-0 hidden xl:flex dark:bg-gray-900 transition-colors">
            {/* Top User Nav */}
            <div className="flex items-center justify-end gap-4 mb-8">
                <button
                    onClick={onChatClick}
                    className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-[#6C5DD3] transition-colors dark:bg-gray-800 dark:text-gray-400 dark:hover:text-white"
                >
                    <MessageCircle className="w-5 h-5" />
                </button>
                <button
                    onClick={onNotificationClick}
                    className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-[#6C5DD3] transition-colors relative dark:bg-gray-800 dark:text-gray-400 dark:hover:text-white"
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                </button>
                <button onClick={onProfileClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <img
                        src="https://i.pravatar.cc/150?u=jason"
                        alt="Jason Ranti"
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm dark:border-gray-800"
                    />
                </button>
            </div>

            {/* Statistic Card */}
            <div className="bg-white rounded-[2rem] p-6 shadow-sm mb-6 relative overflow-hidden dark:bg-gray-800">
                <div className="flex justify-center mb-4 relative">
                    {/* Circular Progress Mockup */}
                    <div className="relative w-24 h-24">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke="#F3F4F6"
                                strokeWidth="8"
                                fill="none"
                                className="dark:stroke-gray-700"
                            />
                            <circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke="#6C5DD3"
                                strokeWidth="8"
                                fill="none"
                                strokeDasharray="251.2"
                                strokeDashoffset="62.8" // 75% filled
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img
                                src="https://i.pravatar.cc/150?u=jason"
                                alt="User"
                                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-inner dark:border-gray-700"
                            />
                        </div>
                        <div className="absolute top-0 right-0 bg-[#6C5DD3] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
                            32%
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <h2 className="text-lg font-bold text-gray-900 leading-tight dark:text-white">
                        Good Morning Jason <span className="inline-block animate-pulse">🔥</span>
                    </h2>
                    <p className="text-xs text-gray-400 mt-1 dark:text-gray-500">
                        Continue your learning to achieve your target!
                    </p>
                </div>
            </div>

            {/* Chart Section */}
            <div className="flex-1 flex flex-col mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 px-2 dark:text-white">Daily Activity</h3>
                <div className="flex-1 min-h-[150px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={STATS_DATA} barSize={12}>
                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 10 }}
                                dy={10}
                            />
                            <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                                {STATS_DATA.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.day === "Thu" ? "#4ADE80" : "#EBEBF0"} // Highlighted day light green
                                        // Recharts doesn't support className on Cell for fill easily without custom shape. 
                                        // We will accept light/dark mismatch here or assume chart is light-themed for contrast.
                                        // Actually, let's make the "default" bars darker in dark mode? 
                                        // Hard to do without passing context. Leaving as is, but maybe changing the specific hexes if I could.
                                        className="hover:opacity-80 transition-opacity cursor-pointer dark:opacity-80"
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Your Mentor */}
            <div>
                <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Your Mentor</h3>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors dark:hover:bg-gray-800">
                        <Plus className="w-5 h-5 text-[#6C5DD3]" />
                    </button>
                </div>
                <div className="space-y-4">
                    {MENTORS.map((mentor) => (
                        <div key={mentor.name} className="flex items-center justify-between p-2 rounded-xl hover:bg-white transition-colors dark:hover:bg-gray-800">
                            <div className="flex items-center gap-3">
                                <img
                                    src={mentor.avatar}
                                    alt={mentor.name}
                                    className="w-10 h-10 rounded-full object-cover shadow-sm"
                                />
                                <div>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{mentor.name}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">{mentor.role}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleFollow(mentor.name)}
                                className={clsx(
                                    "flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-300",
                                    following.includes(mentor.name)
                                        ? "bg-transparent border border-gray-300 text-gray-400 dark:border-gray-700 dark:text-gray-500"
                                        : "text-[#6C5DD3] hover:bg-[#6C5DD3]/10"
                                )}
                            >
                                {following.includes(mentor.name) ? "Followed" : "+ Follow"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
