import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQS } from "../data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-black relative border-t border-white/10">
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex p-3 bg-white/5 border border-white/10 text-blue-400 rounded-2xl mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-white">
            Perguntas Frequentes
          </h2>
          <p className="mt-4 text-gray-400 text-base font-medium">
            Ficou com alguma dúvida? Confira as respostas para as principais dúvidas dos nossos clientes.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openIndex === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-all cursor-pointer"
                >
                  <span className="text-base font-bold text-white pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-500 hover:text-white transition-colors p-1"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 border-t border-white/10 text-sm sm:text-base text-gray-400 leading-relaxed font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
