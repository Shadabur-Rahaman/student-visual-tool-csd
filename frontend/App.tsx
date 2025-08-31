import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect, createContext, useContext } from "react";
import { Moon, Sun, BarChart3, Users, TrendingUp, Sparkles } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import Dashboard from "./pages/Dashboard";
import StudentDetail from "./pages/StudentDetail";
import Analytics from "./pages/Analytics";

const queryClient = new QueryClient();

// Theme Context
const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

// Enhanced Navigation Component with centered items
function Navigation() {
  const location = useLocation();
  const { theme } = useTheme();

  const navItems = [
    { path: "/", label: "Dashboard", icon: Users },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <nav className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-500 ${
      theme === 'dark' 
        ? 'bg-slate-900/90 border-slate-700/50 shadow-2xl shadow-black/20' 
        : 'bg-white/90 border-gray-200/60 shadow-lg shadow-gray-900/5'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand Section */}
          <Link to="/" className="flex items-center space-x-4">
            <div className="relative w-12 h-12 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden bg-white/10 backdrop-blur-sm">
              <img 
                src="https://i.postimg.cc/5tKDhzcC/csd-logo.png" 
                alt="CSD Logo" 
                className="w-full h-full object-contain p-1"
                style={{
                  filter: theme === 'dark' ? 'brightness(1.1) contrast(1.1)' : 'none'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl pointer-events-none"></div>
            </div>
            <div>
              <div className={`font-bold text-2xl bg-gradient-to-r bg-clip-text text-transparent leading-tight ${
                theme === 'dark' 
                  ? 'from-violet-300 via-purple-300 to-indigo-300' 
                  : 'from-blue-600 via-indigo-600 to-purple-600'
              }`}>
                CSD PLACEMENT HUB
              </div>
              <div className={`text-sm font-semibold tracking-wide ${
                theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
              }`}>
                PES Institute of Technology & Management
              </div>
            </div>
          </Link>

          {/* Centered Navigation Links */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border-2 backdrop-blur-sm transform hover:scale-105 shadow-lg ${
                    isActive
                      ? theme === 'dark'
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-purple-500/40 border-purple-400/50 shadow-2xl'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/40 border-blue-400/50 shadow-2xl'
                      : theme === 'dark'
                        ? 'text-slate-200 hover:text-white hover:bg-slate-800/60 border-slate-600/40 hover:border-slate-500/60 hover:shadow-xl'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/80 border-gray-300/40 hover:border-gray-400/60 hover:shadow-xl'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-base">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Enhanced Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

// Enhanced Theme Toggle Component
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={toggleTheme}
      className={`relative overflow-hidden transition-all duration-500 shadow-lg border-2 rounded-2xl px-4 py-3 backdrop-blur-sm transform hover:scale-105 ${
        theme === 'dark' 
          ? 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-600/50 text-slate-100 hover:border-slate-500 shadow-slate-900/50' 
          : 'bg-white/80 hover:bg-gray-50/80 border-gray-300/50 text-gray-700 hover:border-gray-400 shadow-gray-900/10'
      }`}
    >
      <div className="flex items-center space-x-2">
        {theme === 'dark' ? (
          <>
            <Sun className="h-5 w-5" />
            <span className="font-medium">Light</span>
          </>
        ) : (
          <>
            <Moon className="h-5 w-5" />
            <span className="font-medium">Dark</span>
          </>
        )}
      </div>
      {/* Animated background */}
      <div className={`absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 ${
        theme === 'dark' 
          ? 'bg-gradient-to-r from-violet-600/20 to-purple-600/20' 
          : 'bg-gradient-to-r from-blue-600/10 to-indigo-600/10'
      }`}></div>
    </Button>
  );
}

// Enhanced Developer Credit Component
function DeveloperCredit() {
  const { theme } = useTheme();
  
  return (
    <div className={`fixed bottom-6 right-6 z-50 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-2xl border-2 transition-all duration-500 hover:scale-105 transform ${
      theme === 'dark' 
        ? 'bg-slate-800/90 border-slate-600/50 shadow-black/30' 
        : 'bg-white/90 border-gray-200/60 shadow-gray-900/10'
    }`}>
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-violet-500 to-purple-600' 
            : 'bg-gradient-to-br from-blue-500 to-indigo-600'
        }`}>
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className={`text-sm font-medium ${
            theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
          }`}>
            Crafted by
          </div>
          <a
            href="https://www.linkedin.com/in/shadabur-rahaman"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-bold text-lg bg-gradient-to-r bg-clip-text text-transparent hover:scale-105 transform transition-all duration-300 ${
              theme === 'dark' 
                ? 'from-violet-300 via-purple-300 to-indigo-300 hover:from-violet-200 hover:via-purple-200 hover:to-indigo-200' 
                : 'from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500'
            }`}
          >
            Shadabur Rahaman
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  // Force dark theme as default - always start with dark mode
  const [theme, setTheme] = useState('dark');

  // Apply dark theme immediately on mount and sync with sessionStorage
  useEffect(() => {
    const applyTheme = (currentTheme) => {
      const root = document.documentElement;
      
      // Clear existing classes
      root.classList.remove('light', 'dark');
      root.classList.add(currentTheme);
      root.setAttribute('data-theme', currentTheme);
      
      if (currentTheme === 'dark') {
        root.style.setProperty('--text-primary', '#f8fafc');
        root.style.setProperty('--text-secondary', '#e2e8f0');
        root.style.setProperty('--text-muted', '#94a3b8');
        root.style.setProperty('--bg-card', 'rgba(30, 41, 59, 0.95)');
        root.style.setProperty('--bg-card-hover', 'rgba(51, 65, 85, 0.95)');
        root.style.setProperty('--border-color', 'rgba(71, 85, 105, 0.6)');
      } else {
        root.style.setProperty('--text-primary', '#0f172a');
        root.style.setProperty('--text-secondary', '#334155');
        root.style.setProperty('--text-muted', '#64748b');
        root.style.setProperty('--bg-card', 'rgba(255, 255, 255, 0.95)');
        root.style.setProperty('--bg-card-hover', 'rgba(248, 250, 252, 0.95)');
        root.style.setProperty('--border-color', 'rgba(226, 232, 240, 0.6)');
      }
      
      // Save to sessionStorage for the current session only
      sessionStorage.setItem('theme', currentTheme);
    };
    
    // Apply dark theme immediately on first mount
    applyTheme(theme);
    
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const themeValue = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={themeValue}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className={`min-h-screen relative transition-all duration-700 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800' 
              : 'bg-gradient-to-br from-blue-50 via-violet-50/30 to-indigo-50/50'
          }`}>
            {/* Enhanced Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className={`absolute -top-10 -right-10 w-96 h-96 rounded-full blur-3xl animate-pulse opacity-30 ${
                theme === 'dark' ? 'bg-violet-600/40' : 'bg-blue-400/60'
              }`}></div>
              <div className={`absolute top-1/2 -left-10 w-[32rem] h-[32rem] rounded-full blur-3xl animate-pulse delay-1000 opacity-25 ${
                theme === 'dark' ? 'bg-purple-600/30' : 'bg-indigo-400/50'
              }`}></div>
              <div className={`absolute -bottom-10 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse delay-2000 opacity-20 ${
                theme === 'dark' ? 'bg-indigo-600/40' : 'bg-purple-400/40'
              }`}></div>
              <div className={`absolute top-1/4 left-1/3 w-72 h-72 rounded-full blur-3xl animate-pulse delay-3000 opacity-15 ${
                theme === 'dark' ? 'bg-cyan-600/30' : 'bg-cyan-400/30'
              }`}></div>
            </div>

            <Navigation />
            
            {/* Main Content with Enhanced Styling */}
            <main className="container mx-auto px-6 py-10 pb-32 relative z-20">
              <div 
                className={`backdrop-blur-xl rounded-3xl p-8 transition-all duration-700 shadow-2xl border-2 ${
                  theme === 'dark' 
                    ? 'bg-slate-800/80 border-slate-600/50 shadow-black/40' 
                    : 'bg-white/80 border-gray-200/60 shadow-gray-900/10'
                }`}
              >
                {/* Enhanced Global Theme Styles */}
                <style jsx global>{`
                  /* Dark theme text fixes with better contrast */
                  [data-theme="dark"] .text-gray-900,
                  [data-theme="dark"] .text-gray-800,
                  [data-theme="dark"] .text-gray-700,
                  [data-theme="dark"] .text-black {
                    color: #f8fafc !important;
                  }
                  
                  [data-theme="dark"] .text-gray-600,
                  [data-theme="dark"] .text-gray-500 {
                    color: #e2e8f0 !important;
                  }
                  
                  [data-theme="dark"] .text-gray-400 {
                    color: #cbd5e1 !important;
                  }
                  
                  /* Enhanced card backgrounds */
                  [data-theme="dark"] .bg-white {
                    background: rgba(30, 41, 59, 0.95) !important;
                    border-color: rgba(71, 85, 105, 0.6) !important;
                    backdrop-filter: blur(16px);
                  }
                  
                  [data-theme="dark"] .bg-gray-50 {
                    background: rgba(51, 65, 85, 0.9) !important;
                    backdrop-filter: blur(12px);
                  }
                  
                  /* Stats cards enhanced styling */
                  [data-theme="dark"] .stats-card {
                    background: rgba(30, 41, 59, 0.95) !important;
                    border: 2px solid rgba(71, 85, 105, 0.6) !important;
                    backdrop-filter: blur(16px);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4) !important;
                  }
                  
                  [data-theme="dark"] .stats-card:hover {
                    background: rgba(51, 65, 85, 0.95) !important;
                    border-color: rgba(100, 116, 139, 0.8) !important;
                    transform: translateY(-4px);
                    box-shadow: 0 32px 64px -12px rgba(0, 0, 0, 0.5) !important;
                  }
                  
                  /* Light theme enhancements */
                  [data-theme="light"] .stats-card {
                    background: rgba(255, 255, 255, 0.95) !important;
                    border: 2px solid rgba(226, 232, 240, 0.6) !important;
                    backdrop-filter: blur(16px);
                    box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.1) !important;
                  }
                  
                  [data-theme="light"] .stats-card:hover {
                    background: rgba(248, 250, 252, 0.95) !important;
                    border-color: rgba(203, 213, 225, 0.8) !important;
                    transform: translateY(-4px);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15) !important;
                  }
                  
                  /* Enhanced table styling */
                  [data-theme="dark"] table,
                  [data-theme="dark"] th,
                  [data-theme="dark"] td {
                    color: #f8fafc !important;
                    border-color: rgba(71, 85, 105, 0.6) !important;
                  }
                  
                  [data-theme="dark"] .table-row:hover {
                    background: rgba(51, 65, 85, 0.6) !important;
                    backdrop-filter: blur(8px);
                  }
                  
                  /* Typography enhancements */
                  [data-theme="dark"] h1,
                  [data-theme="dark"] h2,
                  [data-theme="dark"] h3,
                  [data-theme="dark"] h4,
                  [data-theme="dark"] h5,
                  [data-theme="dark"] h6 {
                    color: #f8fafc !important;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                  }
                  
                  /* Smooth transitions for all elements */
                  * {
                    transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
                  }
                  
                  /* Custom scrollbar styling */
                  ::-webkit-scrollbar {
                    width: 8px;
                  }
                  
                  ::-webkit-scrollbar-track {
                    background: ${theme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'rgba(248, 250, 252, 0.5)'};
                  }
                  
                  ::-webkit-scrollbar-thumb {
                    background: ${theme === 'dark' ? 'rgba(100, 116, 139, 0.8)' : 'rgba(203, 213, 225, 0.8)'};
                    border-radius: 4px;
                  }
                  
                  ::-webkit-scrollbar-thumb:hover {
                    background: ${theme === 'dark' ? 'rgba(148, 163, 184, 1)' : 'rgba(148, 163, 184, 1)'};
                  }
                `}</style>
                
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/student/:usn" element={<StudentDetail />} />
                </Routes>
              </div>
            </main>
            
            {/* Enhanced Developer Credit */}
            <DeveloperCredit />
            
            <Toaster />
          </div>
        </Router>
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
}