import React from "react";

import "./App.css";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <AuthProvider>
          <div className="flex flex-col h-dvh">
            <Header />
            <RouterProvider router={router} />
            <Footer />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
