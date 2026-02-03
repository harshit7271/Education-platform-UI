"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Paperclip } from "lucide-react";
import { useState } from "react";
import { FRIENDS } from "@/lib/constants";
import clsx from "clsx";

interface ChatWidgetProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ChatWidget({ isOpen, onClose }: ChatWidgetProps) {
    const [selectedFriend, setSelectedFriend] = useState<typeof FRIENDS[0] | null>(null);
    const [messages, setMessages] = useState<{ text: string, sender: 'me' | 'them' }[]>([
        { text: "Hey! How's the course going?", sender: 'them' },
    ]);
    const [inputText, setInputText] = useState("");

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        setMessages([...messages, { text: inputText, sender: 'me' }]);
        setInputText("");

        // Auto-reply simulation
        setTimeout(() => {
            setMessages(prev => [...prev, { text: "That sounds awesome! Keep it up! 🔥", sender: 'them' }]);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-[2rem] shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-100 dark:bg-gray-800 dark:border-gray-700"
                >
                    {/* Header */}
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 dark:border-gray-700 dark:bg-gray-900/50">
                        {selectedFriend ? (
                            <div className="flex items-center gap-3">
                                <button onClick={() => setSelectedFriend(null)} className="text-sm text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">Back</button>
                                <img src={selectedFriend.avatar} className="w-8 h-8 rounded-full" />
                                <div>
                                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">{selectedFriend.name}</h4>
                                    <span className="text-xs text-green-500 flex items-center gap-1">● Online</span>
                                </div>
                            </div>
                        ) : (
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Messages</h3>
                        )}
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors dark:hover:bg-gray-700">
                            <X className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
                        {selectedFriend ? (
                            <div className="p-4 space-y-4">
                                {messages.map((msg, i) => (
                                    <div key={i} className={clsx("flex", msg.sender === 'me' ? "justify-end" : "justify-start")}>
                                        <div className={clsx(
                                            "max-w-[80%] px-4 py-2 rounded-2xl text-sm font-medium",
                                            msg.sender === 'me'
                                                ? "bg-[#6C5DD3] text-white rounded-br-none"
                                                : "bg-gray-100 text-gray-700 rounded-bl-none dark:bg-gray-800 dark:text-gray-200"
                                        )}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-2">
                                {FRIENDS.map(friend => (
                                    <button
                                        key={friend.name}
                                        onClick={() => setSelectedFriend(friend)}
                                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-2xl transition-colors text-left group dark:hover:bg-gray-800"
                                    >
                                        <div className="relative">
                                            <img src={friend.avatar} className="w-12 h-12 rounded-full object-cover group-hover:shadow-md transition-shadow" />
                                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full dark:border-gray-800"></span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900 dark:text-white">{friend.name}</h4>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{friend.status}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    {selectedFriend && (
                        <form onSubmit={handleSend} className="p-4 border-t border-gray-100 flex items-center gap-2 bg-gray-50/30 dark:border-gray-700 dark:bg-gray-900/30">
                            <button type="button" className="p-2 text-gray-400 hover:text-[#6C5DD3] transition-colors dark:text-gray-500 dark:hover:text-[#6C5DD3]">
                                <Paperclip className="w-5 h-5" />
                            </button>
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-white border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#6C5DD3]/20 shadow-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            />
                            <button
                                type="submit"
                                className="p-2 bg-[#6C5DD3] text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
