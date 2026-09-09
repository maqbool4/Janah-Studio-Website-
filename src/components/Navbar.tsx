import React, { useState, useEffect, MouseEvent } from "react";
import { Menu, X, ArrowUpRight, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CONFIG } from "../data";

interface NavbarProps {
  onOrderTrigger: (serviceName: string) => void;
}

export default function Navbar({ onOrderTrigger }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4 max-w-7xl mx-auto`}
    >
      <div
        className={`w-full h-18 rounded-2xl border flex items-center justify-between px-6 transition-all duration-300 ${
          scrolled
            ? "bg-[#050a14]/80 border-[rgba(57,167,255,0.22)] shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-md"
            : "bg-[#050a14]/40 border-[rgba(126,180,255,0.12)] backdrop-blur-sm"
        }`}
      >
        {/* Brand Logo & Name */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex items-center gap-2.5 font-extrabold tracking-wider text-sm md:text-base text-[#eef6ff] shrink-0"
        >
          <img
            src={CONFIG.brand.logo}
            alt="Janah Studio Logo"
            className="w-10 h-10 rounded-xl bg-white object-contain p-0.5 border border-white/10"
          />
          <span>JANAH STUDIO</span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-4 py-2 text-xs md:text-sm font-semibold text-[#b8c7da] hover:text-[#fff] hover:bg-white/5 rounded-xl transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`https://wa.me/${CONFIG.brand.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#18c77c] bg-[#18c77c]/10 border border-[#18c77c]/20 hover:bg-[#18c77c]/15 transition-all flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 shrink-0" />
            WhatsApp Chat
          </a>
          <button
            onClick={() => onOrderTrigger("Website Development")}
            className="px-5 py-2.5 rounded-xl text-xs font-black tracking-wide uppercase text-[#03101d] bg-[#20e0dc] hover:bg-[#1bd1cc] shadow-[0_4px_15px_rgba(32,224,220,0.2)] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            Order Now
          </button>
        </div>

        {/* Hamburger Menu Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0c1627] text-[#9aacc4] hover:text-[#fff] hover:border-[rgba(57,167,255,0.3)] transition-all cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 z-40 bg-[#050a14]/98 border border-[rgba(57,167,255,0.22)] rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.65)] backdrop-blur-lg flex flex-col space-y-4 lg:hidden"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-3 text-sm font-semibold text-[#b8c7da] hover:text-[#fff] hover:bg-white/5 rounded-xl transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="h-[1px] bg-[rgba(255,255,255,0.06)]" />

            {/* Actions for Mobile */}
            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${CONFIG.brand.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl text-center text-xs font-bold text-[#18c77c] bg-[#18c77c]/10 border border-[#18c77c]/20 flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                Contact on WhatsApp
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOrderTrigger("Website Development");
                }}
                className="w-full py-3.5 rounded-xl text-center text-xs font-black uppercase text-[#03101d] bg-[#20e0dc] flex items-center justify-center gap-1 cursor-pointer"
              >
                Order Digital Project
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
