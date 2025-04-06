import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import BackgroundAnimation from "@components/Common/BackgroundAnimation";
import LoadingPage from "@components/Common/LoadingPage";
import Layout from "@components/Layout/Layout";
import NavigationBar from "@components/Common/Navbar";
import Footer from "@components/Common/Footer";
import BackToTop from '@components/Common/BackToTop';

// Import topic components
import Sort from "@components/Elements/Topics/Sort/Sort";
import Array from "@components/Elements/Topics/Array/Array";
import Graph from "@components/Elements/Topics/Graph/Graph";
import Tree from "@components/Elements/Topics/Tree/Tree";
import LinkedList from "@components/Elements/Topics/LinkedList/LinkedList";

// Separate component for scroll restoration
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
};

// Main app content component
const AppContent = () => {
  return (
    <>
      <ScrollToTop />
      <BackToTop />
      <div className="app-container">
        <NavigationBar />
        <BackgroundAnimation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/sort" element={<Sort />} />
            <Route path="/array" element={<Array />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/tree" element={<Tree />} />
            <Route path="/linkedlist" element={<LinkedList />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Debug message
    console.log('App mounted');
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log('Loading complete');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
