import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BackgroundAnimation from "./components/Common/BackgroundAnimation";
import LoadingPage from "./components/Common/LoadingPage";
import Layout from "./components/Layout/Layout";
import NavigationBar from "./components/Common/Navbar";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Router>
      <div className="app-container">
        <NavigationBar />
        <BackgroundAnimation />

        <main className="main-content">
          <Layout />
        </main>
      </div>
    </Router>
  );
}

export default App;
