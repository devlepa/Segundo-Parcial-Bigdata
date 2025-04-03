import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Blockbuster. Todos los derechos
          reservados.
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-yellow-400 transition duration-300">
            Términos y Condiciones
          </a>
          <a href="#" className="hover:text-yellow-400 transition duration-300">
            Política de Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
