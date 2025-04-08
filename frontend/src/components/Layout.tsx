import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-gradient-to-b from-[#ED6A5A] via-[#F4F1BB] to-[#9BC1BC] min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow flex justify-center items-center w-full">
        <div className="container w-full max-w-4xl bg-[#E6EBE0] p-8 rounded-lg shadow-2xl text-center text-[#363636]">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
