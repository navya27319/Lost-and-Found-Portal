import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Home from './pages/Home';
import Listing from './pages/Listing';
import Report from './pages/Report';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ItemDetail from './pages/ItemDetail';

const AppContent = () => {
  const { user, currentPath } = useApp();

  if (!user) {
    return <Login />;
  }

  // Dynamic Route Handling
  if (currentPath.startsWith('/item/')) {
    const id = currentPath.split('/')[2];
    return <ItemDetail id={id} />;
  }

  // Simple Route Handling
  switch (currentPath) {
    case '/':
      return <Home />;
    case '/listing':
      return <Listing />;
    case '/report':
      return <Report />;
    case '/admin':
      return <Admin />;
    default:
      return <Home />;
  }
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
