import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container text-center">
        <p className="mb-0">
          © {new Date().getFullYear()} Blockbuster. Todos los derechos
          reservados.
        </p>
        <div className="mt-2">
          <a href="#" className="text-warning mx-2">
            Términos y Condiciones
          </a>
          <a href="#" className="text-warning mx-2">
            Política de Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
