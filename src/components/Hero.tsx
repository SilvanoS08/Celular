import React from "react";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { IMAGES } from "../data";

interface HeroProps {
  onCtaClick: () => void;
  onCompareClick: () => void;
}

export default function Hero({ onCtaClick, onCompareClick }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="destaques" className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-black via-[#050505] to-[#000000]">
      
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left"
          >
            {/* Promo Tag */}
            <motion.div variants={itemVariants} className="inline-flex items-center justify-center lg:justify-start gap-2 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-450 tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" />
              Lançamento Oficial • Linha Aura 15
            </motion.div>

            {/* Display Headings */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1] text-white">
              O futuro dos smartphones
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-cyan-350 to-indigo-400 bg-clip-text text-transparent">
                esculpido em Titânio.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={itemVariants} className="mt-6 text-lg text-gray-400 font-medium max-w-xl mx-auto lg:mx-0">
              Conheça os novos smartphones Aura 15. Potência absurda de 3nm, sistema fotográfico avançado de até 200MP e autonomia inteligente para acompanhar o seu ritmo.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <motion.button
                id="cta-buy-now"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onCtaClick}
                className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-gray-200 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer group"
              >
                Comprar Agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                id="cta-compare"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                whileTap={{ scale: 0.98 }}
                onClick={onCompareClick}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-2xl transition-all cursor-pointer"
              >
                Comparar Modelos
              </motion.button>
            </motion.div>

            {/* Features Row */}
            <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-white">3nm</span>
                <span className="text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Super Chipset</span>
              </div>
              <div className="border-x border-white/10 px-4">
                <span className="block text-2xl sm:text-3xl font-extrabold text-white">200MP</span>
                <span className="text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Sensor Quad</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-white">3000n</span>
                <span className="text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Brilho Máximo</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Showcase Media */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Visual Pedestal & Glow background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/25 to-indigo-600/5 rounded-full blur-[100px] w-80 h-80 m-auto animate-pulse" />
            
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none group">
              {/* Outer floating borders */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition duration-700 pointer-events-none" />
              
              {/* Image Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
                <img
                  src={IMAGES.hero}
                  alt="Aura 15 Pro Flagship"
                  className="w-full h-auto object-cover transform transition duration-700 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Float Floating Spec Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 sm:-left-6 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-3.5"
              >
                <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-400 leading-tight">Garantia Estendida</span>
                  <span className="block text-sm font-extrabold text-white leading-tight">2 Anos Inclusos</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Highlight Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 py-6 border-y border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-400"
        >
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-blue-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Frete Grátis Express</p>
              <p className="text-xs text-gray-500">Para todo o Brasil acima de R$ 1.999</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-blue-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Parcelamento s/ Juros</p>
              <p className="text-xs text-gray-500">Em até 12x de forma segura</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-end">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Satisfação Garantida</p>
              <p className="text-xs text-gray-500">7 dias para testar ou devolver</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
