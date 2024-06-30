import React from 'react';
import { TbBrandGithubFilled } from "react-icons/tb";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

interface FooterProps {
  darkMode: string; // Assuming darkMode is a string, either 'dark' or some other value
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <div>
      <footer className={`footer footer-center p-10 text-base-content rounded ${darkMode === "dark" ? "bg-[#F5EEFD]" : "bg-[#0B0B0C]"}`}>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a className={`fill-current text-2xl ${darkMode === "dark" ? "text-[#272343]" : "text-[#D4D4D4]"}`} href="https://github.com/japhethh">
              <TbBrandGithubFilled />
            </a>
            <a className={`fill-current text-2xl ${darkMode === "dark" ? "text-[#272343]" : "text-[#D4D4D4]"}`} href="https://www.facebook.com/Japhetlocaylocay">
              <FaFacebookF />
            </a>
            <a className={`fill-current text-2xl ${darkMode === "dark" ? "text-[#272343]" : "text-[#D4D4D4]"}`} href="https://www.linkedin.com/in/adreylocaylocay/">
              <FaLinkedinIn />
            </a>
            <a className={`fill-current text-2xl ${darkMode === "dark" ? "text-[#272343]" : "text-[#D4D4D4]"}`} href="https://www.instagram.com/adreyjapheth/">
              <RiInstagramFill />
            </a>
          </div>
        </nav>
        <aside className={`font-semibold ${darkMode === "dark" ? "text-[#0B0B0C]" : "text-[#D4D4D4]"}`}>
          <p>Designed & Built by Adrey Locaylocay</p>
          <p>Copyright © 2024 - All right reserved</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
