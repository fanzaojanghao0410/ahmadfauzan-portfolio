import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import './Sidebar.css';

const navItems = [
  { path: '/', icon: 'lucide:home', label: 'Home' },
  { path: '/about', icon: 'lucide:user', label: 'About' },
  { path: '/skills', icon: 'lucide:brain', label: 'Skills' },
  { path: '/experience', icon: 'lucide:briefcase', label: 'Experience' },
  { path: '/projects', icon: 'lucide:folder-open', label: 'Projects' },
  { path: '/contact', icon: 'lucide:mail', label: 'Contact' },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <>
      <motion.button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-btn lg:hidden" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Icon icon={isOpen ? 'lucide:x' : 'lucide:menu'} className="w-5 h-5" />
      </motion.button>

      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-20 flex-col items-center py-8 z-40 sidebar-desktop">
        <nav className="flex-1 flex flex-col items-center gap-3 mt-16 w-full px-3">
          {navItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className="w-full flex justify-center"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {({ isActive }) => (
                <motion.div
                  className={cn('nav-item relative p-3 w-12 h-12 flex items-center justify-center cursor-pointer', isActive && 'nav-item-active')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon icon={item.icon} className={cn('w-5 h-5 nav-icon', isActive && 'nav-icon-active')} />
                  {isActive && (
                    <motion.div layoutId="activeNav" className="active-indicator absolute bottom-[-4px] w-1 h-1" transition={{ type: 'spring', stiffness: 400, damping: 25 }} />
                  )}
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: hoveredItem === index ? 1 : 0, x: hoveredItem === index ? 0 : -10 }}
                    className="nav-tooltip absolute left-full ml-3 px-3 py-2 text-sm font-medium whitespace-nowrap pointer-events-none z-50"
                  >
                    {item.label}
                  </motion.span>
                </motion.div>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="hidden lg:hidden fixed bottom-0 left-0 right-0 z-50 mobile-bottom-bar">
        <nav className="flex items-center justify-around py-2 px-2">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/'} className="flex flex-col items-center gap-1 p-2">
              {({ isActive }) => (
                <motion.div className={cn('flex flex-col items-center gap-1', isActive && 'text-primary')} whileTap={{ scale: 0.9 }}>
                  <Icon icon={item.icon} className={cn('w-5 h-5', isActive ? 'nav-icon-active' : 'nav-icon')} />
                  <span className={cn('text-[10px] font-medium', isActive ? 'text-primary' : 'text-muted-foreground')}>{item.label}</span>
                </motion.div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="sidebar-overlay fixed inset-0 z-40 lg:hidden" />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="sidebar-mobile fixed left-0 top-0 h-screen w-72 z-50 lg:hidden">
              <div className="flex flex-col h-full p-6 pt-24">
                <nav className="flex-1 flex flex-col gap-2">
                  {navItems.map((item) => (
                    <NavLink key={item.path} to={item.path} end={item.path === '/'} onClick={() => setIsOpen(false)}>
                      {({ isActive }) => (
                        <motion.div className={cn('nav-item flex items-center gap-4 p-4 cursor-pointer', isActive && 'nav-item-active')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Icon icon={item.icon} className={cn('w-5 h-5', isActive ? 'nav-icon-active' : 'nav-icon')} />
                          <span className={cn('font-medium', isActive ? 'text-primary' : 'text-muted-foreground')}>{item.label}</span>
                        </motion.div>
                      )}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
