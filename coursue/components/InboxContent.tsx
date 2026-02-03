"use client";

import { Search, Edit, Phone, Video, MoreVertical, Paperclip, Send, Mic, Image as ImageIcon, ChevronLeft } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const CONVERSATIONS = [
    { id: 1, name: "Jason Ranti", avatar: "https://i.pravatar.cc/150?u=jason", lastMessage: "Can you review my wireframes?", time: "2m", unread: 2 },
    { id: 2, name: "Angelina Lee", avatar: "https://i.pravatar.cc/150?u=angelina", lastMessage: "The meeting is rescheduled.", time: "1h", unread: 0 },
    { id: 3, name: "Design Team", avatar: "https://i.pravatar.cc/150?u=team", lastMessage: "New assets uploaded to drive.", time: "3h", unread: 0, isGroup: true },
];

const MESSAGES = [
    { id: 1, sender: "them", text: "Hey! How is the project coming along?", time: "10:30 AM" },
    { id: 2, sender: "me", text: "Pretty good! I just finished the new dashboard layout.", time: "10:32 AM" },
    { id: 3, sender: "them", text: "Awesome! Can't wait to see it.", time: "10:33 AM" },
    { id: 4, sender: "them", text: "Can you review my wireframes when you have a sec?", time: "10:33 AM" },
];

export default function InboxContent() {
    const [activeChat, setActiveChat] = useState(CONVERSATIONS[0].id);
    const [view, setView] = useState<"list" | "chat">("list");

    const handleChatSelect = (id: number) => {
        setActiveChat(id);
        setView("chat");
    };

    return (
        <div className="flex-1 h-screen bg-[#F5F5F7] p-4 md:p-6 flex flex-col md:flex-row gap-6 overflow-hidden dark:bg-gray-900 transition-colors">
            {/* List Panel */}
            <div className={clsx(
                "w-full md:w-80 flex flex-col bg-white rounded-[2rem] shadow-sm p-6 dark:bg-gray-800",
                view === "chat" ? "hidden md:flex" : "flex"
            )}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Inbox</h2>
                    <button className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600">
                        <Edit className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                </div>

                <div className="relative mb-6">
                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none font-medium focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all dark:bg-gray-900 dark:text-white"
                    />
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                    {CONVERSATIONS.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => handleChatSelect(chat.id)}
                            className={clsx(
                                "flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all",
                                activeChat === chat.id
                                    ? "bg-[#6C5DD3] text-white shadow-lg shadow-[#6C5DD3]/20"
                                    : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                            )}
                        >
                            <div className="relative">
                                <img src={chat.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700" />
                                {chat.unread > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-800" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className={clsx("font-bold truncate", activeChat === chat.id ? "text-white" : "text-gray-900 dark:text-white")}>{chat.name}</h4>
                                    <span className={clsx("text-xs font-medium", activeChat === chat.id ? "text-white/70" : "text-gray-400")}>{chat.time}</span>
                                </div>
                                <p className={clsx("text-xs truncate", activeChat === chat.id ? "text-white/80" : "text-gray-500")}>
                                    {chat.unread > 0 ? <span className="font-bold">{chat.lastMessage}</span> : chat.lastMessage}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat View */}
            <div className={clsx(
                "flex-1 bg-white rounded-[2rem] shadow-sm flex flex-col overflow-hidden dark:bg-gray-800",
                view === "list" ? "hidden md:flex" : "flex"
            )}>
                <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between dark:border-gray-700">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setView("list")}
                            className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors dark:hover:bg-gray-700"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                        </button>
                        <img src={CONVERSATIONS.find(c => c.id === activeChat)?.avatar} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
                        <div>
                            <h3 className="font-bold text-sm md:text-lg text-gray-900 dark:text-white">{CONVERSATIONS.find(c => c.id === activeChat)?.name}</h3>
                            <p className="text-[10px] md:text-xs text-green-500 font-bold flex items-center gap-1">● Online</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                        <button className="p-2 md:p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-gray-600 dark:bg-gray-700 dark:text-gray-300"><Phone className="w-4 h-4 md:w-5 md:h-5" /></button>
                        <button className="p-2 md:p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-gray-600 dark:bg-gray-700 dark:text-gray-300"><Video className="w-4 h-4 md:w-5 md:h-5" /></button>
                        <button className="p-2 md:p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-gray-600 dark:bg-gray-700 dark:text-gray-300"><MoreVertical className="w-4 h-4 md:w-5 md:h-5" /></button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6 bg-gray-50/50 dark:bg-gray-900/50">
                    {MESSAGES.map(msg => (
                        <div key={msg.id} className={clsx("flex gap-3 md:gap-4", msg.sender === 'me' ? "flex-row-reverse" : "")}>
                            <img
                                src={msg.sender === 'me' ? "https://i.pravatar.cc/150?u=user" : CONVERSATIONS.find(c => c.id === activeChat)?.avatar}
                                className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover mt-auto"
                            />
                            <div className={clsx(
                                "max-w-[85%] md:max-w-[70%] p-3 md:p-4 rounded-2xl text-xs md:text-sm font-medium leading-relaxed",
                                msg.sender === 'me'
                                    ? "bg-[#6C5DD3] text-white rounded-br-none"
                                    : "bg-white text-gray-700 rounded-bl-none shadow-sm dark:bg-gray-700 dark:text-gray-200"
                            )}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-3 md:p-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-2xl dark:bg-gray-700">
                        <button className="p-2 text-gray-400 hover:text-[#6C5DD3] transition-colors"><Paperclip className="w-4 h-4 md:w-5 md:h-5" /></button>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-xs md:text-sm font-medium text-gray-700 dark:text-white"
                        />
                        <button className="hidden sm:block p-2 text-gray-400 hover:text-[#6C5DD3] transition-colors"><Mic className="w-5 h-5" /></button>
                        <button className="hidden sm:block p-2 text-gray-400 hover:text-[#6C5DD3] transition-colors"><ImageIcon className="w-5 h-5" /></button>
                        <button className="p-2 md:p-3 bg-[#6C5DD3] text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all">
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
