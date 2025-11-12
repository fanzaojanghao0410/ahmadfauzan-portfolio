import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-14 h-7 rounded-full bg-muted flex items-center px-1 transition-colors duration-300 shadow-glow"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute w-5 h-5 rounded-full bg-primary flex items-center justify-center"
        animate={{ x: isDark ? 28 : 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <motion.div
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: isDark ? 0 : 180, scale: 0 }}
          animate={{
            rotate: isDark ? 180 : 0,
            scale: 1,
          }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {isDark ? (
            <Moon className="w-3 h-3 text-primary-foreground" />
          ) : (
            <Sun className="w-3 h-3 text-primary-foreground" />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
};
