
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinkClasses = "font-semibold hover:text-primary transition-colors duration-300";
    const activeNavLinkClasses = { color: 'var(--color-primary)' }; // Using a variable to represent the theme color

    return (
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center h-20">
                {/* Cultural Design Choice: "Bếp Việt" (Viet Kitchen) is a warm and authentic name for the brand. */}
                <Link to="/" className="font-serif text-3xl font-bold text-secondary">
                    Bếp Việt
                </Link>

                <nav className="hidden md:flex items-center space-x-8">
                    <NavLink to="/" className={({ isActive }) => isActive ? `${navLinkClasses} text-primary` : navLinkClasses}>Home</NavLink>
                    <NavLink to="/menu" className={({ isActive }) => isActive ? `${navLinkClasses} text-primary` : navLinkClasses}>Menu</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? `${navLinkClasses} text-primary` : navLinkClasses}>About</NavLink>
                </nav>

                <button 
                    className="md:hidden z-10" 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className="w-6 h-6 flex flex-col justify-around">
                        <span className={`block w-full h-0.5 bg-secondary transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></span>
                        <span className={`block w-full h-0.5 bg-secondary transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-full h-0.5 bg-secondary transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></span>
                    </div>
                </button>

                {/* Mobile Menu Overlay */}
                <div 
                    className={`md:hidden fixed inset-0 bg-background transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <nav className="flex flex-col items-center justify-center h-full space-y-8 text-2xl">
                        <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={navLinkClasses}>Home</NavLink>
                        <NavLink to="/menu" onClick={() => setIsMenuOpen(false)} className={navLinkClasses}>Menu</NavLink>
                        <NavLink to="/about" onClick={() => setIsMenuOpen(false)} className={navLinkClasses}>About</NavLink>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
