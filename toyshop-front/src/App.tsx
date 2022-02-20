import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./routes/login.css";
import AppRouter from "./router";
import { AuthProvider } from "./providers/auth-provider";
import { Toaster } from "react-hot-toast";
import { Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
