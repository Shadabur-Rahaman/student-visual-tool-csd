import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect, createContext, useContext } from "react";
import { Moon, Sun } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import Dashboard from "./pages/Dashboard";
import StudentDetail from "./pages/StudentDetail";
import Analytics from "./pages/Analytics";
import Navigation from "./components/Navigation";

const queryClient = new QueryClient();

// Theme Context
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

// Theme Toggle Component
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-800 hover:bg-gray-700 border-gray-600 text-gray-200' 
          : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'
      }`}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
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
              ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
              : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
          }`}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className={`absolute -top-4 -right-4 w-72 h-72 rounded-full opacity-20 blur-3xl animate-pulse ${
                theme === 'dark' ? 'bg-blue-500' : 'bg-blue-300'
              }`}></div>
              <div className={`absolute top-1/2 -left-4 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse delay-1000 ${
                theme === 'dark' ? 'bg-purple-500' : 'bg-purple-300'
              }`}></div>
              <div className={`absolute -bottom-4 right-1/3 w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse delay-2000 ${
                theme === 'dark' ? 'bg-cyan-500' : 'bg-cyan-300'
              }`}></div>
            </div>

            <ThemeToggle />
            
            {/* Logo Section - Replace src with your logo URL */}
            <div className="absolute top-4 left-4 z-40">
              <div className={`flex items-center space-x-3 px-4 py-2 rounded-xl backdrop-blur-md transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-gray-800/30 border border-gray-700/50' 
                  : 'bg-white/30 border border-gray-200/50'
              }`}>
                {/* Replace this div with your actual logo */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
                    : 'bg-gradient-to-br from-blue-600 to-purple-700 text-white'
                }`}>
                  CSD
                </div>
                {/* Uncomment and replace with your logo URL */}
                {/* <img 
                  src="YOUR_LOGO_URL_HERE" 
                  alt="Department Logo" 
                  className="w-10 h-10 object-contain"
                /> */}
                <div className={`text-sm font-semibold ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  <div className="leading-tight">BEC ITM</div>
                  <div className="text-xs opacity-75">CS&D</div>
                </div>
              </div>
            </div>

            {/* Enhanced Navigation with backdrop blur */}
            <div className="relative z-30">
              <Navigation />
            </div>

            {/* Main Content with enhanced styling */}
            <main className="container mx-auto px-4 py-8 pb-20 relative z-20">
              <div className={`backdrop-blur-sm rounded-3xl p-6 transition-all duration-500 ${
                theme === 'dark' 
                  ? 'bg-gray-800/20 border border-gray-700/30' 
                  : 'bg-white/40 border border-gray-200/50'
              }`}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/student/:usn" element={<StudentDetail />} />
                </Routes>
              </div>
            </main>
            
            {/* Enhanced Professional Footer */}
            <footer className="fixed bottom-0 right-0 p-4 z-10">
              <div className={`backdrop-blur-md rounded-xl px-4 py-2 shadow-lg border transition-all duration-300 hover:scale-105 ${
                theme === 'dark' 
                  ? 'bg-gray-800/40 border-gray-700/50 shadow-gray-900/20' 
                  : 'bg-white/60 border-gray-200/50 shadow-gray-900/10'
              }`}>
                <a
                  href="https://www.linkedin.com/in/shadabur-rahaman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium flex items-center gap-2 transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <span>Developed by</span>
                  <span className={`font-semibold bg-gradient-to-r bg-clip-text text-transparent ${
                    theme === 'dark' 
                      ? 'from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300' 
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