import { Smartphone, Testimonial, FAQItem } from "./types";

// Import generated images
import heroImg from "./assets/images/hero_smartphone_1782260374690.jpg";
import showcaseImg from "./assets/images/phone_showcase_1782260388334.jpg";

export const IMAGES = {
  hero: heroImg,
  showcase: showcaseImg,
};

export const SMARTPHONES: Smartphone[] = [
  {
    id: "aura-15",
    name: "Aura 15",
    tagline: "A essência da sofisticação e desempenho diário.",
    description: "Conectividade de ponta com um design incrivelmente leve. O Aura 15 traz uma tela OLED super brilhante, processamento avançado e câmeras que capturam detalhes nítidos mesmo com pouca luz.",
    basePrice: 4999,
    image: showcaseImg,
    featured: false,
    colors: [
      { id: "gray", name: "Titanium Gray", hex: "#8e8e93", bgClass: "bg-gray-400", colorNamePt: "Cinza Titânio" },
      { id: "white", name: "Ceramic White", hex: "#f2f2f7", bgClass: "bg-slate-100", colorNamePt: "Branco Cerâmica" },
      { id: "dark", name: "Midnight Dark", hex: "#1c1c1e", bgClass: "bg-stone-900", colorNamePt: "Preto Meia-Noite" }
    ],
    storages: [
      { size: "128GB", priceMultiplier: 1, priceAdjustment: 0 },
      { size: "256GB", priceMultiplier: 1, priceAdjustment: 600 },
      { size: "512GB", priceMultiplier: 1, priceAdjustment: 1400 }
    ],
    specs: {
      cpu: "Octa-Core Bionic Lite (4nm)",
      camera: "Câmera Dupla Pro de 50MP + Ultra-Wide 12MP",
      battery: "4.000 mAh com Carga Rápida de 25W",
      screen: "6.1\" Super Retina OLED FHD+ (90Hz)"
    },
    rating: 4.7,
    reviewsCount: 148,
    benchmark: {
      cpu: 82,
      gpu: 78,
      battery: 85
    }
  },
  {
    id: "aura-15-pro",
    name: "Aura 15 Pro",
    tagline: "O equilíbrio perfeito entre inteligência e potência profissional.",
    description: "Projetado para quem precisa de mais. Corpo em titânio aeroespacial de grau 5, tela LTPO dinâmica de 120Hz e um sensor de câmera de 108MP com estabilização ótica ativa de segunda geração.",
    basePrice: 6499,
    image: heroImg,
    featured: true,
    colors: [
      { id: "gray", name: "Titanium Gray", hex: "#8e8e93", bgClass: "bg-gray-400", colorNamePt: "Cinza Titânio" },
      { id: "emerald", name: "Deep Emerald", hex: "#064e3b", bgClass: "bg-emerald-850", colorNamePt: "Esmeralda Profundo" },
      { id: "royal", name: "Royal Blue", hex: "#1e3a8a", bgClass: "bg-blue-900", colorNamePt: "Azul Royal" },
      { id: "gold", name: "Champagne Gold", hex: "#b45309", bgClass: "bg-amber-700", colorNamePt: "Ouro Champagne" }
    ],
    storages: [
      { size: "128GB", priceMultiplier: 1, priceAdjustment: 0 },
      { size: "256GB", priceMultiplier: 1, priceAdjustment: 700 },
      { size: "512GB", priceMultiplier: 1, priceAdjustment: 1600 },
      { size: "1TB", priceMultiplier: 1, priceAdjustment: 3000 }
    ],
    specs: {
      cpu: "Aura Core Intelligent-Z (3nm)",
      camera: "Câmera Tripla de 108MP + Telefoto 3x + Macro 12MP",
      battery: "4.600 mAh com Carga SuperRápida de 45W",
      screen: "6.7\" ProMotion OLED LTPO (1-120Hz)"
    },
    rating: 4.9,
    reviewsCount: 324,
    benchmark: {
      cpu: 94,
      gpu: 92,
      battery: 90
    }
  },
  {
    id: "aura-15-ultra",
    name: "Aura 15 Ultra",
    tagline: "A redefinição absoluta do que um smartphone pode fazer.",
    description: "Sem concessões. A potência máxima do processador de 3nm emparelhado com o sistema de câmera quádrupla de 200MP com zoom ótico de 10x e zoom híbrido de 100x. Tela gigante de altíssimo brilho com 3000 nits.",
    basePrice: 8499,
    image: showcaseImg,
    featured: false,
    colors: [
      { id: "obsidian", name: "Obsidian Black", hex: "#0c0a09", bgClass: "bg-neutral-950", colorNamePt: "Preto Obsidiana" },
      { id: "liquid", name: "Liquid Titanium", hex: "#4b5563", bgClass: "bg-gray-600", colorNamePt: "Titânio Líquido" },
      { id: "violet", name: "Cosmic Violet", hex: "#5b21b6", bgClass: "bg-violet-800", colorNamePt: "Violeta Cósmico" }
    ],
    storages: [
      { size: "256GB", priceMultiplier: 1, priceAdjustment: 0 },
      { size: "512GB", priceMultiplier: 1, priceAdjustment: 1200 },
      { size: "1TB", priceMultiplier: 1, priceAdjustment: 2500 }
    ],
    specs: {
      cpu: "Aura Ultimate-X 3nm Ultra-Core",
      camera: "Câmera Quádrupla de 200MP + Periscópio 10x + Grande-Angula + Lidar",
      battery: "5.100 mAh com Carregamento Inteligente de 65W",
      screen: "6.9\" Dynamic AMOLED Infinity (1-144Hz, 3000 nits)"
    },
    rating: 5.0,
    reviewsCount: 189,
    benchmark: {
      cpu: 99,
      gpu: 98,
      battery: 96
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Matheus Schmidt",
    role: "Fotógrafo Profissional",
    comment: "A câmera do Aura 15 Pro é simplesmente revolucionária. O nível de detalhes capturado no sensor principal de 108MP em condições de pouca luz rivaliza com minha câmera DSLR para publicações rápidas.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: "t2",
    name: "Beatriz Oliveira",
    role: "Designer de Produto",
    comment: "Estou maravilhada com o acabamento em Titânio Líquido do Ultra. O celular é incrivelmente resistente a impressões digitais e riscos, e a tela LTPO dinâmica com 120Hz torna qualquer animação de interface super fluida.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: "t3",
    name: "Carlos Eduardo",
    role: "Desenvolvedor de Software",
    comment: "Como usuário avançado, exijo muito de processamento e bateria. O processador de 3nm do Pro roda qualquer emulador ou compilação sem aquecer. E a bateria chega ao fim de um dia de uso pesado com 35% restantes com tranquilidade.",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: "t4",
    name: "Fernanda Costa",
    role: "Criadora de Conteúdo",
    comment: "O suporte pós-venda da loja é fantástico! Tive uma dúvida sobre o carregamento por indução, e me atenderam no chat em menos de 5 minutos. Fora a entrega super rápida, comprei e chegou no dia seguinte!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq1",
    question: "Os smartphones Aura vêm com carregador na caixa?",
    answer: "Sim! Ao contrário de outras marcas, todos os smartphones da linha Aura acompanham o carregador de carregamento super rápido original (de até 65W, dependendo do modelo), cabo trançado de alta durabilidade USB-C e uma capa protetora de silicone premium."
  },
  {
    id: "faq2",
    question: "Como funciona a garantia dos aparelhos?",
    answer: "Todos os nossos smartphones possuem 2 anos (24 meses) de garantia total de fábrica contra defeitos de fabricação. Também oferecemos assistência técnica autorizada expressa com cobertura nacional e atendimento prioritário digital."
  },
  {
    id: "faq3",
    question: "Qual é o prazo de entrega e o valor do frete?",
    answer: "Oferecemos Frete Grátis Express para todo o Brasil em compras acima de R$ 1.999. Para capitais e regiões metropolitanas das regiões Sul e Sudeste, a entrega é feita em até 2 dias úteis. Para demais localidades, o prazo varia de 3 a 7 dias úteis."
  },
  {
    id: "faq4",
    question: "Quais são as formas de pagamento aceitas?",
    answer: "Aceitamos Pix com 10% de desconto imediato, boleto bancário, ou parcelamento em até 12x sem juros em todos os cartões de crédito. Se preferir, você também pode pagar usando dois cartões diferentes."
  },
  {
    id: "faq5",
    question: "Posso devolver o produto se não gostar?",
    answer: "Sim, garantimos o seu direito de arrependimento. Você tem até 7 dias corridos após o recebimento para solicitar a devolução gratuita do aparelho em sua embalagem original, e faremos o reembolso integral de forma imediata no mesmo método de pagamento."
  }
];
