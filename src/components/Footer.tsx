import React from "react";
import { Smartphone, Shield, Lock, CreditCard } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleSectionScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 text-gray-500 relative overflow-hidden">
      
      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Logo & Tagline column */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-xl text-white">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Aura<span className="text-blue-500 font-extrabold">Store</span>
              </span>
            </div>
            
            <p className="text-sm font-medium text-gray-400 max-w-sm leading-relaxed">
              Inovando a tecnologia móvel com excelência. Levamos até você os melhores smartphones esculpidos em titânio com atendimento premium nacional e garantia de 2 anos.
            </p>

            <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 pt-2">
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Compra 100% Segura</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>SSL Criptografado</span>
              </div>
            </div>
          </div>

          {/* Navigation links column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Navegação</h4>
            <ul className="space-y-3.5 text-sm font-medium">
              <li>
                <a href="#destaques" onClick={(e) => handleSectionScroll(e, "#destaques")} className="hover:text-white transition-colors">Destaques</a>
              </li>
              <li>
                <a href="#personalizar" onClick={(e) => handleSectionScroll(e, "#personalizar")} className="hover:text-white transition-colors">Personalizar Aura</a>
              </li>
              <li>
                <a href="#comparar" onClick={(e) => handleSectionScroll(e, "#comparar")} className="hover:text-white transition-colors">Especificações</a>
              </li>
              <li>
                <a href="#beneficios" onClick={(e) => handleSectionScroll(e, "#beneficios")} className="hover:text-white transition-colors">Benefícios</a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleSectionScroll(e, "#faq")} className="hover:text-white transition-colors">Dúvidas Frequentes</a>
              </li>
            </ul>
          </div>

          {/* Legal columns */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Informações Legais</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Todos os smartphones acompanham Nota Fiscal Eletrônica e selo de homologação da Anatel. Condições comerciais válidas exclusivamente para compras realizadas no site.
            </p>
            
            <div className="pt-2">
              <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Métodos de Pagamento</h5>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded text-xs font-bold text-white uppercase tracking-wider">Pix</span>
                <span className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded text-xs font-bold text-white">Visa</span>
                <span className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded text-xs font-bold text-white">Mastercard</span>
                <span className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded text-xs font-bold text-white">Elo</span>
                <span className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded text-xs font-bold text-white">Hipercard</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between text-xs font-semibold text-zinc-600 gap-4">
          <p className="text-center md:text-left">
            © 2026 Aura Store Celulares S.A. CNPJ: 12.345.678/0001-90. Avenida Paulista, 1000 - Bela Vista, São Paulo/SP - CEP: 01310-100.
          </p>
          <a href="#" onClick={handleScrollToTop} className="hover:text-white transition-colors underline shrink-0">
            Voltar ao topo &uarr;
          </a>
        </div>

      </div>
    </footer>
  );
}
