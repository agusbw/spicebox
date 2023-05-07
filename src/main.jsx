import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/Auth";
import { ProfileProvider } from "./contexts/Profile.jsx";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ProfileProvider>
    </AuthProvider>
  </React.StrictMode>
);
