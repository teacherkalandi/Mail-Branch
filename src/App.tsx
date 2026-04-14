/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Wrench, 
  Calendar, 
  Activity, 
  Fuel, 
  FileText, 
  ClipboardList, 
  ExternalLink, 
  ChevronRight,
  Search,
  Menu,
  X,
  FileSpreadsheet,
  LayoutDashboard,
  File as FileIcon,
  Youtube,
  FolderOpen,
  Info
} from 'lucide-react';
import { SECTIONS, Section, CardLink } from './types';

const IconMap: Record<string, React.ElementType> = {
  Mail,
  Wrench,
  Calendar,
  Activity,
  Fuel,
  FileText,
  ClipboardList,
};

const TypeIconMap: Record<string, React.ElementType> = {
  sheet: FileSpreadsheet,
  dashboard: LayoutDashboard,
  pdf: FileIcon,
  video: Youtube,
  folder: FolderOpen,
  generic: Info,
};

export default function App() {
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Close sidebar on mobile when section changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeSection]);

  const filteredSections = SECTIONS.map(section => ({
    ...section,
    cards: section.cards.filter(card => 
      card.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.cards.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Header */}
      <header className="bg-[#D41217] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-md hover:bg-red-700 transition-colors"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center shadow-inner">
                  <Mail className="text-[#D41217]" size={24} />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight leading-none">Mail Branch</h1>
                  <p className="text-[10px] uppercase tracking-widest text-red-100 font-medium">India Post Portal</p>
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-red-200" />
                </div>
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-full leading-5 bg-red-800 text-white placeholder-red-300 focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-medium text-red-100">Welcome</p>
                <p className="text-sm font-bold">Mail Branch Admin</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-red-800 border border-red-600 flex items-center justify-center">
                <span className="text-xs font-bold">MB</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 transition duration-200 ease-in-out
          z-50 w-64 bg-white border-r border-gray-200 flex flex-col
        `}>
          <div className="p-4 border-b border-gray-100 lg:hidden flex justify-between items-center">
            <span className="font-bold text-[#D41217]">Navigation</span>
            <button onClick={() => setIsSidebarOpen(false)}><X size={20} /></button>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-4 mb-4">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Sections</p>
            </div>
            {SECTIONS.map((section) => {
              const Icon = IconMap[section.icon];
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all
                    ${activeSection === section.id 
                      ? 'bg-red-50 text-[#D41217] border-r-4 border-[#D41217]' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                >
                  <Icon size={18} className={activeSection === section.id ? 'text-[#D41217]' : 'text-gray-400'} />
                  {section.title}
                </button>
              );
            })}
          </nav>
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              SYSTEM ONLINE
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            {/* Mobile Search */}
            <div className="md:hidden mb-6">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection + searchQuery}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                      {SECTIONS.find(s => s.id === activeSection)?.title}
                    </h2>
                    <p className="text-gray-500 mt-1">
                      Access and manage {SECTIONS.find(s => s.id === activeSection)?.title.toLowerCase()} resources.
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#FFD700]/20 text-[#D41217] rounded-full text-xs font-bold border border-[#FFD700]/30">
                    <Info size={14} />
                    {filteredSections.find(s => s.id === activeSection)?.cards.length || 0} Resources
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredSections.find(s => s.id === activeSection)?.cards.map((card, index) => (
                    <ResourceCard key={card.title + index} card={card} index={index} />
                  ))}
                  {(!filteredSections.find(s => s.id === activeSection) || filteredSections.find(s => s.id === activeSection)?.cards.length === 0) && (
                    <div className="col-span-full py-20 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="text-gray-300" size={32} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">No resources found</h3>
                      <p className="text-gray-500">Try adjusting your search query.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#D41217] rounded flex items-center justify-center">
              <Mail className="text-white" size={14} />
            </div>
            <span className="text-sm font-bold text-gray-900">Mail Branch Portal</span>
          </div>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Department of Posts, India. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-400 hover:text-[#D41217] transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-[#D41217] transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-gray-400 hover:text-[#D41217] transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface ResourceCardProps {
  card: CardLink;
  index: number;
  key?: string | number;
}

function ResourceCard({ card, index }: ResourceCardProps) {
  const Icon = TypeIconMap[card.type || 'generic'];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div className="flex items-start gap-4">
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors
          ${card.url ? 'bg-red-50 text-[#D41217] group-hover:bg-[#D41217] group-hover:text-white' : 'bg-gray-100 text-gray-400'}
        `}>
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              {card.type || 'Resource'}
            </span>
            {card.url && (
              <span className="w-1 h-1 rounded-full bg-gray-300" />
            )}
            {card.url && (
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">
                Available
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-[#D41217] transition-colors">
            {card.title}
          </h3>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {card.url ? `Click to open this ${card.type || 'resource'} in a new tab.` : 'This resource is currently being updated or is coming soon.'}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
        {card.url ? (
          <a
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold text-[#D41217] hover:underline"
          >
            Open Resource
            <ExternalLink size={14} />
          </a>
        ) : (
          <span className="text-xs font-medium text-gray-400 italic">
            Link pending
          </span>
        )}
        <div className="flex items-center gap-1 text-gray-300">
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}
