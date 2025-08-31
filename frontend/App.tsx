import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect, createContext, useContext } from "react";
import { Moon, Sun, BarChart3, Users, TrendingUp } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import Dashboard from "./pages/Dashboard";
import StudentDetail from "./pages/StudentDetail";
import Analytics from "./pages/Analytics";

const queryClient = new QueryClient();

// Theme Context
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

// Integrated Navigation Component
function Navigation() {
  const location = useLocation();
  const { theme } = useTheme();

  const navItems = [
    { path: "/", label: "Dashboard", icon: Users },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <nav className={`sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900/80 border-gray-600/50 shadow-xl' 
        : 'bg-white/80 border-gray-200/50 shadow-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand Section */}
          <Link to="/" className="flex items-center space-x-3">
            {/* Replace this with your actual logo */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
                : 'bg-gradient-to-br from-blue-600 to-purple-700 text-white'
            }`}>
              🎓
            </div>
            {/* Uncomment and add your logo URL here:
            <img 
              src="YOUR_LOGO_URL_HERE" 
              alt="CSD Logo" 
              className="w-10 h-10 object-contain"
            />
            */}
            <div>
              <div className={`font-bold text-xl bg-gradient-to-r bg-clip-text text-transparent ${
                theme === 'dark' 
                  ? 'from-blue-300 to-purple-300' 
                  : 'from-blue-600 to-purple-600'
              }`}>
                CSD PLACEMENT HUB
              </div>
              <div className={`text-xs font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                BEC Institute of Technology & Management
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 border ${
                    isActive
                      ? theme === 'dark'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-blue-500/50'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-blue-500/50'
                      : theme === 'dark'
                        ? 'text-gray-200 hover:text-white hover:bg-gray-700/50 border-gray-600/30 hover:border-gray-500/50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/50 border-gray-200/50 hover:border-gray-300/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className={`hidden md:flex items-center space-x-2 text-sm ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <TrendingUp className="h-4 w-4" />
            <span className="font-medium">Student Analytics Portal</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Theme Toggle Component
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className={`fixed top-4 right-4 z-50 transition-all duration-300 shadow-lg border-2 ${
        theme === 'dark' 
          ? 'bg-gray-800/90 hover:bg-gray-700/90 border-gray-600/50 text-gray-100 hover:border-gray-500' 
          : 'bg-white/90 hover:bg-gray-50/90 border-gray-300/50 text-gray-700 hover:border-gray-400'
      }`}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="ml-2 text-xs font-medium">
        {theme === 'light' ? 'Dark' : 'Light'}
      </span>
    </Button>
  );
}

export default function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const themeValue = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={themeValue}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className={`min-h-screen relative transition-all duration-500 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
              : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
          }`}>
            {/* Enhanced Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className={`absolute -top-4 -right-4 w-72 h-72 rounded-full blur-3xl animate-pulse ${
                theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-300/30'
              }`}></div>
              <div className={`absolute top-1/2 -left-4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
                theme === 'dark' ? 'bg-purple-600/15' : 'bg-purple-300/25'
              }`}></div>
              <div className={`absolute -bottom-4 right-1/3 w-80 h-80 rounded-full blur-3xl animate-pulse delay-2000 ${
                theme === 'dark' ? 'bg-cyan-600/20' : 'bg-cyan-300/25'
              }`}></div>
            </div>

            <ThemeToggle />
            
            {/* Enhanced Navigation with integrated component */}
            <Navigation />

            {/* Main Content with improved contrast */}
            <main className="container mx-auto px-4 py-8 pb-20 relative z-20">
              <div className={`backdrop-blur-sm rounded-3xl p-6 transition-all duration-500 shadow-xl border ${
                theme === 'dark' 
                  ? 'bg-gray-800/40 border-gray-700/40 shadow-black/20' 
                  : 'bg-white/60 border-gray-200/50 shadow-gray-900/5'
              }`}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/student/:usn" element={<StudentDetail />} />
                </Routes>
              </div>
            </main>
            
            {/* Enhanced Professional Footer with better visibility */}
            <footer className="fixed bottom-0 right-0 p-4 z-10">
              <div className={`backdrop-blur-md rounded-xl px-4 py-2 shadow-xl border transition-all duration-300 hover:scale-105 ${
                theme === 'dark' 
                  ? 'bg-gray-800/80 border-gray-600/50 shadow-black/40' 
                  : 'bg-white/80 border-gray-200/50 shadow-gray-900/10'
              }`}>
                <a
                  href="https://www.linkedin.com/in/shadabur-rahaman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium flex items-center gap-2 transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'text-gray-200 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <span>Developed by</span>
                  <span className={`font-semibold bg-gradient-to-r bg-clip-text text-transparent ${
                    theme === 'dark' 
                      ? 'from-blue-300 to-purple-300 hover:from-blue-200 hover:to-purple-200' 
                      : 'from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
                  }`}>
                    Shadabur Rahaman
                  </span>
                </a>
              </div>
            </footer>
            
            <Toaster />
          </div>
        </Router>
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
}