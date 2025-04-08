import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen flex flex-col items-center text-white">
      <Navbar />
      <main className="flex-grow w-full flex flex-col justify-center items-center px-4">
        <div className="container max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
