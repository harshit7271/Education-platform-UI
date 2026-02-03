"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, MoreHorizontal, Clock, CheckCircle2 } from "lucide-react";
import clsx from "clsx";
import AddTaskModal from "./AddTaskModal";

const INITIAL_TASKS = {
    todo: [
        { id: 1, title: 'Watch "UI Design Principles"', course: 'UI/UX Design', time: '20 mins', priority: 'high' },
        { id: 2, title: 'Read "Color Theory" Article', course: 'Graphic Design', time: '10 mins', priority: 'medium' },
    ],
    inProgress: [
        { id: 3, title: 'Complete "Wireframing" Assignment', course: 'UI/UX Design', progress: 65, priority: 'high' },
    ],
    done: [
        { id: 4, title: 'Introduction Quiz', course: 'Design Systems', score: '100%', priority: 'low' },
    ]
};

interface TaskContentProps {
    isLoggedIn?: boolean;
    onAuthRequired?: () => void;
}

export default function TaskContent({ isLoggedIn, onAuthRequired }: TaskContentProps) {
    const [tasks, setTasks] = useState(INITIAL_TASKS);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleAction = (callback: () => void) => {
        if (!isLoggedIn && onAuthRequired) {
            onAuthRequired();
            return;
        }
        callback();
    };

    const handleAddTask = (newTask: { title: string; course: string; time: string; priority: string }) => {
        const task = {
            id: Date.now(),
            ...newTask
        };
        setTasks(prev => ({
            ...prev,
            todo: [...prev.todo, task]
        }));
    };

    return (
        <div className="flex-1 min-h-screen bg-[#F5F5F7] p-4 md:p-8 overflow-y-auto overflow-x-hidden dark:bg-gray-900 transition-colors">
            <AddTaskModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddTask}
            />

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Tasks</h1>
                    <p className="text-gray-500 text-sm dark:text-gray-400">Manage your learning schedule</p>
                </div>
                <button
                    onClick={() => handleAction(() => setIsAddModalOpen(true))}
                    className="flex items-center gap-2 px-4 py-2 bg-[#171717] text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all dark:bg-[#6C5DD3]"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Task</span>
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* To Do Column */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <h3 className="font-bold text-gray-500 uppercase text-xs tracking-wider flex items-center gap-2 dark:text-gray-400">
                            <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
                            To Do
                            <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-[10px] dark:bg-gray-700 dark:text-gray-300">{tasks.todo.length}</span>
                        </h3>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><MoreHorizontal className="w-5 h-5" /></button>
                    </div>
                    <div className="space-y-3">
                        {tasks.todo.map((task, i) => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer border border-transparent hover:border-[#6C5DD3]/20 dark:bg-gray-800 dark:hover:border-[#6C5DD3]/40"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={clsx(
                                        "px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide",
                                        task.priority === 'high' ? "bg-red-100 text-red-600" :
                                            task.priority === 'medium' ? "bg-blue-100 text-blue-600" :
                                                "bg-green-100 text-green-600"
                                    )}>
                                        {task.priority}
                                    </span>
                                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-1 dark:text-white">{task.title}</h4>
                                <p className="text-xs text-gray-400 mb-3 dark:text-gray-500">{task.course}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium bg-gray-50 p-2 rounded-lg dark:bg-gray-700 dark:text-gray-300">
                                    <Clock className="w-3 h-3" />
                                    {task.time}
                                </div>
                            </motion.div>
                        ))}
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold text-sm hover:border-[#6C5DD3] hover:text-[#6C5DD3] transition-colors flex items-center justify-center gap-2 dark:border-gray-700 dark:hover:border-[#6C5DD3]/50"
                        >
                            <Plus className="w-4 h-4" />
                            Add New Task
                        </button>
                    </div>
                </div>

                {/* In Progress Column */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <h3 className="font-bold text-[#6C5DD3] uppercase text-xs tracking-wider flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#6C5DD3]" />
                            In Progress
                            <span className="bg-[#6C5DD3]/10 text-[#6C5DD3] px-2 py-0.5 rounded-full text-[10px] dark:bg-[#6C5DD3]/20">{tasks.inProgress.length}</span>
                        </h3>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><MoreHorizontal className="w-5 h-5" /></button>
                    </div>
                    <div className="space-y-3">
                        {tasks.inProgress.map((task, i) => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer dark:bg-gray-800"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide bg-orange-100 text-orange-600">
                                        {task.priority}
                                    </span>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-1 dark:text-white">{task.title}</h4>
                                <p className="text-xs text-gray-400 mb-4 dark:text-gray-500">{task.course}</p>

                                <div className="relative pt-1">
                                    <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-1 dark:text-gray-400">
                                        <span>Progress</span>
                                        <span>{task.progress}%</span>
                                    </div>
                                    <div className="overflow-hidden h-2 mb-2 text-xs flex rounded-full bg-gray-100 dark:bg-gray-700">
                                        <div style={{ width: `${task.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#6C5DD3] rounded-full"></div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Done Column */}
                <div className="flex-1 min-w-[300px]">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <h3 className="font-bold text-green-500 uppercase text-xs tracking-wider flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            Completed
                            <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-[10px]">{tasks.done.length}</span>
                        </h3>
                        <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5" /></button>
                    </div>
                    <div className="space-y-3">
                        {tasks.done.map((task, i) => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-4 rounded-2xl shadow-sm opacity-60 hover:opacity-100 transition-opacity cursor-pointer group dark:bg-gray-800"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    <h4 className="font-bold text-gray-900 line-through decoration-gray-400 dark:text-white dark:decoration-gray-500">{task.title}</h4>
                                </div>
                                <div className="flex items-center justify-between pl-8">
                                    <p className="text-xs text-gray-400 dark:text-gray-500">{task.course}</p>
                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg dark:bg-green-900/20">Score: {task.score}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
