import React from "react";

const Hero: React.FC = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[500px] text-white"
      style={{
        backgroundImage: `url('https://via.placeholder.com/1200x500?text=Bienvenido+a+Blockbuster')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute bottom-10 left-10">
        <h1 className="text-5xl font-bold">Bienvenido a Blockbuster</h1>
        <p className="text-lg mt-2">
          Explora y alquila tus películas favoritas.
        </p>
        <button className="bg-yellow-400 text-black py-2 px-4 rounded mt-4 hover:bg-yellow-500 transition duration-300">
          Explorar Ahora
        </button>
      </div>
    </div>
  );
};

export default Hero;
