"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { fadeUp, stagger, itemVariant, cardVariant } from '../../lib/animations';

// Mock user data
const users = [
  {
    id: 'user-1',
    name: 'Dr. Ahmad Rizky',
    email: 'ahmad.rizky@example.com',
    role: 'Scholar',
    status: 'active',
    joinDate: '2023-01-15',
    contributions: 24,
    lastActive: '2 hours ago',
    avatar: 'AR'
  },
  {
    id: 'user-2',
    name: 'Fatima Hassan',
    email: 'fatima.hassan@example.com',
    role: 'Editor',
    status: 'active',
    joinDate: '2023-03-22',
    contributions: 37,
    lastActive: '1 day ago',
    avatar: 'FH'
  },
  {
    id: 'user-3',
    name: 'Muhammad Yusuf',
    email: 'muhammad.yusuf@example.com',
    role: 'Scholar',
    status: 'active',
    joinDate: '2023-02-10',
    contributions: 18,
    lastActive: '5 hours ago',
    avatar: 'MY'
  },
  {
    id: 'user-4',
    name: 'Dr. Ismail Qasim',
    email: 'ismail.qasim@example.com',
    role: 'Senior Scholar',
    status: 'active',
    joinDate: '2022-11-05',
    contributions: 56,
    lastActive: '3 days ago',
    avatar: 'IQ'
  },
  {
    id: 'user-5',
    name: 'Aminah Zakariya',
    email: 'aminah.z@example.com',
    role: 'Contributor',
    status: 'pending',
    joinDate: '2023-07-30',
    contributions: 3,
    lastActive: '1 week ago',
    avatar: 'AZ'
  },
  {
    id: 'user-6',
    name: 'Ibrahim Ahmad',
    email: 'ibrahim.ahmad@example.com',
    role: 'Editor',
    status: 'inactive',
    joinDate: '2023-01-20',
    contributions: 12,
    lastActive: '2 months ago',
    avatar: 'IA'
  }
];

// Animation variants
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

