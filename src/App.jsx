import React, { useState, useEffect } from 'react';
import BackgroundAnimation from "./components/Common/BackgroundAnimation";
import LoadingPage from "./components/Common/LoadingPage";
import './styles/main.scss';

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
    <>
      <BackgroundAnimation />
    </>
  );
}

export default App;
