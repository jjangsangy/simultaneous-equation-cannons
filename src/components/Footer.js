import React from "react";
import { Github } from "./icons";

const Footer = () => (
    <footer className="pt-6 border-t border-slate-700/50 text-center">
        <a
            href="https://github.com/jjangsangy/simultaneous-equation-cannons"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors text-sm"
        >
            <Github className="w-4 h-4" />
            <span>Created by jjangsangy</span>
        </a>
    </footer>
);

export default Footer;
