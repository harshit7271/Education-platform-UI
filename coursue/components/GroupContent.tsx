"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, MessageCircle, Heart, Share2, Plus } from "lucide-react";
import CreateGroupModal from "./CreateGroupModal";

const INITIAL_GROUPS = [
    { id: 1, name: "UI/UX Designers", members: 1240, active: 45, image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=150&h=150", category: "Design" },
    { id: 2, name: "Frontend Masters", members: 890, active: 120, image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=150&h=150", category: "Development" },
    { id: 3, name: "Product Managers", members: 560, active: 30, image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=150&h=150", category: "Product" },
];

const DISCUSSIONS = [
    { id: 1, author: "Sarah Jenkins", avatar: "https://i.pravatar.cc/150?u=sarah", title: "Best tools for wireframing in 2024?", likes: 45, comments: 12, time: "2h ago", tag: "Discussion" },
    { id: 2, author: "Mike Ross", avatar: "https://i.pravatar.cc/150?u=mike", title: "How to handle accessibility handoffs?", likes: 32, comments: 8, time: "5h ago", tag: "Question" },
];

interface GroupContentProps {
    isLoggedIn?: boolean;
    onAuthRequired?: () => void;
}

export default function GroupContent({ isLoggedIn, onAuthRequired }: GroupContentProps) {
    const [groups, setGroups] = useState(INITIAL_GROUPS);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleAction = (callback: () => void) => {
        if (!isLoggedIn && onAuthRequired) {
            onAuthRequired();
            return;
        }
        callback();
    };

    const handleCreateGroup = (newGroup: { name: string; category: string; image: string }) => {
        const group = {
            id: Date.now(),
            members: 1,
            active: 1,
            ...newGroup
        };
        setGroups(prev => [group, ...prev]);
    };

    return (
        <div className="flex-1 min-h-screen bg-[#F5F5F7] p-4 md:p-8 overflow-y-auto dark:bg-gray-900 transition-colors">
            <CreateGroupModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateGroup}
            />

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Community</h1>
                    <p className="text-gray-500 text-sm mt-1">Connect with like-minded learners</p>
                </div>
                <button
                    onClick={() => handleAction(() => setIsCreateModalOpen(true))}
                    className="px-6 py-3 bg-[#171717] text-white rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-colors flex items-center gap-2 dark:bg-[#6C5DD3] dark:hover:bg-[#5a4cb4]"
                >
                    <Plus className="w-5 h-5" />
                    Create Group
                </button>
            </div>

            {/* Featured Groups */}
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 dark:text-white">
                <Users className="w-5 h-5 text-[#6C5DD3]" />
                Your Groups
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {groups.map((group, i) => (
                    <motion.div
                        key={group.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-lg transition-all group dark:bg-gray-800"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <img src={group.image} className="w-16 h-16 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                            <div>
                                <h3 className="font-bold text-lg dark:text-white">{group.name}</h3>
                                <span className="text-xs font-bold text-[#6C5DD3] bg-[#6C5DD3]/10 px-2 py-1 rounded-lg">{group.category}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                {group.members} Members
                            </div>
                            <div className="text-green-500 font-bold text-xs">
                                {group.active} Online
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Discussions */}
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 dark:text-white">
                <MessageCircle className="w-5 h-5 text-orange-500" />
                Trending Discussions
            </h2>
            <div className="space-y-4">
                {DISCUSSIONS.map((post, i) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                                <img src={post.author} className="w-12 h-12 rounded-full border-2 border-gray-100" />
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900 mb-1 hover:text-[#6C5DD3] transition-colors cursor-pointer dark:text-white">{post.title}</h4>
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <span>{post.author}</span>
                                        <span>•</span>
                                        <span>{post.time}</span>
                                        <span>•</span>
                                        <span className="bg-gray-100 px-2 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">{post.tag}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="p-2 text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5" /></button>
                        </div>

                        <div className="flex items-center gap-6 mt-6 ml-16">
                            <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-sm font-bold group">
                                <Heart className="w-5 h-5 group-hover:fill-current" />
                                {post.likes}
                            </button>
                            <button className="flex items-center gap-2 text-gray-500 hover:text-[#6C5DD3] transition-colors text-sm font-bold">
                                <MessageCircle className="w-5 h-5" />
                                {post.comments} Comments
                            </button>
                            <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors text-sm font-bold ml-auto">
                                <Share2 className="w-5 h-5" />
                                Share
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function MoreHorizontal({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
    );
}
