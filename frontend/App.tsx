import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "./pages/Dashboard";
import StudentDetail from "./pages/StudentDetail";
import Analytics from "./pages/Analytics";
import Navigation from "./components/Navigation";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50 relative">
          <Navigation />
          <main className="container mx-auto px-4 py-8 pb-16">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/student/:usn" element={<StudentDetail />} />
            </Routes>
          </main>
          
          {/* Professional Footer */}
          <footer className="fixed bottom-0 right-0 p-4 z-10">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-lg px-4 py-2 shadow-sm">
              <a
                href="https://www.linkedin.com/in/shadabur-rahaman"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium flex items-center gap-2"
              >
                <span>Developed by</span>
                <span className="text-blue-600 hover:text-blue-700 font-semibold">
                  Shadabur Rahaman
                </span>
              </a>
            </div>
          </footer>
          
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}