import React, { useState, FormEvent } from "react";
import { motion } from "motion/react";
import {
  Globe,
  Cpu,
  ShoppingBag,
  Palette,
  Video,
  Database,
  ArrowRight,
  PhoneCall,
  Mail,
  User,
  MapPin,
  ExternalLink,
  Layers,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  Sparkles,
} from "lucide-react";
import { CONFIG } from "./data";
import AIParticlesBackground from "./components/AIParticlesBackground";
import Navbar from "./components/Navbar";
import ServiceCard from "./components/ServiceCard";
import PricingCard from "./components/PricingCard";
import CostCalculator from "./components/CostCalculator";
import PortfolioShowcase from "./components/PortfolioShowcase";
import OrderModal from "./components/OrderModal";
import Toast from "./components/Toast";

export default function App() {
  const [selectedService, setSelectedService] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    message: "",
  });

  const triggerToast = (msg: string, type: "success" | "error" | "info" = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 4000);
  };

  const handleOrderTrigger = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone || !contactForm.message) {
      triggerToast("Please fill in all required fields.", "error");
      return;
    }

    const messageText =
      `Hello Janah Studio,\n\nI have an enquiry:\n` +
      `----------------------------------------\n` +
      `👤 *Name*: ${contactForm.name}\n` +
      `📞 *Phone/WhatsApp*: ${contactForm.phone}\n` +
      `📧 *Email*: ${contactForm.email || "Not provided"}\n` +
      `🌍 *Country*: ${contactForm.country || "Not provided"}\n\n` +
      `💬 *Message*:\n${contactForm.message}`;

    const waUrl = `https://wa.me/${CONFIG.brand.whatsapp}?text=${encodeURIComponent(messageText)}`;
    triggerToast("Enquiry message compiled. Opening WhatsApp...");
    
    setTimeout(() => {
      window.open(waUrl, "_blank", "referrer");
    }, 800);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(CONFIG.brand.email);
    triggerToast("Email address copied to clipboard!");
  };

  const handleQuickScroll = (id: string) => {
    const el = document.getElementById(`service-card-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      
      // Temporary neon highlight and soft zoom effect on the target card
      el.classList.add("ring-2", "ring-[#20e0dc]", "scale-[1.03]", "shadow-[0_0_40px_rgba(32,224,220,0.25)]");
      setTimeout(() => {
        el.classList.remove("ring-2", "ring-[#20e0dc]", "scale-[1.03]", "shadow-[0_0_40px_rgba(32,224,220,0.25)]");
      }, 1800);
    } else {
      const servicesSec = document.getElementById("services");
      if (servicesSec) {
        servicesSec.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-[#eef6ff] font-sans overflow-x-hidden selection:bg-[#20e0dc]/20 selection:text-[#20e0dc]">
      {/* Dynamic AI constellation background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Glow ambient spots */}
        <div className="absolute top-[10%] left-[10%] w-[35rem] h-[35rem] rounded-full bg-[radial-gradient(circle,rgba(57,167,255,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-[40%] right-[5%] w-[40rem] h-[40rem] rounded-full bg-[radial-gradient(circle,rgba(140,108,255,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[15%] w-[38rem] h-[38rem] rounded-full bg-[radial-gradient(circle,rgba(32,224,220,0.04)_0%,transparent_70%)] pointer-events-none" />
      </div>

      {/* Navigation menu */}
      <Navbar onOrderTrigger={handleOrderTrigger} />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4">
        {/* High performance canvas particle network */}
        <AIParticlesBackground />

        {/* Content Box */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(57,167,255,0.16)] bg-white/5 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#20e0dc] animate-pulse" />
              <span className="text-xs font-semibold text-[#b9d9ff] uppercase tracking-widest">
                Affordable Digital & AI Studio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-[#eef6ff]"
            >
              Build Your Digital Presence{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20e0dc] via-[#39a7ff] to-[#8c6cff]">
                with Janah Studio
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#9aacc4] text-base sm:text-lg max-w-xl leading-relaxed"
            >
              Professional websites, bespoke desktop applications, graphic design, voice-synthesized AI video services, and high-speed data entry. Built cheaply, delivered instantly.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={() => handleOrderTrigger("Website Development")}
                className="px-8 py-4 rounded-xl font-bold text-[#03101d] bg-gradient-to-r from-[#20e0dc] via-[#39a7ff] to-[#8c6cff] shadow-[0_10px_25px_rgba(57,167,255,0.25)] hover:shadow-[0_15px_35px_rgba(57,167,255,0.4)] hover:-translate-y-0.5 cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 shrink-0" />
              </button>
              <a
                href="#services"
                className="px-8 py-4 rounded-xl font-bold text-[#eaf5ff] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all flex items-center justify-center"
              >
                Explore Services
              </a>
            </motion.div>

            {/* Quick Service Selection Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="space-y-3 pt-6 pb-2"
            >
              <p className="text-xs font-black text-[#aabbd0] uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#20e0dc] animate-pulse" />
                Quick Service Finder / فوری سروس سلیکٹر
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {CONFIG.services.map((service) => {
                  const Icon =
                    service.icon === "Globe" ? Globe :
                    service.icon === "Cpu" ? Cpu :
                    service.icon === "ShoppingBag" ? ShoppingBag :
                    service.icon === "Palette" ? Palette :
                    service.icon === "Video" ? Video : Database;
                  
                  return (
                    <button
                      key={service.id}
                      onClick={() => handleQuickScroll(service.id)}
                      className="group flex flex-col items-center justify-center text-center p-3.5 rounded-2xl border border-[rgba(126,180,255,0.08)] bg-[#030914]/85 hover:bg-[#0c1e36] hover:border-[#39a7ff]/50 hover:shadow-[0_12px_25px_rgba(57,167,255,0.12)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#20e0dc]/40 flex items-center justify-center mb-2.5 transition-all">
                        <Icon className="w-4.5 h-4.5 text-[#20e0dc] group-hover:scale-110 transition-all duration-300" />
                      </div>
                      <span className="text-[11px] font-black text-[#eef6ff] group-hover:text-[#39a7ff] tracking-tight leading-tight whitespace-normal">
                        {service.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[rgba(255,255,255,0.06)]"
            >
              {CONFIG.stats.map(([num, label]) => (
                <div
                  key={label}
                  className="p-4 rounded-xl border border-[rgba(126,180,255,0.08)] bg-white/[0.02] backdrop-blur-sm"
                >
                  <p className="text-2xl font-black text-[#eef6ff] tracking-tight">{num}</p>
                  <p className="text-[10px] text-[#9aacc4] uppercase font-bold mt-1 tracking-wider">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Graphical Orbital Animation */}
          <div className="lg:col-span-5 relative flex items-center justify-center h-[340px] md:h-[480px]">
            {/* Pulsing Neural Center Orb */}
            <div className="absolute w-44 h-44 rounded-full bg-gradient-to-br from-[#20e0dc]/10 via-[#39a7ff]/10 to-[#8c6cff]/5 border border-[rgba(32,224,220,0.15)] flex items-center justify-center animate-pulse">
              <Sparkles className="w-10 h-10 text-[#20e0dc]" />
            </div>

            {/* Orbiting Ring lines */}
            <div className="absolute inset-8 rounded-full border border-[rgba(57,167,255,0.15)] animate-[spin_12s_linear_infinite] [transform-style:preserve-3d] rotate-x-45" />
            <div className="absolute inset-16 rounded-full border border-[rgba(140,108,255,0.12)] animate-[spin_18s_linear_infinite_reverse] [transform-style:preserve-3d] rotate-y-45" />
            <div className="absolute inset-24 rounded-full border border-[rgba(32,224,220,0.1)] animate-[spin_24s_linear_infinite] [transform-style:preserve-3d] rotate-z-45" />

            {/* Interactive Float Cards */}
            <div className="absolute top-12 right-6 p-3 rounded-xl border border-[rgba(126,180,255,0.16)] bg-[#0b1627]/80 backdrop-blur-md shadow-lg text-[10px] font-bold text-[#eef6ff] flex items-center gap-1.5 animate-[bounce_5s_infinite_ease-in-out]">
              <span className="w-1.5 h-1.5 bg-[#20e0dc] rounded-full" />
              Website & App Design
            </div>
            <div className="absolute bottom-16 left-4 p-3 rounded-xl border border-[rgba(126,180,255,0.16)] bg-[#0b1627]/80 backdrop-blur-md shadow-lg text-[10px] font-bold text-[#eef6ff] flex items-center gap-1.5 animate-[bounce_6s_infinite_ease-in-out_1s]">
              <span className="w-1.5 h-1.5 bg-[#8c6cff] rounded-full" />
              AI Synthesized Videos
            </div>
            <div className="absolute top-1/2 left-0 p-3 rounded-xl border border-[rgba(126,180,255,0.16)] bg-[#0b1627]/80 backdrop-blur-md shadow-lg text-[10px] font-bold text-[#eef6ff] flex items-center gap-1.5 animate-[bounce_7s_infinite_ease-in-out_2s]">
              <span className="w-1.5 h-1.5 bg-[#39a7ff] rounded-full" />
              Data Catalog Entry
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 border-t border-[rgba(255,255,255,0.05)] bg-[#050914]/40 relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 space-y-16">
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-4 border-b border-[rgba(255,255,255,0.05)]">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b9d9ff] uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                What we build
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-[#eef6ff] tracking-tight leading-none">
                Digital services that <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20e0dc] to-[#39a7ff]">move ideas forward.</span>
              </h2>
            </div>
            <p className="text-[#9aacc4] text-sm sm:text-base max-w-md leading-relaxed">
              Highly specialized digital craftsmanship for freelancers, creators, startups, and enterprises — with clear pricing structures and custom specifications.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONFIG.services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onOrderTrigger={handleOrderTrigger}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 space-y-16">
          {/* Heading */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-4 border-b border-[rgba(255,255,255,0.05)]">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b9d9ff] uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                Transparent pricing
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-[#eef6ff] tracking-tight leading-none">
                Simple prices. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20e0dc] to-[#8c6cff]">Flexible scopes.</span>
              </h2>
            </div>
            <p className="text-[#9aacc4] text-sm sm:text-base max-w-md leading-relaxed">
              Direct, promotional pricing plans optimized for startup setups. Change or customize details with direct support integration.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {CONFIG.pricing.map((plan, idx) => (
              <PricingCard
                key={plan.service + idx}
                plan={plan}
                onOrderTrigger={handleOrderTrigger}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cost Calculator Section */}
      <section className="py-12 relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <CostCalculator onOrderTrigger={handleOrderTrigger} />
        </div>
      </section>

      {/* Portfolio Showcase Section */}
      <section id="portfolio" className="py-24 relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 space-y-16">
          {/* Heading */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-4 border-b border-[rgba(255,255,255,0.05)]">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b9d9ff] uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                Website showcase & work
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-[#eef6ff] tracking-tight leading-none">
                Portfolio that <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39a7ff] to-[#8c6cff]">sells the craft.</span>
              </h2>
            </div>
            <p className="text-[#9aacc4] text-sm sm:text-base max-w-md leading-relaxed">
              Explore live application concepts, responsive client websites, and AI digital artwork delivered by Janah Studio.
            </p>
          </div>

          {/* Showcase grid & tabs */}
          <PortfolioShowcase onOrderTrigger={handleOrderTrigger} />
        </div>
      </section>

      {/* Info Blocks / About Section */}
      <section id="about" className="py-24 bg-[#050914]/40 relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-[#081221]/80 border border-[rgba(126,180,255,0.12)] rounded-3xl p-8 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b9d9ff] uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              Blogger-ready blog
            </span>
            <h3 className="text-2xl font-black text-[#eef6ff] tracking-tight">
              Insights, tutorials & <span className="text-[#20e0dc]">updates.</span>
            </h3>
            <p className="text-[#9aacc4] text-xs leading-relaxed">
              We leverage clean custom configurations and deploy highly visual systems. Follow our regular Blogger articles for new tools, code templates, free design assets, YouTube editing shortcuts, and direct discount codes.
            </p>
            <div className="pt-4">
              <a
                href={CONFIG.brand.blogUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-[#39a7ff] text-[#03101d] hover:bg-[#1bb0ff] transition-all"
              >
                Open Studio Blog
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#081221]/80 border border-[rgba(126,180,255,0.12)] rounded-3xl p-8 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b9d9ff] uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              Why Janah Studio
            </span>
            <h3 className="text-2xl font-black text-[#eef6ff] tracking-tight">
              Professional without <span className="text-[#8c6cff]">unnecessary cost.</span>
            </h3>
            <p className="text-[#9aacc4] text-xs leading-relaxed">
              Janah Studio is a streamlined digital house focused purely on practical solutions. We eliminate expensive overheads and coordinate directly through automated workflows and secure WhatsApp integrations, giving small businesses access to top-tier web solutions.
            </p>
            <p className="text-[#9aacc4] text-xs leading-relaxed">
              Services and prices are configured transparently. For custom scale-outs, reach out via the secure form for an instantly revised quote.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left info column */}
          <div className="lg:col-span-5 bg-[#081221]/80 border border-[rgba(126,180,255,0.12)] rounded-3xl p-8 space-y-8 flex flex-col justify-between h-full relative overflow-hidden">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b9d9ff] uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                Let's work together
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#eef6ff] tracking-tight leading-none">
                Start your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20e0dc] to-[#39a7ff]">project instantly.</span>
              </h2>
              <p className="text-[#9aacc4] text-xs leading-relaxed">
                Connect with us directly. We coordinate design files, domain credentials, and specifications on WhatsApp and email for maximum convenience.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-4 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {/* WhatsApp Row */}
              <a
                href={`https://wa.me/${CONFIG.brand.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-[rgba(255,255,255,0.05)] hover:border-[#18c77c]/30 hover:bg-[#18c77c]/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#18c77c]/10 flex items-center justify-center shrink-0 border border-[#18c77c]/20">
                  <PhoneCall className="w-4 h-4 text-[#18c77c]" />
                </div>
                <div>
                  <p className="text-[10px] text-[#9aacc4] font-bold uppercase tracking-wider">
                    WhatsApp Chat
                  </p>
                  <p className="text-sm font-black text-[#eef6ff] group-hover:text-[#18c77c] transition-all">
                    {CONFIG.brand.whatsappDisplay}
                  </p>
                </div>
              </a>

              {/* Email Row */}
              <button
                onClick={copyEmailToClipboard}
                className="w-full text-left flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-[rgba(255,255,255,0.05)] hover:border-[#39a7ff]/30 hover:bg-[#39a7ff]/5 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#39a7ff]/10 flex items-center justify-center shrink-0 border border-[#39a7ff]/20">
                  <Mail className="w-4 h-4 text-[#39a7ff]" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] text-[#9aacc4] font-bold uppercase tracking-wider">
                    Click to Copy Email
                  </p>
                  <p className="text-sm font-black text-[#eef6ff] group-hover:text-[#39a7ff] transition-all truncate">
                    {CONFIG.brand.email}
                  </p>
                </div>
              </button>
            </div>

            {/* Social channels */}
            <div className="pt-6 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-[#687b91]">@Janah.studio</span>
              <div className="flex items-center gap-2">
                {[
                  { icon: Instagram, href: "#", color: "hover:text-[#ff4e83]" },
                  { icon: Facebook, href: "#", color: "hover:text-[#3b5998]" },
                  { icon: Youtube, href: "#", color: "hover:text-[#ff0000]" },
                  { icon: MessageCircle, href: "#", color: "hover:text-[#18c77c]" },
                ].map((soc, idx) => {
                  const Icon = soc.icon;
                  return (
                    <a
                      key={idx}
                      href={soc.href}
                      className={`p-2 rounded-lg bg-white/5 border border-white/10 text-[#9aacc4] transition-all ${soc.color}`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right contact form */}
          <form
            onSubmit={handleContactSubmit}
            className="lg:col-span-7 bg-[#081221]/80 border border-[rgba(126,180,255,0.12)] rounded-3xl p-8 space-y-6 relative overflow-hidden"
          >
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b9d9ff] uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                Interactive Contact form
              </span>
              <h3 className="text-2xl font-black text-[#eef6ff] tracking-tight">
                Tell us what you need.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#aabbd0] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#20e0dc]" />
                  Full Name *
                </label>
                <input
                  name="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                  placeholder="e.g. Muhammad Ali"
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(126,180,255,0.16)] bg-[#020812]/70 text-[#fff] placeholder-[#5a6d85] text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all"
                />
              </div>

              {/* Phone / whatsapp */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#aabbd0] flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-[#20e0dc]" />
                  Phone / WhatsApp *
                </label>
                <input
                  name="phone"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  required
                  placeholder="e.g. +92 300 1234567"
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(126,180,255,0.16)] bg-[#020812]/70 text-[#fff] placeholder-[#5a6d85] text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#aabbd0] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#20e0dc]" />
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="e.g. ali@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(126,180,255,0.16)] bg-[#020812]/70 text-[#fff] placeholder-[#5a6d85] text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all"
                />
              </div>

              {/* Country */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#aabbd0] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#20e0dc]" />
                  Country
                </label>
                <input
                  name="country"
                  value={contactForm.country}
                  onChange={(e) => setContactForm({ ...contactForm, country: e.target.value })}
                  placeholder="e.g. Pakistan"
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(126,180,255,0.16)] bg-[#020812]/70 text-[#fff] placeholder-[#5a6d85] text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-[#aabbd0]">Message *</label>
                <textarea
                  name="message"
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                  placeholder="What can we design, develop, build or edit for you? Specify outline directions..."
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(126,180,255,0.16)] bg-[#020812]/70 text-[#fff] placeholder-[#5a6d85] text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl font-bold text-[#03101d] bg-gradient-to-r from-[#20e0dc] via-[#39a7ff] to-[#8c6cff] hover:shadow-[0_15px_30px_rgba(57,167,255,0.25)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Send Enquiry via WhatsApp
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[rgba(255,255,255,0.05)] bg-[#02050b]">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[#9aacc4] text-xs">
          <div className="flex items-center gap-3">
            <img src={CONFIG.brand.logo} alt="Janah Studio" className="w-7 h-7 rounded-lg bg-white p-0.5 object-contain" />
            <span>&copy; {new Date().getFullYear()} Janah Studio. All rights reserved.</span>
          </div>
          <p className="text-center md:text-right font-medium text-[#687b91]">
            Affordable · Modern · Practical Digital Solutions
          </p>
        </div>
      </footer>

      {/* Floating Action WhatsApp bubble */}
      <a
        href={`https://wa.me/${CONFIG.brand.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full flex items-center justify-center bg-[#18c77c] text-[#04120b] shadow-[0_10px_25px_rgba(24,199,124,0.3)] hover:scale-110 active:scale-95 hover:shadow-[0_15px_30px_rgba(24,199,124,0.45)] transition-all"
        aria-label="Direct WhatsApp Support Chat"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Interactive Forms & Dialog Modals */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedServiceTitle={selectedService}
        services={CONFIG.services}
        onTriggerToast={triggerToast}
      />

      {/* Status Toasts */}
      <Toast message={toastMessage} type={toastType} isVisible={isToastVisible} onClose={() => setIsToastVisible(false)} />
    </div>
  );
}
