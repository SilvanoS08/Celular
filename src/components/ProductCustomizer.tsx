import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Cpu, Camera, Battery, Smartphone, ShoppingBag } from "lucide-react";
import { SMARTPHONES } from "../data";
import { Smartphone as SmartphoneType, PhoneColor, PhoneStorage } from "../types";

interface ProductCustomizerProps {
  onAddToCart: (phone: SmartphoneType, color: PhoneColor, storage: PhoneStorage, finalPrice: number) => void;
}

export default function ProductCustomizer({ onAddToCart }: ProductCustomizerProps) {
  const [selectedModelIndex, setSelectedModelIndex] = useState(1); // Default to Aura 15 Pro (index 1)
  const currentModel = SMARTPHONES[selectedModelIndex];

  const [selectedColor, setSelectedColor] = useState<PhoneColor>(currentModel.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState<PhoneStorage>(currentModel.storages[0]);

  // When model changes, reset selected color and storage to the new model's defaults
  const handleModelChange = (index: number) => {
    setSelectedModelIndex(index);
    const newModel = SMARTPHONES[index];
    setSelectedColor(newModel.colors[0]);
    setSelectedStorage(newModel.storages[0]);
  };

  const calculatedPrice = currentModel.basePrice + selectedStorage.priceAdjustment;
  const pixPrice = calculatedPrice * 0.9; // 10% discount on Pix

  const handleAddToCartClick = () => {
    onAddToCart(currentModel, selectedColor, selectedStorage, calculatedPrice);
  };

  return (
    <section id="personalizar" className="py-24 bg-black relative border-t border-white/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-white">
            Monte o seu Aura 15
          </h2>
          <p className="mt-4 text-gray-400 text-base font-medium">
            Escolha o modelo ideal, defina a cor que mais combina com você e selecione o espaço de armazenamento necessário para a sua rotina.
          </p>
        </div>

        {/* Model Tabs Selection */}
        <div className="flex justify-center mb-12 p-1.5 bg-white/5 border border-white/10 rounded-2xl max-w-lg mx-auto">
          {SMARTPHONES.map((phone, index) => {
            const isSelected = selectedModelIndex === index;
            return (
              <button
                key={phone.id}
                onClick={() => handleModelChange(index)}
                className={`flex-1 relative py-3.5 px-2 text-center rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  isSelected ? "text-white" : "text-gray-450 hover:text-white"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeModelIndicator"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 block">{phone.name}</span>
                {phone.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                    Popular
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Customization Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6">
          
          {/* Left Column: Interactive Phone Preview */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square bg-white/5 rounded-3xl border border-white/10 p-8 flex items-center justify-center overflow-hidden group">
              {/* Decorative radial lighting representing chosen color */}
              <div 
                className="absolute inset-0 opacity-15 blur-3xl transition-all duration-700" 
                style={{ 
                   background: `radial-gradient(circle, ${selectedColor.hex} 0%, rgba(0,0,0,0) 70%)` 
                }} 
              />
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentModel.id + "-" + selectedColor.id}
                  src={currentModel.image}
                  alt={`${currentModel.name} - ${selectedColor.colorNamePt}`}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-auto max-h-[80%] object-contain relative z-10 drop-shadow-[0_25px_35px_rgba(0,0,0,0.65)]"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Tag finish */}
              <div className="absolute bottom-4 left-4 bg-black/95 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-gray-400 font-semibold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: selectedColor.hex }} />
                Acabamento: {selectedColor.colorNamePt}
              </div>
            </div>

            {/* Micro Specs Sheet */}
            <div className="w-full max-w-sm sm:max-w-md mt-6 grid grid-cols-3 gap-3">
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col items-center text-center">
                <Cpu className="w-4 h-4 text-blue-400 mb-1" />
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Processador</span>
                <span className="text-[11px] text-white font-semibold mt-1 truncate max-w-full">{currentModel.specs.cpu.split(" (")[0]}</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col items-center text-center">
                <Camera className="w-4 h-4 text-blue-400 mb-1" />
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Câmera Principal</span>
                <span className="text-[11px] text-white font-semibold mt-1 truncate max-w-full">{currentModel.specs.camera.split(" + ")[0]}</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col items-center text-center">
                <Battery className="w-4 h-4 text-blue-400 mb-1" />
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Bateria</span>
                <span className="text-[11px] text-white font-semibold mt-1 truncate max-w-full">{currentModel.specs.battery.split(" com ")[0]}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customizer Settings */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Title & Tagline */}
            <div>
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest block mb-1">Passo a Passo</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{currentModel.name}</h3>
              <p className="mt-2 text-gray-400 text-sm leading-relaxed">{currentModel.description}</p>
            </div>

            {/* Colors Section */}
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">1. Escolha a Cor</span>
              <div className="flex flex-wrap gap-3">
                {currentModel.colors.map((color) => {
                  const isSelected = selectedColor.id === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`relative flex items-center gap-2.5 px-4 py-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected 
                          ? "bg-white/10 border-blue-500 text-white" 
                          : "bg-white/5 border-white/10 text-gray-450 hover:border-white/20"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: color.hex }} />
                      <span className="text-xs font-bold">{color.colorNamePt}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-blue-500 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Storage Section */}
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">2. Escolha o Armazenamento</span>
              <div className="grid grid-cols-2 gap-3">
                {currentModel.storages.map((storage) => {
                  const isSelected = selectedStorage.size === storage.size;
                  return (
                    <button
                      key={storage.size}
                      onClick={() => setSelectedStorage(storage)}
                      className={`px-4 py-4 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected 
                          ? "bg-white/10 border-blue-500" 
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-base font-bold ${isSelected ? "text-white" : "text-gray-300"}`}>
                          {storage.size}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-blue-500" />}
                      </div>
                      <span className="text-xs font-medium text-gray-500 block mt-1">
                        {storage.priceAdjustment === 0 
                          ? "Incluso no preço base" 
                          : `+ R$ ${storage.priceAdjustment.toLocaleString("pt-BR")}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price & Add to Cart Action */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider block mb-1">Preço Total Parcelado</span>
                  <span className="text-2xl sm:text-3xl font-bold text-white">
                    R$ {calculatedPrice.toLocaleString("pt-BR")}
                  </span>
                  <span className="text-xs text-gray-400 block mt-1">
                    em até 12x de R$ {(calculatedPrice / 12).toLocaleString("pt-BR", { maximumFractionDigits: 2 })} sem juros
                  </span>
                </div>

                <div className="sm:text-right">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                    10% de Desconto no Pix
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-emerald-400 block">
                    R$ {pixPrice.toLocaleString("pt-BR")}
                  </span>
                  <span className="text-xs text-gray-500 block">à vista no Pix</span>
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                id="add-to-cart-action"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCartClick}
                className="w-full py-4 bg-white hover:bg-gray-200 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                Adicionar ao Carrinho
              </motion.button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
