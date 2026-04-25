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
          <div className="flex justify-between items-center h-20 sm:h-24 py-2">
            <div className="flex items-center gap-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                alt="Emblem of India" 
                className="h-12 sm:h-16 w-auto filter brightness-0 invert" 
              />
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
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight leading-none uppercase">Mail Branch</h1>
                    <p className="text-[10px] sm:text-[12px] uppercase tracking-widest text-red-100 font-medium">India Post Portal</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex flex-1 max-w-sm mx-4">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-red-200" />
                </div>
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg leading-5 bg-red-800 text-white placeholder-red-300 focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm transition-all shadow-inner"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-[10px] font-medium text-red-100 uppercase tracking-tighter">Department of Posts</p>
                <p className="text-sm font-bold truncate max-w-[120px]">DO Dhenkanal</p>
              </div>
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/3/32/India_Post.svg" 
                alt="India Post Logo" 
                className="h-10 sm:h-14 w-auto bg-white p-1 rounded shadow-sm" 
              />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#D41217] rounded flex items-center justify-center">
                <Mail className="text-white" size={14} />
              </div>
              <span className="text-sm font-bold text-gray-900">Mail Branch Portal</span>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">
                &copy; {new Date().getFullYear()} Department of Posts, India. All rights reserved.
              </p>
              <p className="text-[11px] font-bold text-[#D41217] mt-1 uppercase tracking-tight">
                Prepared by Kalandi Charan Sahoo, OA, DO, Dhenkanal.
              </p>
            </div>

            <div className="flex gap-6">
              <a href="#" className="text-xs text-gray-400 hover:text-[#D41217] transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-400 hover:text-[#D41217] transition-colors">Terms of Service</a>
              <a href="#" className="text-xs text-gray-400 hover:text-[#D41217] transition-colors">Contact Support</a>
            </div>
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

const CardThemes = [
  { bg: 'bg-emerald-50', border: 'border-emerald-100', iconBg: 'bg-emerald-500', text: 'text-emerald-900', iconText: 'text-emerald-50', accent: 'text-emerald-600', hover: 'hover:bg-emerald-100/50' },
  { bg: 'bg-indigo-50', border: 'border-indigo-100', iconBg: 'bg-indigo-500', text: 'text-indigo-900', iconText: 'text-indigo-50', accent: 'text-indigo-600', hover: 'hover:bg-indigo-100/50' },
  { bg: 'bg-rose-50', border: 'border-rose-100', iconBg: 'bg-rose-500', text: 'text-rose-900', iconText: 'text-rose-50', accent: 'text-rose-600', hover: 'hover:bg-rose-100/50' },
  { bg: 'bg-amber-50', border: 'border-amber-100', iconBg: 'bg-amber-500', text: 'text-amber-900', iconText: 'text-amber-50', accent: 'text-amber-600', hover: 'hover:bg-amber-100/50' },
  { bg: 'bg-sky-50', border: 'border-sky-100', iconBg: 'bg-sky-500', text: 'text-sky-900', iconText: 'text-sky-50', accent: 'text-sky-600', hover: 'hover:bg-sky-100/50' },
  { bg: 'bg-violet-50', border: 'border-violet-100', iconBg: 'bg-violet-500', text: 'text-violet-900', iconText: 'text-violet-50', accent: 'text-violet-600', hover: 'hover:bg-violet-100/50' },
  { bg: 'bg-orange-50', border: 'border-orange-100', iconBg: 'bg-orange-500', text: 'text-orange-900', iconText: 'text-orange-50', accent: 'text-orange-600', hover: 'hover:bg-orange-100/50' },
  { bg: 'bg-teal-50', border: 'border-teal-100', iconBg: 'bg-teal-500', text: 'text-teal-900', iconText: 'text-teal-50', accent: 'text-teal-600', hover: 'hover:bg-teal-100/50' },
];

function ResourceCard({ card, index }: ResourceCardProps) {
  const Icon = TypeIconMap[card.type || 'generic'];
  const theme = CardThemes[index % CardThemes.length];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`group ${theme.bg} rounded-3xl border-2 ${theme.border} p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden`}
    >
      {/* Decorative background shape */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${theme.iconBg} opacity-[0.03] group-hover:scale-150 transition-transform duration-500`} />

      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-start">
          <div className={`
            w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg transition-transform duration-300 group-hover:rotate-6
            ${card.url ? `${theme.iconBg} ${theme.iconText}` : 'bg-gray-200 text-gray-500'}
          `}>
            <Icon size={28} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col items-end">
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-md mb-1 ${card.url ? `${theme.iconBg}/10 ${theme.accent}` : 'bg-gray-200 text-gray-500'}`}>
              {card.type || 'Resource'}
            </span>
            {card.url ? (
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Online</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Pending</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h3 className={`text-xl font-black ${theme.text} leading-[1.1] mb-2 group-hover:translate-x-1 transition-transform`}>
            {card.title}
          </h3>
          <p className={`text-sm ${theme.text} opacity-70 leading-relaxed font-medium`}>
            {card.url ? `Explore the official ${card.title} data in our secure cloud.` : 'Resource content is currently being prepared for the 2026-27 cycle.'}
          </p>
        </div>
      </div>

      <div className={`mt-8 pt-5 border-t ${theme.border} flex items-center justify-between`}>
        {card.url ? (
          <a
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-sm font-black ${theme.accent} group/link`}
          >
            <span className="border-b-2 border-transparent group-hover/link:border-current transition-all">Launch Resource</span>
            <ExternalLink size={16} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        ) : (
          <span className="text-[11px] font-bold text-gray-400 italic">
            Awaiting Deployment
          </span>
        )}
        <div className={`${theme.accent} opacity-20`}>
          <ChevronRight size={20} strokeWidth={3} className="group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </div>
    </motion.div>
  );
}
