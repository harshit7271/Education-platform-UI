"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, PlayCircle, BookOpen, Download, User, Clock, CheckCircle2 } from "lucide-react";
import clsx from "clsx";

interface CourseDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    course: {
        title: string;
        watched: number;
        total: number;
        color: string;
        iconColor: string;
    } | null;
}

export default function CourseDetailModal({ isOpen, onClose, course }: CourseDetailModalProps) {
    if (!course) return null;

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
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white w-full max-w-4xl h-[85vh] rounded-[2.5rem] shadow-2xl pointer-events-auto flex flex-col overflow-hidden dark:bg-gray-800 dark:text-white transition-colors relative">
                            {/* Hero Header */}
                            <div className={clsx("h-48 relative p-8 flex flex-col justify-between shrink-0", course.color.split(' ')[0])}>
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 p-2 bg-white/50 hover:bg-white rounded-full transition-all backdrop-blur-sm dark:bg-black/40 dark:text-white z-50 hover:scale-110 active:scale-95 shadow-lg group"
                                >
                                    <X className="w-5 h-5 text-gray-900 dark:text-white group-hover:rotate-90 transition-transform" />
                                </button>

                                <div className="z-10">
                                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-900 shadow-sm mb-4 inline-block">
                                        Course Detail
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-900 leading-tight">
                                        {course.title}
                                        <span className="block text-lg font-medium opacity-60 mt-1">Master Class Series</span>
                                    </h2>
                                </div>

                                {/* Abstract Shapes */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                            </div>

                            {/* Content Body */}
                            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

                                {/* Left: Syllabus */}
                                <div className="flex-1 overflow-y-auto p-8 border-r border-gray-100 dark:border-gray-700">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-[#6C5DD3]" />
                                        Success Path
                                    </h3>

                                    <div className="space-y-8 relative pl-2">
                                        {/* Vertical Line */}
                                        <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-gray-100 dark:bg-gray-700" />

                                        {Array.from({ length: course.total }).map((_, i) => {
                                            const isCompleted = i < course.watched;
                                            const isCurrent = i === course.watched;
                                            return (
                                                <div key={i} className="relative flex gap-6 group">
                                                    <div className={clsx(
                                                        "relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 transition-all",
                                                        isCompleted ? "bg-[#6C5DD3] border-[#6C5DD3] text-white" :
                                                            isCurrent ? "bg-white border-[#6C5DD3] text-[#6C5DD3]" :
                                                                "bg-white border-gray-100 text-gray-300 dark:bg-gray-800 dark:border-gray-700"
                                                    )}>
                                                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span className="font-bold text-sm">{i + 1}</span>}
                                                    </div>
                                                    <div className={clsx(
                                                        "flex-1 p-5 rounded-2xl transition-all cursor-pointer border",
                                                        isCurrent ? "bg-gray-50 border-gray-200 shadow-sm dark:bg-gray-700 dark:border-gray-600" :
                                                            "bg-white border-transparent hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50"
                                                    )}>
                                                        <h4 className={clsx("font-bold mb-1", isCompleted ? "text-gray-900 dark:text-gray-300" : "text-gray-500")}>
                                                            Module {i + 1}: {getModuleTitle(course.title, i)}
                                                        </h4>
                                                        <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
                                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 45 mins</span>
                                                            <span className="flex items-center gap-1"><PlayCircle className="w-3 h-3" /> Video</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Right: Info & Resources */}
                                <div className="w-full md:w-80 bg-gray-50 p-8 overflow-y-auto dark:bg-gray-900">
                                    <div className="mb-8">
                                        <h3 className="font-bold text-gray-900 mb-4 dark:text-white">Instructor</h3>
                                        <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm dark:bg-gray-800">
                                            <img src="https://i.pravatar.cc/150?u=instructor" className="w-12 h-12 rounded-full object-cover" />
                                            <div>
                                                <p className="font-bold text-sm dark:text-white">Sarah Wilson</p>
                                                <p className="text-xs text-gray-500">Senior Designer</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h3 className="font-bold text-gray-900 mb-4 dark:text-white">Your Progress</h3>
                                        <div className="bg-white p-6 rounded-[2rem] shadow-sm text-center dark:bg-gray-800">
                                            <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                                                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#6C5DD3" strokeWidth="3" strokeDasharray={`${(course.watched / course.total) * 100}, 100`} />
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-2xl font-bold dark:text-white">{Math.round((course.watched / course.total) * 100)}%</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {course.watched} of {course.total} Lessons Completed
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-4 dark:text-white">Resources</h3>
                                        <div className="space-y-3">
                                            {['Course Files.zip', 'Reading List.pdf', 'Figma Kit.fig'].map((file) => (
                                                <button key={file} className="w-full flex items-center justify-between p-3 bg-white rounded-xl shadow-sm hover:translate-x-1 transition-transform dark:bg-gray-800">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg dark:bg-gray-700 dark:text-blue-400">
                                                            <Download className="w-4 h-4" />
                                                        </div>
                                                        <span className="text-sm font-medium dark:text-gray-300">{file}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Footer / CTA */}
                            <div className="p-6 border-t border-gray-100 bg-white flex justify-end gap-4 dark:bg-gray-800 dark:border-gray-700">
                                <button onClick={onClose} className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors dark:hover:bg-gray-700">Close</button>
                                <button className="px-8 py-3 bg-[#171717] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all dark:bg-[#6C5DD3]">
                                    Resume Learning
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// Helper to generate fake titles for the deeper experience
function getModuleTitle(courseTitle: string, index: number) {
    const titles = [
        "Introduction & Overview",
        "Core Principles Deep Dive",
        "Tools of the Trade",
        "Advanced Techniques",
        "Case Study Analysis",
        "Practical Application",
        "Industry Best Practices",
        "Final Project Brief"
    ];
    return titles[index] || `Lesson ${index + 1}`;
}
