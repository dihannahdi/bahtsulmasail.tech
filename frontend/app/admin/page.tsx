"use client";

import { motion } from 'framer-motion';
import { fadeUp, stagger, itemVariant, cardVariant } from '../lib/animations';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Admin dashboard sections with enhanced descriptions and icons
const sections = [
  {
    title: 'Scholarly Review',
    description: 'Manage and verify scholarly content through Tashih workflow',
    icon: '📚',
    color: 'emerald',
    path: '/admin/scholarly-review'
  },
  {
    title: 'User Management',
    description: 'Handle user accounts, roles, and permissions',
    icon: '👥',
    color: 'blue',
    path: '/admin/users'
  },
  {
    title: 'Content Management',
    description: 'Organize and structure the knowledge base repository',
    icon: '📝',
    color: 'purple',
    path: '/admin/content'
  },
  {
    title: 'Analytics & Reports',
    description: 'Track system performance, usage metrics and generate insights',
    icon: '📊',
    color: 'amber',
    path: '/admin/analytics'
  },
  {
    title: 'Document Processing',
    description: 'Upload, OCR, and manage Islamic texts and records',
    icon: '🔍',
    color: 'indigo',
    path: '/admin/documents'
  },
  {
    title: 'AI Analysis Tools',
    description: 'Configure AI-powered text analysis and learning tools',
    icon: '🧠',
    color: 'cyan',
    path: '/admin/ai-tools'
  },
  {
    title: 'System Settings',
    description: 'Configure platform settings and security parameters',
    icon: '⚙️',
    color: 'slate',
    path: '/admin/settings'
  },
  {
    title: 'Notification Center',
    description: 'Manage alerts, messages and communication preferences',
    icon: '🔔',
    color: 'rose',
    path: '/admin/notifications'
  }
];

// Quick stat cards with animation delays
const quickStats = [
  { title: 'Pending Reviews', value: 42, icon: '📋', trend: '+12%' },
  { title: 'Active Users', value: 1854, icon: '👤', trend: '+7%' },
  { title: 'Content Items', value: 3689, icon: '📄', trend: '+23%' },
  { title: 'Daily Queries', value: 7320, icon: '🔍', trend: '+18%' }
];

// Recent activities for activity feed
const recentActivities = [
  { 
    id: 1, 
    action: 'Document Verified', 
    user: 'Ahmad Rizky', 
    time: '10 minutes ago',
    details: 'Verified "Contemporary Fiqh Issues in Technology" in Tashih process'
  },
  { 
    id: 2, 
    action: 'New User Registered', 
    user: 'Fatima Hassan', 
    time: '25 minutes ago',
    details: 'Completed profile setup with Scholarly credentials'
  },
  { 
    id: 3, 
    action: 'Content Updated', 
    user: 'Muhammad Yusuf', 
    time: '1 hour ago',
    details: 'Updated section on "Digital Privacy in Islamic Jurisprudence"'
  },
  { 
    id: 4, 
    action: 'Taqrir Khass Submitted', 
    user: 'Dr. Ismail Qasim', 
    time: '3 hours ago',
    details: 'Special report on "Emerging Financial Technologies and Shariah Compliance"'
  },
  { 
    id: 5, 
    action: 'AI Analysis Completed', 
    user: 'System', 
    time: '4 hours ago',
    details: 'Completed textual analysis of "Historical Rulings on Medical Ethics"'
  }
];

// Animation variants for different elements
const pulseAnimation = {
  initial: { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)' },
  animate: {
    boxShadow: ['0 0 0 0 rgba(16, 185, 129, 0)', '0 0 0 10px rgba(16, 185, 129, 0.2)', '0 0 0 0 rgba(16, 185, 129, 0)'],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop" as const
    }
  }
};

