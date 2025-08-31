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
    
    // Apply theme to document root for global CSS variables
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Set CSS custom properties for consistent theming
    const root = document.documentElement;
    if (savedTheme === 'dark') {
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#e5e7eb');
      root.style.setProperty('--text-muted', '#9ca3af');
      root.style.setProperty('--bg-card', 'rgba(31, 41, 55, 0.9)');
      root.style.setProperty('--bg-card-hover', 'rgba(55, 65, 81, 0.9)');
      root.style.setProperty('--border-color', 'rgba(75, 85, 99, 0.5)');
    } else {
      root.style.setProperty('--text-primary', '#111827');
      root.style.setProperty('--text-secondary', '#374151');
      root.style.setProperty('--text-muted', '#6b7280');
      root.style.setProperty('--bg-card', 'rgba(255, 255, 255, 0.9)');
      root.style.setProperty('--bg-card-hover', 'rgba(249, 250, 251, 0.9)');
      root.style.setProperty('--border-color', 'rgba(229, 231, 235, 0.5)');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Apply theme changes
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Update CSS custom properties
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#e5e7eb');
      root.style.setProperty('--text-muted', '#9ca3af');
      root.style.setProperty('--bg-card', 'rgba(31, 41, 55, 0.9)');
      root.style.setProperty('--bg-card-hover', 'rgba(55, 65, 81, 0.9)');
      root.style.setProperty('--border-color', 'rgba(75, 85, 99, 0.5)');
    } else {
      root.style.setProperty('--text-primary', '#111827');
      root.style.setProperty('--text-secondary', '#374151');
      root.style.setProperty('--text-muted', '#6b7280');
      root.style.setProperty('--bg-card', 'rgba(255, 255, 255, 0.9)');
      root.style.setProperty('--bg-card-hover', 'rgba(249, 250, 251, 0.9)');
      root.style.setProperty('--border-color', 'rgba(229, 231, 235, 0.5)');
    }
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

            {/* Main Content with Global Theme Styling */}
            <main className="container mx-auto px-4 py-8 pb-20 relative z-20">
              <div 
                className={`backdrop-blur-sm rounded-3xl p-6 transition-all duration-500 shadow-xl border ${
                  theme === 'dark' 
                    ? 'bg-gray-800/60 border-gray-600/50 shadow-black/30' 
                    : 'bg-white/60 border-gray-200/50 shadow-gray-900/5'
                }`}
                style={{
                  // Global theme variables for child components
                  color: theme === 'dark' ? '#ffffff' : '#111827'
                }}
              >
                {/* Global Theme Styles */}
                <style jsx global>{`
                  /* Ensure all text is visible in both themes */
                  [data-theme="dark"] .text-gray-900,
                  [data-theme="dark"] .text-gray-800,
                  [data-theme="dark"] .text-gray-700,
                  [data-theme="dark"] .text-black {
                    color: #ffffff !important;
                  }
                  
                  [data-theme="dark"] .text-gray-600,
                  [data-theme="dark"] .text-gray-500 {
                    color: #e5e7eb !important;
                  }
                  
                  [data-theme="dark"] .text-gray-400 {
                    color: #9ca3af !important;
                  }
                  
                  /* Card backgrounds in dark theme */
                  [data-theme="dark"] .bg-white {
                    background-color: rgba(31, 41, 55, 0.9) !important;
                    border-color: rgba(75, 85, 99, 0.5) !important;
                  }
                  
                  [data-theme="dark"] .bg-gray-50 {
                    background-color: rgba(55, 65, 81, 0.8) !important;
                  }
                  
                  /* Ensure card text is always visible */
                  [data-theme="dark"] .card-content,
                  [data-theme="dark"] .card-content *,
                  [data-theme="dark"] [class*="text-"] {
                    color: #ffffff !important;
                  }
                  
                  /* Stats card specific fixes */
                  [data-theme="dark"] .stats-card .text-2xl,
                  [data-theme="dark"] .stats-card .text-xl,
                  [data-theme="dark"] .stats-card .font-bold {
                    color: #ffffff !important;
                  }
                  
                  /* Table styling for dark theme */
                  [data-theme="dark"] table,
                  [data-theme="dark"] th,
                  [data-theme="dark"] td {
                    color: #ffffff !important;
                    border-color: rgba(75, 85, 99, 0.5) !important;
                  }
                  
                  [data-theme="dark"] .table-row:hover {
                    background-color: rgba(55, 65, 81, 0.5) !important;
                  }
                  
                  /* Override any inherited text colors */
                  [data-theme="dark"] * {
                    color: inherit;
                  }
                  
                  [data-theme="dark"] h1,
                  [data-theme="dark"] h2,
                  [data-theme="dark"] h3,
                  [data-theme="dark"] h4,
                  [data-theme="dark"] h5,
                  [data-theme="dark"] h6 {
                    color: #ffffff !important;
                  }
                  
                  [data-theme="dark"] p,
                  [data-theme="dark"] span,
                  [data-theme="dark"] div {
                    color: #ffffff;
                  }
                `}</style>
                
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/student/:usn" element={<StudentDetail />} />
                </Routes>
              </div>
            </main>
            
            {/* Enhanced Professional Footer */}
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