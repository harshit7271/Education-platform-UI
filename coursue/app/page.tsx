"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";
import DashboardContent from "@/components/DashboardContent";
import { Menu, X, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import JoinModal from "@/components/JoinModal";
import LoginScreen from "@/components/LoginScreen";
import SettingsModal from "@/components/SettingsModal";
import ChatWidget from "@/components/ChatWidget";
import NotificationsPanel from "@/components/NotificationsPanel";
import TaskContent from "@/components/TaskContent";
import ProfileModal from "@/components/ProfileModal";
import InboxContent from "@/components/InboxContent";
import LessonContent from "@/components/LessonContent";
import GroupContent from "@/components/GroupContent";
import CourseStoreContent from "@/components/CourseStoreContent";
import CourseDetailModal from "@/components/CourseDetailModal";
import LoginModal from "@/components/LoginModal";
import clsx from "clsx";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Feature Modal States
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsInitialTab, setSettingsInitialTab] = useState("Preferences");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  // Theme State
  const [darkMode, setDarkMode] = useState(true);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isLight = savedTheme === 'light';
    setDarkMode(!isLight);
    if (isLight) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Sync classList and localStorage whenever darkMode changes
  // We use this to ensure the state and the DOM are ALWAYS in sync
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = (isDark?: boolean) => {
    setDarkMode(prev => isDark !== undefined ? isDark : !prev);
  };

  const handleDashboardClick = () => {
    const element = document.getElementById('continue-watching');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    setIsPremium(false);
    setIsLoggedIn(false);
    setActiveTab("Overview");
  };

  const handleActionRequired = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return true; // Indicates auth is required
    }
    return false;
  };

  const openSettings = (tab: string) => {
    setSettingsInitialTab(tab);
    setIsSettingsOpen(true);
  };

  // Content Routing
  const renderContent = () => {
    switch (activeTab) {
      case "Task": return <TaskContent isLoggedIn={isLoggedIn} onAuthRequired={handleActionRequired} />;
      case "Inbox": return <InboxContent />;
      case "Lesson": return <LessonContent isLoggedIn={isLoggedIn} onAuthRequired={handleActionRequired} />;
      case "Group": return <GroupContent isLoggedIn={isLoggedIn} onAuthRequired={handleActionRequired} />;
      case "Courses": return <CourseStoreContent isLoggedIn={isLoggedIn} onAuthRequired={handleActionRequired} />;
      case "Settings":
        return <DashboardContent
          activeTab="Overview"
          onJoinClick={() => setIsJoinModalOpen(true)}
          onDashboardClick={handleDashboardClick}
          isLoggedIn={isLoggedIn}
          onAuthRequired={handleActionRequired}
          isPremium={isPremium}
        />;
      default: return <DashboardContent
        activeTab={activeTab}
        onJoinClick={() => setIsJoinModalOpen(true)}
        onDashboardClick={handleDashboardClick}
        isLoggedIn={isLoggedIn}
        onAuthRequired={handleActionRequired}
        isPremium={isPremium}
        onCourseClick={setSelectedCourse}
      />;
    }
  };

  return (
    <div className={clsx(
      "flex min-h-screen font-sans transition-all duration-300",
      darkMode ? "dark bg-gray-900 text-white" : "bg-[#F5F5F7] text-gray-900"
    )}>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onJoin={() => setIsPremium(true)}
      />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        initialTab={settingsInitialTab}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
      <CourseDetailModal
        isOpen={!!selectedCourse}
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
      <ChatWidget
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
      <NotificationsPanel
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Desktop Sidebar - Hidden on Mobile */}
      <Sidebar
        className="hidden md:flex sticky top-0"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSettingsClick={() => openSettings("Preferences")}
        onLogoutClick={handleLogout}
        onAuthRequired={() => setIsLoginModalOpen(true)}
        isLoggedIn={isLoggedIn}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Mobile Header - Visible only on Mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white z-40 flex items-center justify-between px-4 shadow-sm dark:bg-gray-800 dark:text-white">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span>Coursue</span>
          <Sparkles className="w-5 h-5 text-[#6C5DD3] fill-current" />
        </div>
        <button onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="w-6 h-6 text-[#171717] dark:text-white" />
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:flex pt-16 md:pt-0 overflow-hidden h-screen">
        {renderContent()}
      </main>

      {/* Desktop Right Sidebar - Hidden on Tablets/Mobile */}
      <RightSidebar
        onChatClick={() => setIsChatOpen(true)}
        onNotificationClick={() => setIsNotificationsOpen(true)}
        onProfileClick={() => setIsProfileOpen(true)}
      />

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden glass-effect"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-white z-50 md:hidden shadow-2xl"
            >
              <div className="p-4 flex justify-end">
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <div className="h-full overflow-y-auto">
                <Sidebar
                  className="w-full h-full border-none shadow-none"
                  activeTab={activeTab}
                  setActiveTab={(tab) => {
                    setActiveTab(tab);
                    setIsMobileMenuOpen(false);
                  }}
                  onAuthRequired={() => setIsLoginModalOpen(true)}
                  isLoggedIn={isLoggedIn}
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
