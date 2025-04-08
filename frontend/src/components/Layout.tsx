import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow flex justify-center items-center w-full">
        <div className="container w-full max-w-4xl bg-white p-8 rounded-lg shadow-2xl text-center text-gray-900">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
