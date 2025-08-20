import { useState } from "react";
import OnboardingPage from "@/pages/onboarding";
import Login from "@/pages/login";
import Welcome from "@/pages/welcome";
import JourneyDetail from "@/pages/journey-detail";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const [currentPage, setCurrentPage] = useState('onboarding');
  
  const renderPage = () => {
    switch (currentPage) {
      case 'onboarding':
        return <OnboardingPage onNavigate={setCurrentPage} />;
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      case 'welcome':
        return <Welcome onNavigate={setCurrentPage} />;
      case 'journey-detail':
        return <JourneyDetail onNavigate={setCurrentPage} />;
      default:
        return <OnboardingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
      <Toaster />
    </div>
  );
}

export default App;
