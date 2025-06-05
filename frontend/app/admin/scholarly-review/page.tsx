"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { fadeUp, stagger, itemVariant, cardVariant } from '../../lib/animations';

// Scholarly review workflow statuses
const workflowStatuses = [
  { id: 'awaiting', name: 'Awaiting Review', color: 'amber', count: 8 },
  { id: 'in_progress', name: 'In Progress', color: 'blue', count: 12 },
  { id: 'returned', name: 'Returned for Revision', color: 'rose', count: 3 },
  { id: 'verified', name: 'Verified', color: 'emerald', count: 22 }
];

// Mock data for review items
const reviewItems = [
  {
    id: 'doc-1',
    title: 'Contemporary Fiqh Issues in Technology',
    author: 'Dr. Ahmad Rizky',
    submittedDate: '2023-07-15',
    status: 'awaiting',
    priority: 'high',
    type: 'tashih',
    excerpt: 'Analysis of digital privacy concerns through the lens of Islamic jurisprudence...',
    reviewers: ['Ustadz Muhammad Yusuf', 'Syaikh Abdullah Hassan'],
    lastActivity: '2 hours ago'
  },
  {
    id: 'doc-2',
    title: 'Medical Ethics in Islamic Perspective',
    author: 'Prof. Fatima Hassan',
    submittedDate: '2023-07-10',
    status: 'in_progress',
    priority: 'medium',
    type: 'tashih',
    excerpt: 'Examination of organ transplantation rulings and modern medical procedures...',
    reviewers: ['Dr. Ismail Qasim', 'Ustadz Muhammad Yusuf'],
    lastActivity: '4 hours ago'
  },
  {
    id: 'doc-3',
    title: 'Digital Currency and Riba Considerations',
    author: 'Dr. Ibrahim Ahmad',
    submittedDate: '2023-07-05',
    status: 'in_progress',
    priority: 'high',
    type: 'taqrir_khass',
    excerpt: 'Special report on cryptocurrencies and their compliance with Islamic finance principles...',
    reviewers: ['Syaikh Abdullah Hassan', 'Prof. Fatima Hassan'],
    lastActivity: '1 day ago'
  },
  {
    id: 'doc-4',
    title: 'Family Law in Modern Context',
    author: 'Ustadzah Aminah Zakariya',
    submittedDate: '2023-07-01',
    status: 'returned',
    priority: 'medium',
    type: 'tashih',
    excerpt: 'Analysis of marriage, divorce, and inheritance in contemporary societies...',
    reviewers: ['Dr. Ismail Qasim'],
    lastActivity: '2 days ago'
  },
  {
    id: 'doc-5',
    title: 'Artificial Intelligence: Ethical Framework',
    author: 'Prof. Zayd Malik',
    submittedDate: '2023-06-25',
    status: 'verified',
    priority: 'high',
    type: 'taqrir_khass',
    excerpt: 'Comprehensive analysis of AI technologies through Islamic ethical principles...',
    reviewers: ['Ustadz Muhammad Yusuf', 'Dr. Ibrahim Ahmad'],
    lastActivity: '1 week ago'
  }
];

// Animation variants
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

