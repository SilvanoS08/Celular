import React from "react";
import { motion } from "motion/react";
import { Truck, ShieldCheck, Zap, HelpCircle, PhoneCall, Gift } from "lucide-react";

export default function Benefits() {
  const benefitsList = [
    {
      id: 1,
      title: "Entrega Expressa Grátis",
      desc: "Frete grátis para todo o Brasil. Entregamos em capitais do Sul e Sudeste em até 2 dias úteis, com código de rastreio em tempo real.",
      icon: Truck,
      colorClass: "from-blue-500/10 to-indigo-500/5",
      iconColor: "text-blue-400",
      gridSpan: "md:col-span-2 lg:col-span-2"
    },
    {
      id: 2,
      title: "Garantia Total de 2 Anos",
      desc: "Tranquilidade garantida com 24 meses de cobertura direto de fábrica contra qualquer defeito técnico ou operacional.",
      icon: ShieldCheck,
      colorClass: "from-indigo-500/10 to-blue-500/5",
      iconColor: "text-indigo-400",
      gridSpan: "md:col-span-1 lg:col-span-1"
    },
    {
      id: 3,
      title: "Carregador Original Incluso",
      desc: "Sem surpresas ruins. Todos os smartphones Aura vêm acompanhados do carregador original de carregamento super rápido de até 65W na caixa.",
      icon: Gift,
      colorClass: "from-blue-500/10 to-cyan-500/5",
      iconColor: "text-cyan-400",
      gridSpan: "md:col-span-1 lg:col-span-1"
    },
    {
      id: 4,
      title: "Suporte Digital Expresso",
      desc: "Nosso time de suporte está disponível 24h por dia, 7 dias por semana. Resolvemos suas dúvidas técnicas em até 5 minutos via WhatsApp.",
      icon: PhoneCall,
      colorClass: "from-cyan-500/10 to-blue-500/5",
      iconColor: "text-cyan-400",
      gridSpan: "md:col-span-2 lg:col-span-2"
    },
    {
      id: 5,
      title: "Homologado Anatel 5G",
      desc: "Totalmente homologado com suporte completo às redes 5G DSS e Standalone brasileiras, garantindo máxima velocidade de internet.",
      icon: Zap,
      colorClass: "from-blue-500/10 to-purple-500/5",
      iconColor: "text-blue-450",
      gridSpan: "md:col-span-3 lg:col-span-3"
    }
  ];

  return (
    <section id="beneficios" className="py-24 bg-black relative border-t border-white/10 overflow-hidden">
      <div className="absolute -right-20 top-20 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-white">
            Por que Comprar Conosco?
          </h2>
          <p className="mt-4 text-gray-400 text-base font-medium">
            Muito além do melhor smartphone. Oferecemos uma experiência de compra segura, transparente e focada na sua comodidade.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefitsList.map((benefit, idx) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className={`group p-8 rounded-3xl border border-white/10 bg-zinc-950/20 backdrop-blur-md bg-gradient-to-tr ${benefit.colorClass} hover:border-white/20 transition-all flex flex-col justify-between ${benefit.gridSpan}`}
              >
                <div>
                  <div className={`p-3.5 bg-white/5 border border-white/10 rounded-2xl w-fit ${benefit.iconColor} mb-6`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-450 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
                
                {/* Visual Accent Arrow */}
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-8 block group-hover:text-white transition-colors">
                  Saiba mais &rarr;
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
