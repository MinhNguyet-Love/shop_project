import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import AppRoutes from "./router/AppRoutes";
import NavigationBar from "./components/Navbar";
import Footer from "./components/Footer";
import { auth } from "./config/firebase";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router> 
      <NavigationBar user={user} />
      <AppRoutes user={user} />
      <Footer />
    </Router>
  );
};

export default App;