export default function ScholarlyReviewPage() {
  const [activeStatus, setActiveStatus] = useState('awaiting');
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('kanban');
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [showReviewPanel, setShowReviewPanel] = useState(false);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter items by current active status
  const filteredItems = reviewItems.filter(item => item.status === activeStatus);

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

      {/* Main content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header with breadcrumb */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/admin" className="hover:text-emerald-500 transition-colors">
              Dashboard
            </Link>
            <span>→</span>
            <motion.span 
              className="text-foreground font-medium"
              initial={{ color: "#64748b" }}
              animate={{ color: "#10b981" }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Scholarly Review
            </motion.span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              The Crucible of Verification
            </motion.h1>
            
            <motion.div 
              className="flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* View toggles */}
              <div className="flex bg-muted rounded-lg p-1">
                <motion.button
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-md transition-colors",
                    currentView === 'kanban' ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setCurrentView('kanban')}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  Kanban
                </motion.button>
                <motion.button
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-md transition-colors",
                    currentView === 'list' ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setCurrentView('list')}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  List
                </motion.button>
              </div>
              
              <motion.button
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200 font-medium text-sm flex items-center gap-2"
                whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)" }}
                whileTap={{ y: 0, boxShadow: "0 0 0 rgba(16, 185, 129, 0)" }}
              >
                <span>New Review</span>
                <span>+</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Workflow status tabs */}
        <motion.div 
          className="mb-8 border-b border-border"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-wrap gap-1">
            {workflowStatuses.map((status, index) => (
              <motion.button
                key={status.id}
                className={cn(
                  "px-4 py-2 text-sm font-medium relative",
                  activeStatus === status.id ? "text-emerald-600" : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setActiveStatus(status.id)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                {status.name}
                <span className="ml-2 bg-muted px-1.5 py-0.5 rounded-full text-xs">
                  {status.count}
                </span>
                
                {activeStatus === status.id && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                    layoutId="activeStatusIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Kanban view */}
        {currentView === 'kanban' && (
          <motion.div
            className="grid grid-cols-1 gap-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="space-y-4"
              variants={stagger}
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="p-4 rounded-lg border border-border bg-card hover:border-emerald-500/30 transition-all duration-300 cursor-pointer"
                  variants={cardVariant}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 10px 30px -10px rgba(16, 185, 129, 0.15)",
                    borderColor: "rgba(16, 185, 129, 0.5)"
                  }}
                  onClick={() => {
                    setSelectedDocument(item.id);
                    setShowReviewPanel(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <motion.div 
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs",
                          item.type === 'tashih' ? "bg-blue-500" : "bg-purple-500"
                        )}
                        whileHover={{ rotate: 10 }}
                      >
                        {item.type === 'tashih' ? "TS" : "TK"}
                      </motion.div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-xs text-muted-foreground">by {item.author}</p>
                      </div>
                    </div>
                    <div className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      item.priority === 'high' ? "bg-rose-500/10 text-rose-600" : "bg-amber-500/10 text-amber-600"
                    )}>
                      {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>Active {item.lastActivity}</span>
                    </div>
                    
                    <div className="flex -space-x-2">
                      {item.reviewers.map((reviewer, i) => (
                        <motion.div 
                          key={i}
                          className="w-6 h-6 rounded-full bg-emerald-500/20 border border-background flex items-center justify-center text-xs"
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          whileHover={{ y: -2, zIndex: 10 }}
                        >
                          {reviewer.split(' ').map(name => name[0]).join('')}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
        
        {/* List view */}
        {currentView === 'list' && (
          <motion.div
            className="rounded-lg border border-border overflow-hidden"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Document</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Author</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Submitted</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Priority</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Reviewers</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Activity</th>
                    <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {filteredItems.map((item, index) => (
                    <motion.tr 
                      key={item.id}
                      className="hover:bg-muted/30 cursor-pointer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.05)" }}
                      onClick={() => {
                        setSelectedDocument(item.id);
                        setShowReviewPanel(true);
                      }}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">{item.title}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{item.author}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          item.type === 'tashih' ? "bg-blue-500/10 text-blue-600" : "bg-purple-500/10 text-purple-600"
                        )}>
                          {item.type === 'tashih' ? "Tashih" : "Taqrir Khass"}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{item.submittedDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          item.priority === 'high' ? "bg-rose-500/10 text-rose-600" : "bg-amber-500/10 text-amber-600"
                        )}>
                          {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex -space-x-2">
                          {item.reviewers.map((reviewer, i) => (
                            <div 
                              key={i}
                              className="w-6 h-6 rounded-full bg-emerald-500/20 border border-background flex items-center justify-center text-xs"
                            >
                              {reviewer.split(' ').map(name => name[0]).join('')}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>{item.lastActivity}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                        <motion.button 
                          className="text-emerald-500 hover:text-emerald-600 font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Review
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
        
        {/* Document review panel - appears when a document is selected */}
        {showReviewPanel && selectedDocument && (
          <motion.div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="w-full max-w-2xl bg-card border-l border-border h-full overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="sticky top-0 bg-card z-10 border-b border-border p-4 flex items-center justify-between">
                <h2 className="font-semibold">Document Review</h2>
                <motion.button 
                  className="p-2 rounded-full hover:bg-muted"
                  onClick={() => setShowReviewPanel(false)}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  ✕
                </motion.button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Selected document details */}
                {(() => {
                  const doc = reviewItems.find(item => item.id === selectedDocument);
                  if (!doc) return null;
                  
                  return (
                    <>
                      <div className="space-y-4">
                        <motion.div 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center text-white text-sm",
                            doc.type === 'tashih' ? "bg-blue-500" : "bg-purple-500"
                          )}>
                            {doc.type === 'tashih' ? "TS" : "TK"}
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-lg font-medium">{doc.title}</h3>
                            <p className="text-sm text-muted-foreground">by {doc.author}</p>
                            <div className="flex gap-2 mt-1">
                              <span className={cn(
                                "px-2 py-0.5 rounded-full text-xs font-medium",
                                doc.priority === 'high' ? "bg-rose-500/10 text-rose-600" : "bg-amber-500/10 text-amber-600"
                              )}>
                                {doc.priority.charAt(0).toUpperCase() + doc.priority.slice(1)} Priority
                              </span>
                              <span className={cn(
                                "px-2 py-0.5 rounded-full text-xs font-medium",
                                doc.type === 'tashih' ? "bg-blue-500/10 text-blue-600" : "bg-purple-500/10 text-purple-600"
                              )}>
                                {doc.type === 'tashih' ? "Tashih" : "Taqrir Khass"}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Workflow stepper */}
                        <motion.div 
                          className="mt-6 mb-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <h4 className="text-sm font-medium mb-3">Review Workflow</h4>
                          <div className="flex items-center">
                            {workflowStatuses.map((status, index) => (
                              <div key={status.id} className="flex items-center flex-1">
                                <div className="relative flex flex-col items-center">
                                  <motion.div 
                                    className={cn(
                                      "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm border-2",
                                      status.id === doc.status || workflowStatuses.findIndex(s => s.id === doc.status) > index
                                        ? "bg-emerald-500 border-emerald-500"
                                        : "bg-card border-muted-foreground/30"
                                    )}
                                    whileHover={{ scale: 1.1 }}
                                  >
                                    {workflowStatuses.findIndex(s => s.id === doc.status) > index ? "✓" : index + 1}
                                  </motion.div>
                                  <span className="text-xs mt-1 text-center">{status.name}</span>
                                </div>
                                
                                {index < workflowStatuses.length - 1 && (
                                  <motion.div 
                                    className={cn(
                                      "h-0.5 flex-1",
                                      workflowStatuses.findIndex(s => s.id === doc.status) > index
                                        ? "bg-emerald-500"
                                        : "bg-muted-foreground/30"
                                    )}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Document content preview */}
                      <motion.div 
                        className="mt-8 space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h4 className="font-medium">Document Preview</h4>
                        <div className="p-4 rounded-lg border border-border bg-card/50">
                          <p className="text-sm">{doc.excerpt}</p>
                          <p className="text-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fermentum varius nisl, ut tempor dui sagittis vel. Nullam vitae lacus eget est rhoncus pellentesque in ut velit.</p>
                          <div className="flex justify-center my-3">
                            <motion.button 
                              className="text-emerald-500 text-sm hover:text-emerald-600 font-medium flex items-center gap-1"
                              whileHover={{ y: -2 }}
                            >
                              <span>Open full document</span>
                              <span>↗</span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Review tools */}
                      <motion.div 
                        className="mt-8 space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h4 className="font-medium">Review Notes</h4>
                        <div className="p-4 rounded-lg border border-border">
                          <textarea 
                            className="w-full min-h-[120px] bg-background rounded-md p-3 text-sm focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
                            placeholder="Add your scholarly review notes here..."
                          />
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <motion.button
                            className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200 font-medium text-sm"
                            whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)" }}
                            whileTap={{ y: 0 }}
                          >
                            Approve & Verify
                          </motion.button>
                          
                          <motion.button
                            className="flex-1 px-4 py-2 border border-rose-500/30 text-rose-600 hover:bg-rose-500/10 rounded-lg transition-colors duration-200 font-medium text-sm"
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                          >
                            Return for Revision
                          </motion.button>
                        </div>
                      </motion.div>
                      
                      {/* Review history */}
                      <motion.div 
                        className="mt-8 space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <h4 className="font-medium">Review History</h4>
                        <div className="space-y-3">
                          <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                            <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-xs">
                              MY
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">Ustadz Muhammad Yusuf</p>
                                <p className="text-xs text-muted-foreground">2 days ago</p>
                              </div>
                              <p className="text-sm mt-1">Initial review completed. The document provides a comprehensive analysis but requires additional citations from classical texts.</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  );
} 