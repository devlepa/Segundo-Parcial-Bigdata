import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col w-full">
      <Navbar /> {/* Navbar included only once */}
      <main className="flex-grow w-full flex justify-center items-center px-4">
        <div className="container">{children}</div> {/* Centered content */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