const networkAnimation = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { 
    pathLength: 1, 
    opacity: 1,
    transition: { 
      duration: 1.5, 
      ease: "easeInOut" 
    }
  }
};

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading screen with network animation */}
      {isLoading && (
        <motion.div 
          className="fixed inset-0 bg-background flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          onAnimationComplete={() => setIsLoading(false)}
        >
          <motion.div className="relative w-24 h-24">
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-emerald-500/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.2, 0.8], 
                opacity: [0.5, 1, 0.5] 
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="w-full h-full flex items-center justify-center text-emerald-500 text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              BM
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Main admin layout */}
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Sidebar navigation */}
        <motion.aside 
          className="hidden md:flex w-64 flex-col fixed inset-y-0 border-r border-border/50 bg-card/50 backdrop-blur-sm z-30"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="p-4 border-b border-border/50">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold">
                BM
              </div>
              <div>
                <h2 className="font-bold text-lg bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                  BahtsulMasail
                </h2>
                <p className="text-xs text-muted-foreground">Admin Control Center</p>
              </div>
            </motion.div>
          </div>

          <nav className="flex-1 py-4 px-2 overflow-y-auto">
            <motion.div 
              className="space-y-1"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                variants={itemVariant}
                className={cn(
                  "px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer",
                  "hover:bg-emerald-500/10 transition-colors duration-200",
                  activeSection === 'dashboard' && "bg-emerald-500/10 text-emerald-600"
                )}
                onClick={() => setActiveSection('dashboard')}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">🏠</span>
                <span className="font-medium">Dashboard</span>
                {activeSection === 'dashboard' && (
                  <motion.div 
                    className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full"
                    layoutId="activeSection"
                  />
                )}
              </motion.div>

              {sections.slice(0, 5).map((section, index) => (
                <motion.div 
                  key={section.title}
                  variants={itemVariant}
                  className={cn(
                    "px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer",
                    "hover:bg-emerald-500/10 transition-colors duration-200",
                    activeSection === section.title.toLowerCase() && "bg-emerald-500/10 text-emerald-600"
                  )}
                  onClick={() => setActiveSection(section.title.toLowerCase())}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium">{section.title}</span>
                  {activeSection === section.title.toLowerCase() && (
                    <motion.div 
                      className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full"
                      layoutId="activeSection"
                    />
                  )}
                </motion.div>
              ))}

              <motion.div 
                variants={itemVariant}
                className="mt-6 px-3 text-xs uppercase font-semibold text-muted-foreground"
              >
                System
              </motion.div>

              {sections.slice(5).map((section, index) => (
                <motion.div 
                  key={section.title}
                  variants={itemVariant}
                  className={cn(
                    "px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer",
                    "hover:bg-emerald-500/10 transition-colors duration-200",
                    activeSection === section.title.toLowerCase() && "bg-emerald-500/10 text-emerald-600"
                  )}
                  onClick={() => setActiveSection(section.title.toLowerCase())}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium">{section.title}</span>
                  {activeSection === section.title.toLowerCase() && (
                    <motion.div 
                      className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full"
                      layoutId="activeSection"
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </nav>

          <div className="p-4 border-t border-border/50">
            <motion.div 
              className="flex items-center gap-3 px-2 py-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                AD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Admin User</p>
                <p className="text-xs text-muted-foreground">Super Admin</p>
              </div>
              <motion.button
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="text-muted-foreground hover:text-foreground"
              >
                ⚙️
              </motion.button>
            </motion.div>
          </div>
        </motion.aside>

        {/* Main content area */}
        <div className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <motion.header 
            className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/50"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <motion.h1 
                className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Admin Dashboard
              </motion.h1>

              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* Search button */}
                <motion.button
                  className="p-2 rounded-full hover:bg-muted/80 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">🔍</span>
                </motion.button>

                {/* Notification bell */}
                <motion.div className="relative">
                  <motion.button
                    className="p-2 rounded-full hover:bg-muted/80 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <span className="text-lg">🔔</span>
                  </motion.button>
                  {notificationCount > 0 && (
                    <motion.div 
                      className="absolute top-0 right-0 w-5 h-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                      variants={pulseAnimation}
                    >
                      {notificationCount}
                    </motion.div>
                  )}

                  {/* Notification dropdown */}
                  {showNotifications && (
                    <motion.div 
                      className="absolute right-0 mt-2 w-80 bg-card rounded-lg shadow-lg border border-border/50 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-3 border-b border-border/50">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Notifications</h3>
                          <button className="text-xs text-emerald-500 hover:text-emerald-600">
                            Mark all as read
                          </button>
                        </div>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {[1, 2, 3].map((item, i) => (
                          <motion.div
                            key={i}
                            className="p-3 border-b border-border/50 hover:bg-muted/50 cursor-pointer"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <div className="flex gap-3">
                              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <span className="text-sm">📝</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium">New document submitted for review</p>
                                <p className="text-xs text-muted-foreground">10 minutes ago</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="p-2 text-center">
                        <button className="text-sm text-emerald-500 hover:text-emerald-600">
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* User profile */}
                <span className="text-sm text-muted-foreground hidden md:inline-block">Welcome, Admin</span>
                <motion.div 
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold"
                  variants={pulseAnimation}
                >
                  AD
                </motion.div>
              </motion.div>
            </div>
          </motion.header>

          {/* Main scrollable content */}
          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-background to-muted/50 p-4">
            <motion.div 
              className="container mx-auto space-y-6"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              {/* Welcome banner */}
              <motion.div 
                className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30"
                variants={itemVariant}
              >
                <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.5),transparent)]"></div>
                
                <div className="relative p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <motion.h2 
                        className="text-2xl font-bold tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        Welcome to the Illuminated Control Center
                      </motion.h2>
                      <motion.p 
                        className="text-muted-foreground max-w-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        Manage, analyze, and optimize BahtsulMasail.tech platform with intuitive tools and real-time insights.
                      </motion.p>
                    </div>
                    
                    <motion.div
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="hidden md:block">
                        <svg width="80" height="80" viewBox="0 0 100 100" className="text-emerald-500">
                          <motion.circle 
                            cx="50" cy="50" r="40" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            fill="none"
                            variants={networkAnimation}
                            initial="initial"
                            animate="animate"
                          />
                          <motion.path 
                            d="M30,50 L70,50 M50,30 L50,70 M30,30 L70,70 M30,70 L70,30" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            fill="none"
                            variants={networkAnimation}
                            initial="initial"
                            animate="animate"
                          />
                        </svg>
                      </div>
                      <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200 font-medium text-sm">
                        View Platform Status
                      </button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Quick stats grid */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                variants={stagger}
              >
                {quickStats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    variants={itemVariant}
                    className="p-4 rounded-lg border border-border/50 bg-card hover:border-emerald-500/30 transition-colors duration-300 hover:shadow-lg hover:shadow-emerald-500/5"
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                        <motion.h3 
                          className="text-2xl font-bold"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          {stat.value.toLocaleString()}
                        </motion.h3>
                        <span className="text-xs text-emerald-500">{stat.trend}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-xl">
                        {stat.icon}
                      </div>
                    </div>
                    <motion.div 
                      className="mt-4 h-1 bg-gradient-to-r from-emerald-500/50 to-transparent rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Main dashboard grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main sections grid - spans 2 columns */}
                <motion.div 
                  className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4"
                  variants={stagger}
                >
                  {sections.map((section, index) => (
                    <motion.div
                      key={section.title}
                      variants={itemVariant}
                      className={cn(
                        "p-6 rounded-lg border border-border/50 bg-card hover:border-emerald-500/50 transition-colors duration-300",
                        "hover:shadow-lg hover:shadow-emerald-500/10",
                        "group cursor-pointer"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center text-2xl",
                            "bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors"
                          )}
                          whileHover={{ rotate: 5 }}
                        >
                          {section.icon}
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1">{section.title}</h3>
                          <p className="text-sm text-muted-foreground">{section.description}</p>
                        </div>
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ x: 2 }}
                        >
                          →
                        </motion.div>
                      </div>
                      <motion.div 
                        className="mt-4 h-1 bg-gradient-to-r from-emerald-500/50 to-transparent rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Activity feed - spans 1 column */}
                <motion.div 
                  className="rounded-lg border border-border/50 bg-card p-5"
                  variants={itemVariant}
                >
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Recent Activity
                  </h3>
                  
                  <motion.div className="space-y-4" variants={stagger}>
                    {recentActivities.map((activity, index) => (
                      <motion.div 
                        key={activity.id}
                        variants={itemVariant}
                        className="flex gap-3 pb-3 border-b border-border/30 last:border-0"
                      >
                        <div className="mt-0.5 w-2 h-2 rounded-full bg-emerald-500/80"></div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{activity.action}</span>
                            <span className="text-xs text-muted-foreground">{activity.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{activity.details}</p>
                          <p className="text-xs text-emerald-600 mt-1">by {activity.user}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.button
                    className="w-full mt-4 py-2 text-center text-sm text-emerald-600 hover:text-emerald-700 border border-emerald-500/20 rounded-md hover:bg-emerald-500/5 transition-colors"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    View All Activity
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </>
  );
} 