export default function UserManagementPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter users based on activeFilter and search query
  const filteredUsers = users.filter(user => {
    const matchesFilter = 
      activeFilter === 'all' || 
      user.status === activeFilter || 
      user.role.toLowerCase() === activeFilter.toLowerCase();
    
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Toggle user selection for bulk actions
  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Effect to show/hide bulk actions bar
  useEffect(() => {
    setShowBulkActions(selectedUsers.length > 0);
  }, [selectedUsers]);

  return (
    <>
      {/* Loading screen */}
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
              User Management
            </motion.span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              Shepherding the Digital Ummah
            </motion.h1>
            
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.button
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200 font-medium text-sm flex items-center gap-2"
                whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)" }}
                whileTap={{ y: 0, boxShadow: "0 0 0 rgba(16, 185, 129, 0)" }}
                onClick={() => {
                  setSelectedUser(null);
                  setShowUserModal(true);
                }}
              >
                <span>Add User</span>
                <span>+</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bulk action bar - appears when users are selected */}
        {showBulkActions && (
          <motion.div 
            className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-between"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{selectedUsers.length} users selected</span>
              <motion.button 
                className="text-sm text-muted-foreground hover:text-foreground"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedUsers([])}
              >
                Clear
              </motion.button>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-700 rounded-md text-sm font-medium"
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                Assign Role
              </motion.button>
              <motion.button
                className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-700 rounded-md text-sm font-medium"
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                Suspend Users
              </motion.button>
              <motion.button
                className="px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-700 rounded-md text-sm font-medium"
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                Delete Users
              </motion.button>
            </div>
          </motion.div>
        )}
        
        {/* Search and filters */}
        <motion.div 
          className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          {/* Search input */}
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full p-2 pl-8 text-sm rounded-lg border border-border/50 bg-card focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-2.5 top-2.5 text-muted-foreground">🔍</span>
          </div>
          
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-1">
            {['all', 'active', 'pending', 'inactive', 'Scholar', 'Editor', 'Contributor'].map((filter, index) => (
              <motion.button
                key={filter}
                className={cn(
                  "px-3 py-1.5 text-xs rounded-md font-medium",
                  activeFilter === filter ? "bg-emerald-500/20 text-emerald-700" : "bg-muted text-muted-foreground"
                )}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* User list */}
        <motion.div
          className="overflow-hidden rounded-lg border border-border"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="w-10 px-4 py-3">
                    <input 
                      type="checkbox" 
                      className="rounded border-border/50 text-emerald-500 focus:ring-emerald-500/30"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(filteredUsers.map(user => user.id));
                        } else {
                          setSelectedUsers([]);
                        }
                      }}
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Joined</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Contributions</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Active</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                      No users found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => (
                    <motion.tr 
                      key={user.id}
                      className="hover:bg-muted/30 cursor-pointer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.05)" }}
                      onClick={() => {
                        setSelectedUser(user.id);
                        setShowUserModal(true);
                      }}
                    >
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <input 
                          type="checkbox" 
                          className="rounded border-border/50 text-emerald-500 focus:ring-emerald-500/30"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => toggleUserSelection(user.id)}
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <motion.div 
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs",
                              user.role === 'Scholar' ? "bg-blue-500" : 
                              user.role === 'Senior Scholar' ? "bg-indigo-600" :
                              user.role === 'Editor' ? "bg-violet-500" : "bg-emerald-500"
                            )}
                            whileHover={{ scale: 1.1 }}
                          >
                            {user.avatar}
                          </motion.div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{user.role}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          user.status === 'active' ? "bg-emerald-500/10 text-emerald-600" :
                          user.status === 'pending' ? "bg-amber-500/10 text-amber-600" :
                          "bg-rose-500/10 text-rose-600"
                        )}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{user.joinDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{user.contributions}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{user.lastActive}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <motion.button 
                            className="p-1 text-muted-foreground hover:text-emerald-500"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            ✏️
                          </motion.button>
                          <motion.button 
                            className="p-1 text-muted-foreground hover:text-rose-500"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            ❌
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
        
        {/* Pagination */}
        <motion.div 
          className="mt-4 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{users.length}</span> users
          </p>
          
          <div className="flex items-center gap-1">
            <motion.button
              className="p-2 rounded-md text-sm text-muted-foreground hover:bg-muted disabled:opacity-50"
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
              disabled
            >
              Previous
            </motion.button>
            <button className="p-2 w-8 h-8 rounded-md bg-emerald-500 text-white text-sm">1</button>
            <button className="p-2 w-8 h-8 rounded-md text-sm">2</button>
            <motion.button
              className="p-2 rounded-md text-sm text-muted-foreground hover:bg-muted"
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              Next
            </motion.button>
          </div>
        </motion.div>
        
        {/* User Detail/Edit Modal */}
        {showUserModal && (
          <motion.div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowUserModal(false)}
          >
            <motion.div 
              className="w-full max-w-lg bg-card border border-border rounded-lg shadow-lg overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-semibold">
                  {selectedUser ? 'Edit User' : 'Add New User'}
                </h2>
                <motion.button 
                  className="p-2 rounded-full hover:bg-muted"
                  onClick={() => setShowUserModal(false)}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  ✕
                </motion.button>
              </div>
              
              <div className="p-6 space-y-4">
                {selectedUser ? (
                  // Edit existing user form
                  (() => {
                    const user = users.find(u => u.id === selectedUser);
                    if (!user) return null;
                    
                    return (
                      <>
                        <div className="flex items-center gap-3 mb-6">
                          <motion.div 
                            className={cn(
                              "w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-medium",
                              user.role === 'Scholar' ? "bg-blue-500" : 
                              user.role === 'Senior Scholar' ? "bg-indigo-600" :
                              user.role === 'Editor' ? "bg-violet-500" : "bg-emerald-500"
                            )}
                            whileHover={{ scale: 1.05 }}
                          >
                            {user.avatar}
                          </motion.div>
                          <div>
                            <h3 className="font-medium">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">Member since {user.joinDate}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Name</label>
                            <input 
                              type="text" 
                              className="w-full p-2 text-sm rounded-lg border border-border/50 bg-background focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
                              defaultValue={user.name}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <input 
                              type="email" 
                              className="w-full p-2 text-sm rounded-lg border border-border/50 bg-background focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
                              defaultValue={user.email}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Role</label>
                            <select className="w-full p-2 text-sm rounded-lg border border-border/50 bg-background focus:ring-2 focus:ring-emerald-500/30 focus:outline-none">
                              <option value="contributor" selected={user.role === 'Contributor'}>Contributor</option>
                              <option value="editor" selected={user.role === 'Editor'}>Editor</option>
                              <option value="scholar" selected={user.role === 'Scholar'}>Scholar</option>
                              <option value="senior-scholar" selected={user.role === 'Senior Scholar'}>Senior Scholar</option>
                              <option value="admin">Admin</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <select className="w-full p-2 text-sm rounded-lg border border-border/50 bg-background focus:ring-2 focus:ring-emerald-500/30 focus:outline-none">
                              <option value="active" selected={user.status === 'active'}>Active</option>
                              <option value="pending" selected={user.status === 'pending'}>Pending</option>
                              <option value="inactive" selected={user.status === 'inactive'}>Inactive</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <label className="text-sm font-medium">Permissions</label>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" className="rounded border-border/50 text-emerald-500 focus:ring-emerald-500/30" defaultChecked />
                              <span className="text-sm">Create Content</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" className="rounded border-border/50 text-emerald-500 focus:ring-emerald-500/30" defaultChecked />
                              <span className="text-sm">Review Documents</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" className="rounded border-border/50 text-emerald-500 focus:ring-emerald-500/30" defaultChecked={user.role !== 'Contributor'} />
                              <span className="text-sm">Approve Tashih</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" className="rounded border-border/50 text-emerald-500 focus:ring-emerald-500/30" defaultChecked={user.role === 'Senior Scholar'} />
                              <span className="text-sm">Manage Users</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4 flex justify-between border-t border-border/50 mt-6">
                          <motion.button
                            className="px-4 py-2 border border-rose-500/30 text-rose-600 hover:bg-rose-500/10 rounded-lg transition-colors duration-200 font-medium text-sm"
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                          >
                            Delete User
                          </motion.button>
                          
                          <motion.button
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200 font-medium text-sm"
                            whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)" }}
                            whileTap={{ y: 0 }}
                          >
                            Save Changes
                          </motion.button>
                        </div>
                      </>
                    );
                  })()
                ) : (
                  // Add new user form
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <input 
                          type="text" 
                          className="w-full p-2 text-sm rounded-lg border border-border/50 bg-background focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
                          placeholder="Full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input 
                          type="email" 
                          className="w-full p-2 text-sm rounded-lg border border-border/50 bg-background focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
                          placeholder="Email address"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Role</label>
                        <select className="w-full p-2 text-sm rounded-lg border border-border/50 bg-background focus:ring-2 focus:ring-emerald-500/30 focus:outline-none">
                          <option value="contributor">Contributor</option>
                          <option value="editor">Editor</option>
                          <option value="scholar">Scholar</option>
                          <option value="senior-scholar">Senior Scholar</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Status</label>
                        <select className="w-full p-2 text-sm rounded-lg border border-border/50 bg-background focus:ring-2 focus:ring-emerald-500/30 focus:outline-none">
                          <option value="active">Active</option>
                          <option value="pending" selected>Pending</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <label className="text-sm font-medium">Permissions</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded border-border/50 text-emerald-500 focus:ring-emerald-500/30" defaultChecked />
                          <span className="text-sm">Create Content</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded border-border/50 text-emerald-500 focus:ring-emerald-500/30" />
                          <span className="text-sm">Review Documents</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded border-border/50 text-emerald-500 focus:ring-emerald-500/30" />
                          <span className="text-sm">Approve Tashih</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded border-border/50 text-emerald-500 focus:ring-emerald-500/30" />
                          <span className="text-sm">Manage Users</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Password</label>
                        <motion.button
                          className="text-xs text-emerald-500 hover:text-emerald-600"
                          whileHover={{ scale: 1.05 }}
                        >
                          Generate Random Password
                        </motion.button>
                      </div>
                      <input 
                        type="password" 
                        className="w-full p-2 text-sm rounded-lg border border-border/50 bg-background focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
                        placeholder="Create a password"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2 mt-6">
                      <input type="checkbox" className="rounded border-border/50 text-emerald-500 focus:ring-emerald-500/30" />
                      <span className="text-sm">Send welcome email with login instructions</span>
                    </div>
                    
                    <div className="pt-4 flex justify-end border-t border-border/50 mt-6">
                      <motion.button
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200 font-medium text-sm"
                        whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)" }}
                        whileTap={{ y: 0 }}
                      >
                        Create User
                      </motion.button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  );
} 