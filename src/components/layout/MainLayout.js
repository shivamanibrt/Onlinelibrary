import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const MainLayout = ({ children }) => {
  return (
    <div>
      {/* Header section */}
      <Header />

      {/* main content area */}
      <div className="main">{children}</div>

      {/* footer sectio */}
      <Footer />
    </div>
  );
};
