"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, CheckCircle, Info, MessageSquare } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

interface NotificationsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const INITIAL_NOTIFICATIONS = [
    { id: 1, type: 'info', title: 'System Update', message: 'Coursue dashboard has been updated to v2.0', time: '2m ago', read: false },
    { id: 2, type: 'success', title: 'Course Completed', message: 'You successfully finished "UI Design Basics"', time: '1h ago', read: false },
    { id: 3, type: 'message', title: 'New Mentor Reply', message: 'Jason Ranti replied to your comment', time: '3h ago', read: true },
];

export default function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
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
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl flex flex-col dark:bg-gray-800"
                    >
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <Bell className="w-5 h-5 text-[#6C5DD3]" />
                                <h2 className="font-bold text-xl dark:text-white">Notifications</h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors dark:hover:bg-gray-700">
                                <X className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {notifications.length === 0 ? (
                                <div className="text-center py-20 text-gray-400">
                                    <Bell className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                    <p>No new notifications</p>
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={clsx(
                                            "p-4 rounded-2xl border transition-all hover:bg-gray-50 dark:hover:bg-gray-700",
                                            notification.read
                                                ? "bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700"
                                                : "bg-[#6C5DD3]/5 border-[#6C5DD3]/10 dark:bg-[#6C5DD3]/10 dark:border-[#6C5DD3]/20"
                                        )}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={clsx(
                                                "p-2 rounded-full shrink-0",
                                                notification.type === 'info' && "bg-blue-100 text-blue-600",
                                                notification.type === 'success' && "bg-green-100 text-green-600",
                                                notification.type === 'message' && "bg-orange-100 text-orange-600",
                                            )}>
                                                {notification.type === 'info' && <Info className="w-4 h-4" />}
                                                {notification.type === 'success' && <CheckCircle className="w-4 h-4" />}
                                                {notification.type === 'message' && <MessageSquare className="w-4 h-4" />}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className={clsx("font-bold text-sm", !notification.read ? "text-[#6C5DD3]" : "dark:text-white")}>
                                                    {notification.title}
                                                </h4>
                                                <p className="text-gray-500 text-xs mt-1 leading-relaxed dark:text-gray-400">{notification.message}</p>
                                                <span className="text-[10px] text-gray-400 mt-2 block font-medium uppercase tracking-wider dark:text-gray-500">{notification.time}</span>
                                            </div>
                                            {!notification.read && (
                                                <div className="w-2 h-2 bg-[#6C5DD3] rounded-full mt-2" />
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                            <button
                                onClick={markAllRead}
                                className="w-full py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
                            >
                                Mark all as read
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
