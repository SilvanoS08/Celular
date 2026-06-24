import React from "react";
import { SMARTPHONES } from "../data";
import { Check, Cpu, Camera, Battery, Smartphone } from "lucide-react";

export default function SpecsComparison() {
  const specsList = [
    {
      category: "Desempenho",
      features: [
        { name: "Processador", key: "cpu" },
        { name: "Tecnologia", value: ["4nm Octa-Core", "3nm Pro-Core", "3nm Ultra-Core"] }
      ]
    },
    {
      category: "Câmera",
      features: [
        { name: "Sistema de Lentes", key: "camera" },
        { name: "Zoom Ótico", value: ["2x Digital", "3x Ótico / 30x Híbrido", "10x Ótico / 100x Híbrido"] },
        { name: "Vídeo", value: ["4K a 60fps", "4K a 120fps / ProRes", "8K a 30fps / ProRes Log"] }
      ]
    },
    {
      category: "Bateria & Tela",
      features: [
        { name: "Capacidade", key: "battery" },
        { name: "Tela", key: "screen" },
        { name: "Brilho Máximo", value: ["1600 nits", "2000 nits", "3000 nits"] }
      ]
    }
  ];

  return (
    <section id="comparar" className="py-24 bg-black relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-white">
            Compare os Modelos
          </h2>
          <p className="mt-4 text-gray-400 text-base font-medium">
            Encontre a combinação exata de potência, autonomia e capacidade fotográfica ideal para o seu perfil de uso.
          </p>
        </div>

        {/* Matrix Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0c0c0c] backdrop-blur-md">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-6 text-sm font-bold text-gray-400 w-1/4">Especificações</th>
                {SMARTPHONES.map((phone) => (
                  <th key={phone.id} className="p-6 w-1/4">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">Linha Aura</span>
                      <h4 className="text-lg font-bold text-white">{phone.name}</h4>
                      <p className="text-xs text-gray-400 font-medium">A partir de R$ {phone.basePrice.toLocaleString("pt-BR")}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody className="divide-y divide-white/10">
              
              {/* Custom Benchmark Progress Rows */}
              <tr className="bg-white/2">
                <td className="p-6 font-bold text-sm text-gray-300">
                  Pontuação CPU (Geekbench)
                </td>
                {SMARTPHONES.map((phone) => (
                  <td key={phone.id} className="p-6">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold text-white">
                        <span>{phone.benchmark.cpu * 100} pts</span>
                        <span className="text-gray-500">{phone.benchmark.cpu}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" 
                          style={{ width: `${phone.benchmark.cpu}%` }} 
                        />
                      </div>
                    </div>
                  </td>
                ))}
              </tr>

              <tr className="bg-white/2">
                <td className="p-6 font-bold text-sm text-gray-300">
                  Pontuação GPU (3DMark)
                </td>
                {SMARTPHONES.map((phone) => (
                  <td key={phone.id} className="p-6">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold text-white">
                        <span>{phone.benchmark.gpu * 100} pts</span>
                        <span className="text-gray-500">{phone.benchmark.gpu}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" 
                          style={{ width: `${phone.benchmark.gpu}%` }} 
                        />
                      </div>
                    </div>
                  </td>
                ))}
              </tr>

              {/* General Specs Category Loop */}
              {specsList.map((categoryGroup, catIdx) => (
                <React.Fragment key={catIdx}>
                  {/* Category Header Row */}
                  <tr className="bg-white/5 border-b border-white/10">
                    <td colSpan={4} className="p-4 pl-6 text-xs font-bold text-blue-400 uppercase tracking-widest">
                      {categoryGroup.category}
                    </td>
                  </tr>

                  {/* Feature Rows */}
                  {categoryGroup.features.map((feature, featIdx) => (
                    <tr key={featIdx} className="hover:bg-white/5 transition-colors">
                      <td className="p-6 text-sm font-bold text-gray-300">{feature.name}</td>
                      {SMARTPHONES.map((phone, pIdx) => {
                        let cellContent = "";
                        if (feature.key) {
                          cellContent = phone.specs[feature.key as keyof typeof phone.specs];
                        } else if (feature.value) {
                          cellContent = feature.value[pIdx];
                        }
                        return (
                          <td key={phone.id} className="p-6 text-xs sm:text-sm text-gray-400 font-medium">
                            {cellContent}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}

            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
