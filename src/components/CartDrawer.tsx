import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, Plus, Minus, ShoppingBag, CreditCard, ChevronRight, CheckCircle2, Ticket, QrCode, Copy } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

type CheckoutStep = "cart" | "shipping" | "payment" | "success";

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0); // discount percent
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Form States
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [cityState, setCityState] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  
  // Card States
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [copiedPix, setCopiedPix] = useState(false);

  // Auto-fill address on CEP typing (mock API)
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCep(value);
    if (value.length === 8) {
      // Simulate Address fetch
      setStreet("Avenida Paulista, 1000");
      setCityState("São Paulo - SP");
    }
  };

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === "AURA10") {
      setAppliedDiscount(10);
      setCouponSuccess("Cupom de 10% aplicado com sucesso!");
      setCouponError("");
    } else {
      setCouponError("Cupom inválido. Tente 'AURA10'");
      setCouponSuccess("");
    }
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = cartSubtotal * (appliedDiscount / 100);
  const totalWithDiscount = cartSubtotal - discountAmount;
  const pixFinalTotal = totalWithDiscount * 0.9; // 10% more off if Pix chosen

  const handleNextStep = () => {
    if (step === "cart") setStep("shipping");
    else if (step === "shipping") setStep("payment");
    else if (step === "payment") {
      setStep("success");
    }
  };

  const handlePrevStep = () => {
    if (step === "shipping") setStep("cart");
    else if (step === "payment") setStep("shipping");
  };

  const handleCloseAll = () => {
    onClose();
    // Wait for animation, then reset
    setTimeout(() => {
      setStep("cart");
      setCouponCode("");
      setAppliedDiscount(0);
      setCouponSuccess("");
      setCouponError("");
      setFullName("");
      setCpf("");
      setCep("");
      setStreet("");
      setCityState("");
      setCardNumber("");
      setCardName("");
      setCardExpiry("");
      setCardCvv("");
    }, 300);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText("00020126580014BR.GOV.BCB.PIX0136aura-store-payment-key-998877665544225204000053039865802BR5915AURA_STORE_LTDA6009SAO_PAULO62070503***6304E8A3");
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseAll}
            className="fixed inset-0 z-50 bg-black/80"
          />

          {/* Drawer Sliding Body */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-full max-w-md sm:max-w-lg z-50 bg-black border-l border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0c0c0c]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-bold text-white">
                  {step === "cart" && "Seu Carrinho"}
                  {step === "shipping" && "Endereço de Entrega"}
                  {step === "payment" && "Forma de Pagamento"}
                  {step === "success" && "Pedido Confirmado!"}
                </h3>
              </div>
              <button
                onClick={handleCloseAll}
                className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Steps Visual Progress (Only if not in success step) */}
            {step !== "success" && cartItems.length > 0 && (
              <div className="px-6 py-3 bg-[#0c0c0c] border-b border-white/10 grid grid-cols-3 text-center text-xs font-bold text-gray-500">
                <span className={`${step === "cart" ? "text-blue-400" : "text-gray-400"}`}>1. Carrinho</span>
                <span className={`${step === "shipping" ? "text-blue-400" : step === "payment" ? "text-gray-400" : ""}`}>2. Envio</span>
                <span className={`${step === "payment" ? "text-blue-400" : ""}`}>3. Pagamento</span>
              </div>
            )}

            {/* Central Content Scrollable area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                          {/* CART ITEMS STEP */}
              {step === "cart" && (
                <>
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-72 text-center space-y-4">
                      <div className="p-5 bg-white/5 rounded-full border border-white/10 text-gray-600">
                        <ShoppingBag className="w-12 h-12" />
                      </div>
                      <p className="text-base font-bold text-gray-300">Seu carrinho está vazio</p>
                      <p className="text-xs text-gray-500 max-w-xs">Escolha o seu smartphone Aura 15 e personalize com seus opcionais preferidos para vê-los aqui!</p>
                      <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-white hover:bg-gray-100 text-black font-bold rounded-xl text-sm transition-all cursor-pointer"
                      >
                        Começar a Comprar
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 p-4 rounded-xl border border-white/10 bg-white/5 items-center justify-between"
                        >
                          <div className="flex items-center gap-3.5">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-contain bg-black p-1 border border-white/10"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <h4 className="text-sm font-bold text-white">{item.name}</h4>
                              <p className="text-xs text-gray-500 font-semibold">
                                {item.color.colorNamePt} • {item.storage}
                              </p>
                              <p className="text-xs font-bold text-blue-400 mt-1">
                                R$ {item.price.toLocaleString("pt-BR")}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2.5">
                            {/* Quantity Editor */}
                            <div className="flex items-center bg-black border border-white/10 rounded-lg overflow-hidden">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-3 text-xs font-bold text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Delete Button */}
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-gray-600 hover:text-red-400 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Remover
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Coupon Field */}
                      <div className="pt-6 border-t border-white/10">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Possui Cupom de Desconto?</span>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Ticket className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                              type="text"
                              placeholder="Dica: Use AURA10"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              className="w-full bg-black border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                          </div>
                          <button
                            onClick={handleApplyCoupon}
                            className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                          >
                            Aplicar
                          </button>
                        </div>
                        {couponError && <p className="text-[11px] text-red-400 font-bold mt-1.5">{couponError}</p>}
                        {couponSuccess && <p className="text-[11px] text-emerald-400 font-bold mt-1.5">{couponSuccess}</p>}
                      </div>
                    </div>
                  )}
                </>
              )}

                        {/* SHIPPING INFORMATION STEP */}
              {step === "shipping" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nome Completo</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Maria da Silva"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-sm font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">CPF</label>
                    <input
                      type="text"
                      required
                      placeholder="000.000.000-00"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-sm font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1 space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">CEP</label>
                      <input
                        type="text"
                        required
                        maxLength={8}
                        placeholder="01310100"
                        value={cep}
                        onChange={handleCepChange}
                        className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-sm font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Cidade - Estado</label>
                      <input
                        type="text"
                        required
                        placeholder="São Paulo - SP"
                        value={cityState}
                        onChange={(e) => setCityState(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-sm font-semibold text-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Endereço & Número</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Av. Paulista, 1000 - Apto 51"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-sm font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <h5 className="text-xs font-bold text-white uppercase tracking-wider">Frete Expresso Grátis Ativo</h5>
                      <p className="text-xs text-gray-500 leading-tight mt-1">Seu CEP foi mapeado para entrega prioritária de até 2 dias úteis.</p>
                    </div>
                  </div>
                </div>
              )}
                 {/* PAYMENT INFORMATION STEP */}
              {step === "payment" && (
                <div className="space-y-6">
                  {/* Payment Type Selection */}
                  <div className="grid grid-cols-2 gap-3 p-1 bg-black border border-white/10 rounded-xl">
                    <button
                      onClick={() => setPaymentMethod("pix")}
                      className={`py-3 text-center rounded-lg font-bold text-xs flex items-center justify-center gap-2 cursor-pointer ${
                        paymentMethod === "pix"
                          ? "bg-white/10 border border-white/10 text-white"
                          : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      <QrCode className="w-4 h-4" />
                      Pix (10% extra OFF)
                    </button>
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`py-3 text-center rounded-lg font-bold text-xs flex items-center justify-center gap-2 cursor-pointer ${
                        paymentMethod === "card"
                          ? "bg-white/10 border border-white/10 text-white"
                          : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      Cartão de Crédito
                    </button>
                  </div>

                  {paymentMethod === "pix" ? (
                    <div className="p-6 bg-[#0c0c0c] border border-white/10 rounded-2xl flex flex-col items-center text-center space-y-4">
                      <div className="p-4 bg-white rounded-xl">
                        {/* Generates placeholder premium QR code */}
                        <QrCode className="w-32 h-32 text-black" />
                      </div>
                      
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                          Desconto de R$ {(totalWithDiscount * 0.1).toLocaleString("pt-BR")} Ativo
                        </span>
                        <p className="text-xs text-gray-400 max-w-xs leading-normal">Escaneie o QR Code acima ou copie o código Pix abaixo para realizar o pagamento de forma imediata.</p>
                      </div>

                      <div className="w-full flex gap-2">
                        <input
                          type="text"
                          readOnly
                          value="00020126580014BR.GOV.BCB.PIX0136aura-store-payment-key..."
                          className="flex-1 bg-black border border-white/10 rounded-xl py-3 px-4 text-[11px] text-gray-500 font-mono outline-none"
                        />
                        <button
                          onClick={handleCopyPix}
                          className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 text-blue-400 hover:text-white rounded-xl transition-all cursor-pointer flex items-center justify-center"
                        >
                          {copiedPix ? <span className="text-[10px] font-extrabold text-emerald-400">Copiado</span> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Número do Cartão</label>
                        <input
                          type="text"
                          required
                          placeholder="4444 5555 6666 7777"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-sm font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nome Impresso no Cartão</label>
                        <input
                          type="text"
                          required
                          placeholder="NOME COMPLETO"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-sm font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Validade</label>
                          <input
                            type="text"
                            required
                            placeholder="MM/AA"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-sm font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">CVV</label>
                          <input
                            type="text"
                            required
                            maxLength={3}
                            placeholder="123"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-sm font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SUCCESS STATE */}
              {step === "success" && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="p-5 bg-emerald-500/10 rounded-full border border-emerald-500/30 text-emerald-400"
                  >
                    <CheckCircle2 className="w-16 h-16" />
                  </motion.div>

                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-white">Parabéns, {fullName || "Cliente"}!</h4>
                    <p className="text-sm text-emerald-400 font-bold tracking-wide uppercase">Compra Realizada com Sucesso</p>
                    <p className="text-xs text-gray-400 max-w-sm leading-relaxed mt-2">
                      O seu pedido <span className="text-white font-bold font-mono">#AURA-{Math.floor(Math.random() * 90000) + 10000}</span> foi recebido e está em preparação.
                    </p>
                  </div>

                  <div className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-left space-y-3">
                    <div className="flex justify-between text-xs font-semibold text-gray-400">
                      <span>Destinatário:</span>
                      <span className="text-white font-bold">{fullName}</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold text-gray-400">
                      <span>Endereço de Entrega:</span>
                      <span className="text-white font-bold truncate max-w-[200px]">{street}</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold text-gray-400">
                      <span>Prazo de Entrega:</span>
                      <span className="text-blue-400 font-bold">Até 2 Dias Úteis</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-500 text-center leading-normal max-w-xs">Enviamos todos os detalhes do faturamento e código de rastreamento para o seu e-mail cadastrado.</p>

                  <button
                    onClick={() => {
                      onClearCart();
                      handleCloseAll();
                    }}
                    className="w-full py-4 bg-white hover:bg-gray-100 text-black font-bold rounded-xl text-sm transition-all cursor-pointer"
                  >
                    Voltar para a Vitrine
                  </button>
                </div>
              )}

            </div>

            {/* Footer Summary & Next Step Action (Hidden on Success and Empty Cart) */}
            {step !== "success" && cartItems.length > 0 && (
              <div className="p-6 bg-[#0c0c0c] border-t border-white/10 space-y-5">
                <div className="space-y-2.5">
                  <div className="flex justify-between text-sm text-gray-400 font-semibold">
                    <span>Subtotal:</span>
                    <span className="text-white font-bold">R$ {cartSubtotal.toLocaleString("pt-BR")}</span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-sm text-emerald-400 font-semibold">
                      <span>Desconto ({appliedDiscount}%):</span>
                      <span>- R$ {discountAmount.toLocaleString("pt-BR")}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm text-gray-400 font-semibold">
                    <span>Frete:</span>
                    <span className="text-emerald-400 font-bold uppercase text-xs bg-emerald-500/10 px-2 py-0.5 rounded">Grátis</span>
                  </div>

                  <div className="border-t border-white/10 pt-3.5 flex justify-between items-baseline">
                    <span className="text-base font-bold text-white">Total Geral:</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-white">
                        R$ {(paymentMethod === "pix" && step === "payment" ? pixFinalTotal : totalWithDiscount).toLocaleString("pt-BR")}
                      </span>
                      {paymentMethod === "pix" && step === "payment" && (
                        <span className="text-[10px] text-emerald-400 font-bold block">10% OFF do Pix ativo</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navigation Action Buttons */}
                <div className="flex gap-3">
                  {step !== "cart" && (
                    <button
                      onClick={handlePrevStep}
                      className="px-4 py-4 bg-black border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
                    >
                      Voltar
                    </button>
                  )}
                  
                  <button
                    onClick={handleNextStep}
                    disabled={
                      (step === "shipping" && (!fullName || !cpf || !cep || !street)) ||
                      (step === "payment" && paymentMethod === "card" && (!cardNumber || !cardName || !cardExpiry || !cardCvv))
                    }
                    className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-40 disabled:pointer-events-none text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    {step === "cart" && (
                      <>
                        Avançar para Envio
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                    {step === "shipping" && (
                      <>
                        Avançar para Pagamento
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                    {step === "payment" && (
                      <>
                        Confirmar e Finalizar
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
