/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Flame,
  Star,
  Heart,
  Baby,
  Printer,
  Download,
  Check,
  X,
  Phone,
  ArrowRight,
  Lock,
  Award,
  Sparkles,
  HelpCircle,
  Clock,
  ChevronRight,
  CheckCircle,
  FileText,
  Bookmark,
  Calendar,
  AlertTriangle,
  Send,
  UserCheck,
  Play,
  Pause,
  Volume2,
  Smartphone
} from "lucide-react";

import InteractiveTestimonials from "./components/InteractiveTestimonials";
import FAQSection from "./components/FAQSection";
import Quiz from "./components/Quiz";
import { PurchaseNotification } from "./types";

// Dynamic 3D Book Mockup Component built with pure Tailwind/CSS
const BookMockup = ({ title, bgClass, icon, badgeText }: { title: string, bgClass: string, icon: React.ReactNode, badgeText?: string }) => {
  return (
    <div className="relative w-28 xs:w-32 sm:w-36 h-36 xs:h-42 sm:h-48 mx-auto transform hover:scale-105 transition-all duration-300 shadow-2xl rounded-r-md sm:rounded-r-lg overflow-hidden flex flex-col justify-between p-2.5 sm:p-3.5 border border-white/20 select-none">
      {/* Book Spine shadow */}
      <div className="absolute top-0 left-0 w-2.5 sm:w-3.5 h-full bg-black/25 border-r border-white/10 z-10" />
      {/* Shining sheet reflex effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 pointer-events-none z-10" />
      {/* Background fill */}
      <div className={`absolute inset-0 ${bgClass}`} />
      
      {/* Text Info */}
      <div className="relative z-20 h-full flex flex-col justify-between text-white text-left pl-1 sm:pl-2">
        <div className="space-y-0.5 sm:space-y-1">
          {badgeText && (
            <span className="text-[6px] sm:text-[7px] font-bold bg-[#C9A227] text-[#0B2A4A] px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded-full uppercase tracking-wider inline-block">
              {badgeText}
            </span>
          )}
          <h5 className="font-serif font-black text-[8px] xs:text-[9.5px] sm:text-[10px] leading-snug text-white line-clamp-3 uppercase tracking-wide">
            {title}
          </h5>
        </div>
        
        <div className="flex justify-between items-end gap-1">
          <div className="p-0.5 sm:p-1 rounded bg-white/10 text-[#E6C75A] backdrop-blur-xs">
            {icon}
          </div>
          <span className="text-[5px] sm:text-[6px] font-mono opacity-80 uppercase tracking-widest text-[#E6C75A] truncate">Apostila</span>
        </div>
      </div>
      
      {/* 3D Paper pages visual stack */}
      <div className="absolute top-0 right-0 w-1 sm:w-1.5 h-full bg-gray-100 border-l border-gray-300 shadow-sm" />
    </div>
  );
};


export default function App() {
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  // States for the interactive VSL Video Player
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [videoSlideIndex, setVideoSlideIndex] = useState<number>(0);
  const [videoProgress, setVideoProgress] = useState<number>(0);

  const videoSlides = [
    {
      title: "Como prender a atenção das crianças com facilidade!",
      subTitle: "Sem desgaste e com histórias que marcam para sempre",
      bullets: [
        "Aulas vibrantes e ensinamentos bíblicos profundos",
        "Atividades lúdicas de 100% de assimilação bíblica",
        "Economia absurda do seu sagrado tempo de descanso",
        "Chegue no domingo com o coração inteiramente em paz"
      ],
      emoji: "🎨"
    },
    {
      title: "A maior coleção cristã do Brasil direto no WhatsApp",
      subTitle: "Mais de 1000 atividades separadas para toda a infância",
      bullets: [
        "Colorir com traços em alta definição",
        "Caça-palavras e labirintos divertidos",
        "Dinâmicas e versículos ilustrados",
        "Apostilas completas prontas para imprimir"
      ],
      emoji: "📚"
    },
    {
      title: "Liberação de Teste do Envio Instantâneo por WhatsApp",
      subTitle: "Nenhuma espera, atraso ou erro de correios",
      bullets: [
        "Acesso enviado totalmente via WhatsApp e E-mail",
        "Layouts modernos formatados para folha A4",
        "Guarde o material eternamente (Acesso Vitalício)",
        "Suporte direto e atualizações inclusas no plano"
      ],
      emoji: "📲"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVideoPlaying) {
      interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            setVideoSlideIndex((prevIndex) => (prevIndex + 1) % videoSlides.length);
            return 0;
          }
          return prev + 2.5; // will change slide about every 4 seconds (2.5 * 40 = 100)
        });
      }, 100);
    } else {
      setVideoProgress(0);
      setVideoSlideIndex(0);
    }
    return () => clearInterval(interval);
  }, [isVideoPlaying]);

  // Configurable rates and pricing
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "premium">("premium");
  const [addOrderBump, setAddOrderBump] = useState<boolean>(false);
  const anchoredPriceBasic = "47,90";
  const anchoredPricePremium = "149,90";
  const priceBasic = 8.90;
  const pricePremium = 17.90;
  const actualPrice = selectedPlan === "premium" ? pricePremium : priceBasic;

  // Checkout Links
  const checkoutLinkBasic = "https://pay.hotmart.com/Q106544708R?off=e6mduat9&checkoutMode=10"; // Customize this link for R$ 8,90
  const checkoutLinkPremium = "https://pay.hotmart.com/T106422616N?checkoutMode=10"; // Customize this link for R$ 17,90
  const [authorName, setAuthorName] = useState<string>("Tia Sarah Brandão");
  const [authorBio, setAuthorBio] = useState<string>(
    "Pedagoga cristã com mais de 12 anos de experiência na liderança de Escola Dominical e formação de professores para o ministério infantil. Abandonou os sábados de cansaço para desenhar um sistema estruturado e feliz, que já ajudou mais de 2.400 tias e mães a ensinarem o Evangelho puro com alegria."
  );

  // Dynamic Date calculation to prevent stale promo terms
  const [todayDate, setTodayDate] = useState("");
  useEffect(() => {
    const formatToday = () => {
      const today = new Date();
      const day = today.getDate().toString().padStart(2, '0');
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const year = today.getFullYear();
      return `${day}/${month}/${year}`;
    };
    setTodayDate(formatToday());
  }, []);

  // State for simulated purchase notifications (matches exactly step 3 & 4)
  const [purchaseNotification, setPurchaseNotification] = useState<PurchaseNotification | null>(null);

  const purchaseList: PurchaseNotification[] = [
    {
      name: "Cláudia Siqueira",
      role: "Professora de ED",
      location: "Belo Horizonte — MG",
      message: "comprou o Aula Pronta Cristã",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=60&h=60"
    },
    {
      name: "Alessandra M.",
      role: "Mãe Zelosa",
      location: "Campinas — SP",
      message: "comprou o Aula Pronta Cristã",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=60&h=60"
    },
    {
      name: "Regina Melo",
      role: "Líder de Ministério",
      location: "Salvador — BA",
      message: "comprou o Aula Pronta Cristã",
      avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=60&h=60"
    },
    {
      name: "Solange Vieira",
      role: "Professora de ED",
      location: "Curitiba — PR",
      message: "comprou o Aula Pronta Cristã",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=60&h=60"
    },
    {
      name: "Raquel Brandão",
      role: "Culto Doméstico",
      location: "Niterói — RJ",
      message: "comprou o Aula Pronta Cristã",
      avatar: "https://images.unsplash.com/photo-1489424159676-4a441c95a3de?auto=format&fit=crop&q=80&w=60&h=60"
    },
    {
      name: "Cristiane Nobre",
      role: "Coordenadora Infantil",
      location: "Fortaleza — CE",
      message: "comprou o Aula Pronta Cristã",
      avatar: "https://images.unsplash.com/photo-1484186139897-d5fc6b908812?auto=format&fit=crop&q=80&w=60&h=60"
    },
    {
      name: "Helena Castro",
      role: "Professora de ED",
      location: "Porto Alegre — RS",
      message: "comprou o Aula Pronta Cristã",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=60&h=60"
    }
  ];

  useEffect(() => {
    let index = 0;

    // Trigger first toast after 10 seconds
    const initialTimer = setTimeout(() => {
      setPurchaseNotification(purchaseList[index]);

      const hideTimeout = setTimeout(() => {
        setPurchaseNotification(null);
      }, 7000);

      // Trigger every 30 seconds thereafter
      const repeatInterval = setInterval(() => {
        index = (index + 1) % purchaseList.length;
        setPurchaseNotification(purchaseList[index]);

        setTimeout(() => {
          setPurchaseNotification(null);
        }, 7000);
      }, 30000);

      return () => {
        clearTimeout(hideTimeout);
        clearInterval(repeatInterval);
      };
    }, 10000);

    return () => {
      clearTimeout(initialTimer);
    };
  }, []);

  // Scarcity countdown (ends at 23:59:59 daily)
  const [timeLeft, setTimeLeft] = useState({ hours: "02", minutes: "45", seconds: "10" });
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const diff = endOfDay.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ hours: "00", minutes: "00", seconds: "00" });
        return;
      }
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({
        hours: h.toString().padStart(2, "0"),
        minutes: m.toString().padStart(2, "0"),
        seconds: s.toString().padStart(2, "0"),
      });
    };
    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();
    return () => clearInterval(timer);
  }, []);

  // Checkout Modal State Management
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"form" | "pix" | "success">("form");
  const [fullname, setFullname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [infoModal, setInfoModal] = useState<{ title: string; text: string } | null>(null);
  const [showFloatingBar, setShowFloatingBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowFloatingBar(true);
      } else {
        setShowFloatingBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname.trim() || !emailAddress.trim() || !phoneNumber.trim()) {
      setFormError("Por favor, preencha todos os campos obrigatórios para prosseguir.");
      return;
    }
    setFormError(null);
    setCheckoutStep("pix");
  };

  const simulatedPaymentApproval = () => {
    setCheckoutStep("success");
  };



  if (!isQuizCompleted) {
    return <Quiz onComplete={() => setIsQuizCompleted(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#2B2B2B] font-sans antialiased selection:bg-[#E6C75A]/40 selection:text-[#0B2A4A] overflow-x-hidden">
      
      {/* Inject Keyframe animation styles inside component */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: scrollMarquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .glow-btn {
          box-shadow: 0 0 15px rgba(201, 162, 39, 0.4);
        }
        .glow-btn:hover {
          box-shadow: 0 0 25px rgba(201, 162, 39, 0.7);
        }
      `}} />

      {/* 1. TOP PROMO BANNER BAR WITH DYNAMIC COUNTDOWN & PREMIUM PRICE */}
      <div id="promobar" className="bg-[#EE7E60] text-white py-2.5 px-4 text-center font-bold text-xs sm:text-sm tracking-wide shadow-md sticky top-0 z-30 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-1.5 border-b border-white/10">
        <div className="flex items-center gap-1.5 justify-center">
          <Sparkles className="w-4 h-4 animate-pulse text-[#E6C75A]" />
          <span>Promoção hoje do nosso Produto Premium no valor de: <strong className="text-[#E6C75A] font-extrabold text-sm sm:text-base underline decoration-dashed decoration-[#E6C75A]/60">R$ 17,90</strong></span>
        </div>
        <div className="flex items-center gap-2 bg-black/20 px-3.5 py-1 rounded-full border border-white/15 text-[11px] sm:text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
          <span className="text-gray-100 font-medium">Válido até:</span>
          <span className="text-[#E6C75A] font-mono font-black tracking-widest bg-black/25 px-2 py-0.5 rounded leading-none">{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</span>
        </div>
      </div>

      {/* 2. HERO / DOBRA PRINCIPAL (Centered Structure Aligning with Screenshot Section 2) */}
      <header className="relative pt-12 pb-20 md:py-24 bg-gradient-to-b from-[#0B2A4A] via-[#14416E] to-[#0A233E] text-white px-4 text-center overflow-hidden">
        
        {/* Soft Sacred background shapes */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 left-10 w-44 h-44 bg-yellow-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          
          <span className="text-[#E6C75A] text-xs sm:text-sm font-extrabold uppercase tracking-widest bg-white/5 py-1 px-4 rounded-full border border-white/10 inline-block font-mono">
            📚 Coleção Aula Pronta Cristã — Envio para o seu WhatsApp
          </span>

          {/* Headline Display Text */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-white tracking-tight leading-[1.2] max-w-4xl mx-auto">
            Você <span className="text-[#EE7E60]">não precisa ser professora</span> para ensinar a Bíblia ao seu filho.
          </h1>

          {/* Support paragraph text */}
          <p className="text-xl sm:text-3xl md:text-4xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-serif font-light">
            Você só precisa das <span className="text-[#E6C75A] font-black">atividades certas</span> — e a <span className="underline decoration-[#EE7E60] decoration-2 underline-offset-4 font-medium text-white">Coleção Aula Pronta Cristã</span> já tem todas elas.
          </p>

          {/* 4 Added Images per user request */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5 pt-8 pb-4">
            <div className="relative group overflow-hidden rounded-2xl border-2 border-[#E6C75A]/20 hover:border-[#EE7E60]/80 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#EE7E60]/10 bg-[#0B2A4A]/45">
              <img
                src="https://i.postimg.cc/g0gFHqFH/image.jpg"
                alt="Atividade Bíblica 1"
                className="w-full h-auto object-cover rounded-xl transform group-hover:scale-[1.03] transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative group overflow-hidden rounded-2xl border-2 border-[#E6C75A]/20 hover:border-[#EE7E60]/80 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#EE7E60]/10 bg-[#0B2A4A]/45">
              <img
                src="https://i.postimg.cc/HL6D94D2/image-(1).jpg"
                alt="Atividade Bíblica 2"
                className="w-full h-auto object-cover rounded-xl transform group-hover:scale-[1.03] transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative group overflow-hidden rounded-2xl border-2 border-[#E6C75A]/20 hover:border-[#EE7E60]/80 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#EE7E60]/10 bg-[#0B2A4A]/45">
              <img
                src="https://i.postimg.cc/mrmfyNfp/image-(2).png"
                alt="Atividade Bíblica 3"
                className="w-full h-auto object-cover rounded-xl transform group-hover:scale-[1.03] transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative group overflow-hidden rounded-2xl border-2 border-[#E6C75A]/20 hover:border-[#EE7E60]/80 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#EE7E60]/10 bg-[#0B2A4A]/45">
              <img
                src="https://i.postimg.cc/d05PjmPW/image-(3).jpg"
                alt="Atividade Bíblica 4"
                className="w-full h-auto object-cover rounded-xl transform group-hover:scale-[1.03] transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* 2 More Added Images below the 4 first ones */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 max-w-2xl mx-auto pb-6">
            <div className="relative group overflow-hidden rounded-2xl border-2 border-[#E6C75A]/20 hover:border-[#EE7E60]/80 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#EE7E60]/10 bg-[#0B2A4A]/45">
              <img
                src="https://i.postimg.cc/ZRmHnXM4/3333.jpg"
                alt="Atividade Bíblica 5"
                className="w-full h-auto object-cover rounded-xl transform group-hover:scale-[1.03] transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative group overflow-hidden rounded-2xl border-2 border-[#E6C75A]/20 hover:border-[#EE7E60]/80 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#EE7E60]/10 bg-[#0B2A4A]/45">
              <img
                src="https://i.postimg.cc/9M2b0sn2/44444.jpg"
                alt="Atividade Bíblica 6"
                className="w-full h-auto object-cover rounded-xl transform group-hover:scale-[1.03] transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Screenshot badges: ACESSO IMEDIATO / VITALÍCIO / ATUALIZAÇÕES */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs font-bold text-[#E6C75A] pt-2">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 bg-emerald-500 text-white rounded-full p-0.5" /> ENVIO PARA O SEU WHATSAPP
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 bg-emerald-500 text-white rounded-full p-0.5" /> CONTEÚDO VITALÍCIO
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 bg-emerald-500 text-white rounded-full p-0.5" /> CONECTOU E BAIXOU NA HORA
            </span>
          </div>

          {/* Hero Action CTA Button */}
          <div className="pt-4">
            <a
              href="#comprar"
              className="inline-flex items-center gap-3 bg-[#EE7E60] hover:bg-[#D45E44] text-white py-5 px-10 rounded-2xl font-black text-lg md:text-xl transition-all duration-200 transform hover:scale-[1.03] shadow-2xl shadow-orange-500/25 uppercase tracking-wide cursor-pointer animate-pulse-slow"
            >
              <span>QUERO ENSINAR A BÍBLIA COM PROPÓSITO!</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </a>
          </div>

          {/* Support text below button */}
          <p className="text-xs text-gray-300 pb-4">
            👉 Envio 100% digital e envio instantâneo no seu celular cadastrado após a liberação simulada de teste.
          </p>



            {/* A small indicator to let people know about material delivery in WhatsApp */}
            <div className="bg-[#E6C75A]/10 border border-[#E6C75A]/25 p-4 rounded-xl text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#E6C75A]">
              <div className="flex items-center gap-2 text-left">
                <Smartphone className="w-5 h-5 text-[#C9A227] animate-pulse shrink-0" />
                <span className="text-gray-100 font-medium leading-relaxed">
                  <strong>Entrega Instantânea:</strong> Envio para o seu WhatsApp de forma 100% automatizada assim que o pagamento simulado for finalizado.
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase font-extrabold bg-[#C9A227] text-[#0B2A4A] px-2.5 py-0.5 rounded-full inline-block shrink-0">
                Envio para o seu WhatsApp
              </span>
            </div>

            {/* Original BookMockup previews positioned immediately below the Video Player */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 sm:p-6 text-left space-y-4">
              <div className="flex items-center gap-2 text-[#E6C75A] border-b border-white/10 pb-3">
                <FileText className="w-5 h-5 shrink-0" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Amostra Física de Estruturação (Material Digital enviado via WhatsApp e E-mail)</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center py-2">
                <BookMockup title="Atividades Extras Que Ensinam" bgClass="bg-emerald-700" badgeText="Módulo Infância" icon={<Baby className="w-5 h-5" />} />
                <BookMockup title="Jogos Bíblicos Que Transformam" bgClass="bg-[#2968EB]" badgeText="Culto Animado" icon={<Star className="w-5 h-5" />} />
                <BookMockup title="Histórias Bíblicas Ilustradas" bgClass="bg-purple-700" badgeText="Para Colorir" icon={<BookOpen className="w-5 h-5" />} />
                <BookMockup title="Dinâmicas Bíblicas Criativas" bgClass="bg-amber-600" badgeText="Estudo Prático" icon={<CheckCircle className="w-5 h-5" />} />
              </div>

              <div className="bg-[#0B2A4A]/50 rounded-xl p-4 border border-white/5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-[#E6C75A] font-bold">
                  <Printer className="w-4 h-4 text-[#C9A227]" /> <span>ENVIO IMEDIATO DIRETO NO SEU WHATSAPP (PDF PARA IMPRIMIR EM FORMATO A4)</span>
                </div>
                <p className="text-xs text-gray-200 leading-relaxed font-sans">
                  Esqueça correios ou atrasos de frete. Todo o material é digital e entregue prontinho diretamente no seu <strong>WhatsApp e E-mail</strong>. Assim que a liberação de teste do PIX simulado ocorrer, nossa inteligência de envio despacha de forma imediata todas as apostilas e bônus no seu aparelho. Basta abrir as mensagens, baixar o arquivo e imprimir!
                </p>
              </div>
            </div>



        </div>
      </header>

      {/* 4. SCROLLING MARQUEE TICKER (Matches the Endless Review Line in the screenshot) */}
      <section className="bg-[#E6C75A] py-3.5 overflow-hidden border-y border-[#0B2A4A]/10 shadow-inner">
        <div className="relative flex max-w-full overflow-hidden select-none">
          <div className="flex gap-12 text-[#0B2A4A] font-bold text-xs sm:text-sm tracking-wide uppercase whitespace-nowrap animate-marquee">
            {/* Repeated twice for a flawless endless seamless effect */}
            {[...Array(2)].map((_, loopIdx) => (
              <React.Fragment key={loopIdx}>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#0B2A4A] font-extrabold text-[15px]">★★★★★</span>
                  &ldquo;Aprovada por mais de 2.400 tias e mães!&rdquo;
                </span>
                <span className="text-[#0B2A4A]/40">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#0B2A4A] font-extrabold text-[15px]">★★★★★</span>
                  &ldquo;Minhas aulas de ED mudaram totalmente!&rdquo; — Débora Santos
                </span>
                <span className="text-[#0B2A4A]/40">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#0B2A4A] font-extrabold text-[15px]">★★★★★</span>
                  &ldquo;Vale cada centavo cobrado!&rdquo; — Amanda Souza
                </span>
                <span className="text-[#0B2A4A]/40">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#0B2A4A] font-extrabold text-[15px]">★★★★★</span>
                  &ldquo;Nossos cultos domésticos estão maravilhosos!&rdquo; — Alessandra M.
                </span>
                <span className="text-[#0B2A4A]/40">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#0B2A4A] font-extrabold text-[15px]">★★★★★</span>
                  &ldquo;Não perco mais sábados desenhando!&rdquo; — Tia Sarah Castro
                </span>
                <span className="text-[#0B2A4A]/40">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PAIN SECTION / DIAGNOSTIC WITH CALCULATOR (The child on screen / pain definition panel) */}
      <section className="py-16 md:py-24 bg-[#FCFBF7] px-4 border-b border-gray-100">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-[#C9A227] text-xs font-extrabold uppercase tracking-widest block font-mono">
              O Escopo do Improviso Bíblico
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#0B2A4A]">
              Você sente que as crianças estão cada vez mais <span className="text-red-700">dispersas de costas</span> para a Bíblia?
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Toda semana é o mesmo desafio: garimpar atividade, tentar prender a atenção das crianças e chegar ao domingo com cansaço espiritual. Veja se você vive esta rotina:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Pain descriptions */}
            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  bold: "Perdendo noites de sábado:",
                  text: "Passar horas exaustas vasculhando o Google ou o Pinterest por lições que exigem preparação complexa."
                },
                {
                  bold: "Falta de engajamento lúdico:",
                  text: "Desenhar atividades que as crianças acabam achando desinteressantes ou terminam em poucos minutos."
                },
                {
                  bold: "A culpa de improvisar:",
                  text: "Chegar na igreja preocupada com a coordenação e com aquela sensação chata de que seu ensino merecia mais capricho."
                }
              ].map((dor, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-red-100 shadow-xs flex items-start gap-3.5">
                  <span className="p-2 rounded-lg bg-red-50 text-red-600 shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4 font-bold" />
                  </span>
                  <div>
                    <strong className="text-red-950 block text-sm mb-0.5">{dor.bold}</strong>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">{dor.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Dynamic Kid illustration block from the screenshot style */}
            <div className="lg:col-span-5">
              <div className="relative max-w-sm mx-auto">
                <div className="absolute inset-0 bg-red-100/40 rounded-3xl transform rotate-2 pointer-events-none" />
                <div className="bg-white p-4 rounded-3xl border border-gray-150 shadow-md relative z-10 text-center space-y-4">
                  <img
                    src="https://i.imgur.com/nC93N4Z.jpeg"
                    alt="Criança dispersa na tela"
                    referrerPolicy="no-referrer"
                    className="w-full h-48 object-cover rounded-2xl border border-gray-100"
                  />
                  <div className="text-xs italic text-gray-500 font-sans px-2">
                    &ldquo;Crianças estão imersas em telas e rotinas fáceis. O ministério infantil precisa resgatar a atenção com material estruturado.&rdquo;
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>



      {/* 7. TRANSITION BLOCK / THE SOLUTION */}
      <section className="py-16 md:py-20 bg-[#0B2A4A] text-white px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#14416E] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="text-[#C9A227] text-xs font-bold uppercase tracking-widest block">Como Transformamos Isso:</span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Descubra as mais de 1000 atividades da Coleção Aula Pronta
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
            Com as nossas apostilas, você não precisará projetar nada do zero. Nós já fizemos todo o trabalho pesado de diagramação e estudo das lições. Tudo está estruturado em arquivos de alta resolução prontos para imprimir e prender a atenção das crianças.
          </p>
          
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
            Enquanto as crianças colam, pintam e acham as palavras da Bíblia, as verdades eternas entram no coração delas de forma afetiva e duradoura.
          </p>

          <div className="pt-3">
            <a
              href="#comprar"
              className="inline-flex items-center gap-2 bg-[#C9A227] hover:bg-[#E6C75A] text-[#0B2A4A] px-8 py-3.5 rounded-xl font-bold transition duration-300 transform hover:scale-[1.01] shadow-lg glow-btn uppercase text-xs sm:text-sm tracking-wider"
            >
              <span>QUERO ENSINAR A BÍBLIA COM ALEGRIA AGORA!</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 8. ESTRUTURA DETALHADA DA COLEÇÃO DE PDFs (Simplificada, Direta e Objetiva) */}
      <section className="py-16 md:py-24 bg-[#14416E]/5 px-4" id="oferta-detalhes">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-[#C9A227] text-xs font-extrabold uppercase tracking-wider block font-mono">ESTRUTURA COMPLETA</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#0B2A4A]">Estrutura de Conteúdo dos PDFs:</h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto font-sans">
              Sem rodeios. O acervo é separado por pastas digitais e faixas etárias específicas, facilitando encontrar a atividade ideal em segundos. Veja a estrutura dos arquivos inclusos:
            </p>
          </div>

          {/* Clean, detailed grid layout of educational modules */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Módulo 1 */}
            <div className="bg-white rounded-2xl border border-gray-150 p-6 flex flex-col justify-between text-left space-y-4 shadow-sm hover:shadow-md transition">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <Baby className="w-6 h-6 stroke-[2]" />
                </div>
                
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 font-mono bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block">Módulo 01 • 3 a 5 anos</span>
                  <h3 className="font-serif font-black text-lg text-[#0B2A4A] mt-1.5">Maternal & Coordenação</h3>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                  Focado na psicomotricidade inicial de forma simples, com desenhos de traços largos e colagens lúdicas.
                </p>

                <ul className="text-xs text-gray-700 space-y-2 border-t border-gray-150 pt-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Desenhos bíblicos simples de contornos largos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Áreas de colagem para lã, sementes e algodão</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Pontilhado de letras e caminhos de histórias</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Interações táteis voltadas ao aprendizado infantil</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Módulo 2 */}
            <div className="bg-white rounded-2xl border border-gray-150 p-6 flex flex-col justify-between text-left space-y-4 shadow-sm hover:shadow-md transition">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#2968EB]/10 rounded-xl flex items-center justify-center text-[#2968EB]">
                  <Star className="w-6 h-6 stroke-[2]" />
                </div>
                
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#2968EB] font-mono bg-[#2968EB]/10 px-2.5 py-0.5 rounded-full inline-block">Módulo 02 • 6 a 8 anos</span>
                  <h3 className="font-serif font-black text-lg text-[#0B2A4A] mt-1.5">Primários & Alfabetização</h3>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                  Desenvolvimento de competências de leitura e compreensão inicial das Escrituras com desafios lógicos.
                </p>

                <ul className="text-xs text-gray-700 space-y-2 border-t border-gray-150 pt-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Caça-palavras bíblicos divertidos e ilustrados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Labirintos educativos baseados em condutas e valores</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Desenhos de coloração detalhada sobre milagres</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Cruzadinhas simples e exercícios de memorizar</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Módulo 3 */}
            <div className="bg-white rounded-2xl border border-gray-150 p-6 flex flex-col justify-between text-left space-y-4 shadow-sm hover:shadow-md transition">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-650">
                  <BookOpen className="w-6 h-6 stroke-[2]" />
                </div>
                
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-purple-750 font-mono bg-purple-50 px-2.5 py-0.5 rounded-full inline-block">Módulo 03 • 9 a 12 anos</span>
                  <h3 className="font-serif font-black text-lg text-[#0B2A4A] mt-1.5">Juniores & Estudo Prático</h3>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                  Aprofundamento teológico e debates morais com exercícios dinâmicos voltados ao raciocínio lógico avançado.
                </p>

                <ul className="text-xs text-gray-700 space-y-2 border-t border-gray-150 pt-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Quizzes bíblicos e testes de perguntas teológicas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Palavras cruzadas complexas do Velho e Novo Testamento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Roteiros expressos de teatros bíblicos para grupo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Dinâmicas criativas focadas na vida cristã em classe</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* Teacher resource highlight card */}
          <div className="bg-amber-55/70 border border-[#E6C75A]/60 rounded-2xl p-5 text-left max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-3 bg-white rounded-xl border border-[#E6C75A]/30 text-[#C9A227] shrink-0">
              <Printer className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#0B2A4A]">🔑 Gabaritos Detalhados de Resposta Inclusos</h4>
              <p className="text-xs text-gray-700 leading-relaxed font-sans">
                Chega de perder tempo tentando decifrar os enigmas. Um caderno completo de gabaritos acompanha a coleção para que o líder economize minutos valiosos de planejamento e faça correções com agilidade incomparável.
              </p>
            </div>
          </div>

          <div className="bg-emerald-600 rounded-2xl p-4 sm:p-5 text-white max-w-4xl mx-auto text-center font-bold text-xs sm:text-sm tracking-wide shadow-md">
            🌟 Todo o material foi compilado em formato A4 padrão, estruturado em arquivos limpos e organizados prontos para impressão física.
          </div>

        </div>
      </section>

      {/* 9. CURRICULUM SECTION / WHAT'S INCLUDED (Cozy Yellow Box list matching layout 8) */}
      <section className="py-16 md:py-24 bg-white px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <div className="text-center space-y-3">
            <span className="text-[#C9A227] text-xs font-extrabold uppercase tracking-widest block font-mono">CONTEÚDO COMPLETO INCLUSO</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#0B2A4A]">O que você vai receber ao acessar hoje:</h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
              Ao liberar seu acesso à Coleção Aula Pronta Cristã, todo este material digital será seu de forma vitalícia:
            </p>
          </div>

          {/* Yellow Checklist Grid Block */}
          <div className="bg-amber-50/70 border-2 border-[#E6C75A]/60 rounded-3xl p-6 sm:p-10 shadow-sm max-w-3xl mx-auto">
            <h3 className="font-serif font-extrabold text-[#0B2A4A] text-base sm:text-lg mb-6 border-b border-[#E6C75A]/20 pb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#C9A227]" />
              <span>Sua Coletânea de Atividades Passo a Passo:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                "+1000 Atividades em arquivos PDF de alta resolução.",
                "Módulo especial de desenhos bíblicos para colorir de traços limpos.",
                "Módulo focado em caça-palavras das histórias bíblicas.",
                "Módulo dedicado de labirintos, dinâmicas e roteiros didáticos.",
                "Organização rigorosa por 3 faixas etárias distintas (3-5 anos, 6-8 anos e 9-12 anos).",
                "Foco absoluto na sã doutrina teológica bíblica cristã.",
                "Gabaritos de correspondência inclusos para facilitar a correção.",
                "Acesso vitalício para usar por anos inteiros com novas turmas."
              ].map((curri, i) => (
                <div key={i} className="flex gap-2.5 items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-700 leading-snug">{curri}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#C9A227]/10 p-4 rounded-xl border border-[#C9A227]/30 text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold text-amber-950 font-sans">
              🔥 Destrave todo o potencial de desenvolvimento espiritual dos seus filhos ou ministério infantil hoje mesmo!
            </p>
          </div>

          <div className="text-center">
            <a
              href="#comprar"
              className="inline-flex items-center gap-2 bg-[#C9A227] hover:bg-[#E6C75A] text-[#0B2A4A] py-4 px-8 rounded-xl font-bold transition transform hover:scale-[1.01] shadow-lg glow-btn text-xs sm:text-sm tracking-wider uppercase"
            >
              <span>QUERO ENSINAR A BÍBLIA COM PROPÓSITO!</span>
              <ArrowRight className="w-4 h-4 font-bold" />
            </a>
          </div>

        </div>
      </section>

      {/* 10. FAQ ACCORDION SECTION (Preguntas Frequentes in screenshot 9) */}
      <section className="py-16 md:py-24 bg-[#FCFBF7] px-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto space-y-10">
          
          <div className="text-center space-y-3">
            <span className="text-[#C9A227] text-xs font-extrabold uppercase tracking-widest block font-mono">DÚVIDAS SOLUCIONADAS</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2A4A]">Perguntas frequentes e respostas rápidas:</h2>
            <p className="text-xs text-gray-500">Respondemos às principais questões de nossas clientes e professoras sobre a entrega.</p>
          </div>

          {/* Interactive FAQ component nested */}
          <FAQSection />

          <div className="text-center pt-4">
            <a
              href="#comprar"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-8 rounded-xl font-bold transition transform hover:scale-[1.01] shadow-md uppercase text-xs sm:text-sm tracking-wider"
            >
              <span>ADQUIRIR ACESSO AO GUIA</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* 11. SOCIAL PROOF DEPOIMENTOS (Testimonials layout 10 from screenshot) */}
      <section className="py-16 md:py-24 bg-white px-4 border-b border-gray-100">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[#C9A227] text-xs font-extrabold uppercase tracking-widest block font-mono">O QUE OS PAIS ESTÃO DIZENDO</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#0B2A4A]">Quem já usa garante o valor de nossas lições</h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Veja a opinião sincera de quem transformou seus domingos de aula ou momentos de culto doméstico com a nossa coleção de apostilas:
            </p>
          </div>

          {/* Interactive testimonial tabs filter container */}
          <InteractiveTestimonials />

        </div>
      </section>

      {/* 12. 7-DAY REFUND GUARANTEE (Security pledge layout 11 from screenshot) */}
      <section className="py-16 bg-[#14416E]/5 px-4 border-b border-gray-150">
        <div className="max-w-4xl mx-auto bg-white border-2 border-[#E6C75A]/60 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
          
          {/* Stamps vector indicator */}
          <div className="flex justify-center shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#C9A227]/40 flex items-center justify-center bg-amber-50 relative animate-pulse">
              <Award className="w-12 h-12 text-[#C9A227]" />
              <div className="absolute -bottom-1.5 bg-[#C9A227] text-[#0B2A4A] text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                7 Dias
              </div>
            </div>
          </div>

          {/* Guarantee terms */}
          <div className="space-y-2.5 flex-1 select-none">
            <span className="text-[#C9A227] text-[10px] uppercase font-bold tracking-widest block font-mono">QUALIDADE 100% ASSEGURADA</span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0B2A4A]">Sua satisfação inteiramente garantida!</h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans font-medium">
              Sua satisfação com o material é garantida. Se em até 7 dias após o recebimento você sentir que toda esta coletânea não serve para as suas crianças, nos envie um e-mail fictício. Devolveremos todo o seu investimento de imediato, sem burocracias ou perguntas teimosas. O risco de testar é 100% nosso.
            </p>
          </div>

        </div>
      </section>

      {/* 13. BONUSES PRESENTER LAYOUT (Apresentando Bonuses em cartões altos no screenshot 12) */}
      <section className="py-16 bg-[#FCFBF7] px-4 border-b border-gray-100">
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* Header Orange/Gold Bar banner copy exactly from screenshot */}
          <div className="bg-[#C9A227] text-[#0B2A4A] py-3.5 px-6 text-center font-black rounded-xl sm:rounded-2xl tracking-wide max-w-4xl mx-auto shadow-md flex flex-col justify-center items-center gap-1">
            <span className="text-[10px] bg-white/20 text-[#0B2A4A] tracking-widest uppercase font-mono px-3 py-0.5 rounded-full font-black animate-pulse-slow">PRESENTE DA MINHA COLEÇÃO AULA PRONTA CRISTÃ</span>
            <span className="text-sm sm:text-base font-serif">🎁 ADQUIRINDO A COLEÇÃO AULA PRONTA CRISTÃ HOJE, VOCÊ LEVA DE GRAÇA 5 BÔNUS DE SUPORTE:</span>
          </div>

          <p className="text-center text-xs sm:text-sm text-gray-500 max-w-lg mx-auto pt-2 leading-relaxed">
            Cada presente digital foi desenhado detalhadamente para resolver situações na Escola Dominical. <strong>Atenção: Os 5 bônus abaixo são de envio exclusivo para a sua Coleção Aula Pronta Cristã.</strong>
          </p>

          {/* Five Tall colorful boxes matching screenshot colors */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-5 max-w-5xl mx-auto pt-4">
            
            {/* Bonus 1: Green */}
            <div className="bg-emerald-600 text-white rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between text-left space-y-3 sm:space-y-4 hover:translate-y-[-4px] transition-transform duration-200">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center gap-1 flex-wrap">
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase bg-white/10 px-2 py-0.5 rounded inline-block font-extrabold tracking-widest text-[#E6C75A]">Bônus 01</span>
                  <span className="text-[7px] sm:text-[8px] font-black uppercase bg-amber-400 text-emerald-950 px-1.5 py-0.5 rounded tracking-wider shadow-sm font-mono whitespace-nowrap">Premium Only</span>
                </div>
                
                <div className="relative group text-center py-1 sm:py-2 select-none">
                  <img
                    src="https://i.imgur.com/JYR10R8.png"
                    alt="Bônus 1 - Os 5 Primeiros Minutos"
                    className="w-20 xs:w-28 sm:w-32 h-26 xs:h-36 sm:h-40 mx-auto object-contain rounded-lg drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] group-hover:scale-105 transition-transform duration-200"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div>
                  <h4 className="text-[11px] xs:text-xs sm:text-sm font-bold font-serif leading-snug">Os 5 Primeiros Minutos</h4>
                  <p className="text-[9.5px] xs:text-[11px] text-gray-100 leading-normal mt-1 sm:mt-1.5 font-sans opacity-95">15 quebra-gelos rápidos e envolvendo para prender o interesse das crianças logo na chegada.</p>
                </div>
              </div>
              <span className="text-[8px] xs:text-[10px] font-bold text-[#E6C75A] border-t border-white/10 pt-2 block uppercase tracking-wider font-mono">Presente Premium</span>
            </div>

            {/* Bonus 2: Orange */}
            <div className="bg-[#F3A25D] text-white rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between text-left space-y-3 sm:space-y-4 hover:translate-y-[-4px] transition-transform duration-200">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center gap-1 flex-wrap">
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase bg-white/10 px-2 py-0.5 rounded inline-block font-extrabold tracking-widest bg-orange-700/15 text-orange-950">Bônus 02</span>
                  <span className="text-[7px] sm:text-[8px] font-black uppercase bg-[#0B2A4A] text-[#E6C75A] px-1.5 py-0.5 rounded tracking-wider shadow-sm font-mono whitespace-nowrap">Premium Only</span>
                </div>
                
                <div className="relative group text-center py-1 sm:py-2 select-none">
                  <img
                    src="https://i.imgur.com/vVfPJPJ.png"
                    alt="Bônus 2 - Calendário de Aulas"
                    className="w-20 xs:w-28 sm:w-32 h-26 xs:h-36 sm:h-40 mx-auto object-contain rounded-lg drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] group-hover:scale-105 transition-transform duration-200"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div>
                  <h4 className="text-[11px] xs:text-xs sm:text-sm font-bold font-serif leading-snug">Calendário de Aulas</h4>
                  <p className="text-[9.5px] xs:text-[11px] text-gray-100 leading-normal mt-1 sm:mt-1.5 font-sans opacity-95">52 temas bíblicos catalogados e distribuídos estrategicamente de janeiro a dezembro.</p>
                </div>
              </div>
              <span className="text-[8px] xs:text-[10px] font-bold text-orange-950 border-t border-white/10 pt-2 block uppercase tracking-wider font-mono">Presente Premium</span>
            </div>

            {/* Bonus 3: Purple */}
            <div className="bg-[#8C3BF3] text-white rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between text-left space-y-3 sm:space-y-4 hover:translate-y-[-4px] transition-transform duration-200">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center gap-1 flex-wrap">
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase bg-white/10 px-2 py-0.5 rounded inline-block font-extrabold tracking-widest text-[#E6C75A]">Bônus 03</span>
                  <span className="text-[7px] sm:text-[8px] font-black uppercase bg-amber-400 text-purple-950 px-1.5 py-0.5 rounded tracking-wider shadow-sm font-mono whitespace-nowrap">Premium Only</span>
                </div>
                
                <div className="relative group text-center py-1 sm:py-2 select-none">
                  <img
                    src="https://i.imgur.com/0pZwkKE.png"
                    alt="Bônus 3 - Bíblia para Pequeninos"
                    className="w-20 xs:w-28 sm:w-32 h-26 xs:h-36 sm:h-40 mx-auto object-contain rounded-lg drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] group-hover:scale-105 transition-transform duration-200"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div>
                  <h4 className="text-[11px] xs:text-xs sm:text-sm font-bold font-serif leading-snug">Bíblia para Pequeninos</h4>
                  <p className="text-[9.5px] xs:text-[11px] text-gray-100 leading-normal mt-1 sm:mt-1.5 font-sans opacity-95">30 atividades motoras lúdicas para pequeninos de 2 a 5 anos que ainda não são leitores.</p>
                </div>
              </div>
              <span className="text-[8px] xs:text-[10px] font-bold text-[#E6C75A] border-t border-white/10 pt-2 block uppercase tracking-wider font-mono">Presente Premium</span>
            </div>

            {/* Bonus 4: Blue */}
            <div className="bg-[#2968EB] text-white rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between text-left space-y-3 sm:space-y-4 hover:translate-y-[-4px] transition-transform duration-200">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center gap-1 flex-wrap">
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase bg-white/10 px-2 py-0.5 rounded inline-block font-extrabold tracking-widest text-[#E6C75A]">Bônus 04</span>
                  <span className="text-[7px] sm:text-[8px] font-black uppercase bg-amber-400 text-blue-950 px-1.5 py-0.5 rounded tracking-wider shadow-sm font-mono whitespace-nowrap">Premium Only</span>
                </div>
                
                <div className="relative group text-center py-1 sm:py-2 select-none">
                  <img
                    src="https://i.imgur.com/NTCRLM2.png"
                    alt="Bônus 4 - Mural de Versículos"
                    className="w-20 xs:w-28 sm:w-32 h-26 xs:h-36 sm:h-40 mx-auto object-contain rounded-lg drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] group-hover:scale-105 transition-transform duration-200"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div>
                  <h4 className="text-[11px] xs:text-xs sm:text-sm font-bold font-serif leading-snug">Mural de Versículos</h4>
                  <p className="text-[9.5px] xs:text-[11px] text-gray-100 leading-normal mt-1 sm:mt-1.5 font-sans opacity-95">20 versículos ricamente ilustrados em tamanho A4 para pintar e memorizar brincando.</p>
                </div>
              </div>
              <span className="text-[8px] xs:text-[10px] font-bold text-[#E6C75A] border-t border-white/10 pt-2 block uppercase tracking-wider font-mono">Presente Premium</span>
            </div>

            {/* Bonus 5: Pink (Spanned on mobile grid-cols-2) */}
            <div className="col-span-2 md:col-span-1 bg-[#E3277C] text-white rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between text-left space-y-3 sm:space-y-4 hover:translate-y-[-4px] transition-transform duration-200">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center gap-1 flex-wrap">
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase bg-white/10 px-2 py-0.5 rounded inline-block font-extrabold tracking-widest text-[#E6C75A]">Bônus 05</span>
                  <span className="text-[7px] sm:text-[8px] font-black uppercase bg-amber-400 text-pink-950 px-1.5 py-0.5 rounded tracking-wider shadow-sm font-mono whitespace-nowrap">Premium Only</span>
                </div>
                
                <div className="relative group text-center py-1 sm:py-2 select-none">
                  <img
                    src="https://i.imgur.com/GoMwO7S.png"
                    alt="Bônus 5 - Aula de Emergência"
                    className="w-20 xs:w-28 sm:w-32 h-26 xs:h-36 sm:h-40 mx-auto object-contain rounded-lg drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] group-hover:scale-105 transition-transform duration-200"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div>
                  <h4 className="text-[11px] xs:text-xs sm:text-sm font-bold font-serif leading-snug font-bold">Aula Salva de Emergência</h4>
                  <p className="text-[9.5px] xs:text-[11px] text-gray-100 leading-normal mt-1 sm:mt-1.5 font-sans opacity-95">10 roteiros expressos e dinâmicas rápidas para salvar a aula quando faltou tempo de preparo.</p>
                </div>
              </div>
              <span className="text-[8px] xs:text-[10px] font-bold text-[#E6C75A] border-t border-white/10 pt-2 block uppercase tracking-wider font-mono">Presente Premium</span>
            </div>

          </div>

        </div>
      </section>

      {/* 14. PRICING AND CHECKOUT AREA (Offer Detail / Final CTA in screenshot 13) */}
      <section className="py-20 bg-[#0B2A4A] text-white px-4 relative overflow-hidden" id="comprar">
        
        {/* Shiny border visual divider */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent z-10" />
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-sky-200/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          
          <div className="space-y-3">
            <span className="text-[#C9A227] text-xs font-extrabold uppercase tracking-widest block font-mono">VALOR INCRÍVEL DE LANÇAMENTO</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white leading-tight">
              Tudo isso, com acesso imediato e vitalício!
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto font-sans leading-relaxed">
              Diagramar tudo isso sozinha levaria semanas de esforço exaustivo. Escolha o melhor plano para a sua realidade e comece a aplicar hoje mesmo:
            </p>
          </div>

          {/* Special offer complete bundle representation */}
          <div className="py-6 flex justify-center items-center h-56 max-w-xl mx-auto select-none relative overflow-visible">
            {/* Stack of overlapping BookMockups representing the entire bundle */}
            <div className="relative flex items-center justify-center -space-x-12 sm:-space-x-14 translate-y-2 scale-90 sm:scale-100">
              <div className="transform -rotate-12 translate-y-4 hover:translate-y-0 hover:rotate-0 transition-all duration-300 origin-bottom">
                <img
                  src="https://i.imgur.com/JYR10R8.png"
                  alt="Bônus 1 - Os 5 Primeiros Minutos"
                  className="w-24 sm:w-28 h-32 sm:h-36 object-contain rounded-lg drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="transform -rotate-6 translate-y-2 hover:translate-y-[-8px] hover:rotate-0 transition-all duration-300 z-10 origin-bottom">
                <img
                  src="https://i.imgur.com/vVfPJPJ.png"
                  alt="Bônus 2 - Calendário de Aulas"
                  className="w-24 sm:w-28 h-32 sm:h-36 object-contain rounded-lg drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="transform scale-110 -translate-y-2 hover:-translate-y-6 hover:scale-115 transition-all duration-300 z-20 origin-bottom">
                <img
                  src="https://i.imgur.com/CRvhDuM.png"
                  alt="Coleção Aula Pronta Cristã"
                  className="w-28 sm:w-32 h-36 sm:h-40 object-contain rounded-lg drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="transform rotate-6 translate-y-2 hover:translate-y-[-8px] hover:rotate-0 transition-all duration-300 z-10 origin-bottom">
                <img
                  src="https://i.imgur.com/0pZwkKE.png"
                  alt="Bônus 3 - Bíblia para Pequeninos"
                  className="w-24 sm:w-28 h-32 sm:h-36 object-contain rounded-lg drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="transform rotate-12 translate-y-4 hover:translate-y-0 hover:rotate-0 transition-all duration-300 origin-bottom">
                <img
                  src="https://i.imgur.com/GoMwO7S.png"
                  alt="Bônus 5 - Aula de Emergência"
                  className="w-24 sm:w-28 h-32 sm:h-36 object-contain rounded-lg drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Scarcity countdown details */}
          <div className="bg-[#C9A227]/10 p-3 rounded-2xl border border-[#C9A227]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#E6C75A] max-w-xl mx-auto">
            <span className="flex items-center gap-1.5 font-bold">
              <Clock className="w-4 h-4 text-[#C9A227] animate-spin shrink-0" style={{ animationDuration: "4s" }} /> Esta promoção especial de lançamento expira em:
            </span>
            <span className="font-mono font-bold tracking-wider bg-[#0B2A4A] text-white px-3 py-1 rounded-lg border border-white/10 shrink-0">
              {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
            </span>
          </div>

          {/* Pricing Outline side-by-side cards with two competitive choices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pt-6 text-left">

            {/* CARD 1: VERSÃO COMPLETA + BÔNUS (R$ 17,90) */}
            <div className={`bg-white text-[#2B2B2B] rounded-3xl p-6 sm:p-8 border-4 ${selectedPlan === "premium" ? "border-[#EE7E60] shadow-2xl scale-[1.02]" : "border-gray-200/80 shadow-md"} flex flex-col justify-between relative transform hover:scale-[1.01] transition duration-200`}>
              
              {/* Highlight badge overlay */}
              <div className="absolute -top-4.5 left-1/2 transform -translate-x-1/2 bg-[#EE7E60] text-white text-[9px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md flex items-center gap-1 shrink-0 whitespace-nowrap z-20">
                <span>★ RECOMENDADO — PLANO COMPLETO ★</span>
              </div>

              <div className="space-y-6">
                
                {/* Title & Sub */}
                <div className="text-center pb-4 border-b border-gray-100 space-y-1 pt-2">
                  <h3 className="text-xl font-black font-sans text-[#EE7E60] uppercase tracking-wide">Coleção + 5 Bônus</h3>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-mono">ENVIO COMPLETO PARA WHATSAPP</span>
                </div>

                {/* Pricing inside card */}
                <div className="text-center py-2 space-y-1 select-none">
                  <span className="text-xl sm:text-2xl font-bold text-gray-400 line-through block">R$ {anchoredPricePremium}</span>
                  <div className="flex items-baseline justify-center gap-0.5">
                    <span className="text-lg font-bold text-gray-400">R$</span>
                    <span className="text-5xl font-black font-serif text-[#EE7E60] tracking-tight">17</span>
                    <span className="text-xl font-bold text-[#EE7E60]">,90</span>
                  </div>
                  <span className="text-[10px] font-extrabold text-[#EE7E60] uppercase tracking-wider block">PAGAMENTO ÚNICO</span>
                </div>

                {/* Features list */}
                <div className="space-y-3.5 text-xs text-gray-600 font-sans">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#EE7E60] shrink-0 mt-0.5" />
                    <span className="font-semibold text-gray-700">+1000 Atividades completas para imprimir</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#EE7E60] shrink-0 mt-0.5" />
                    <span>Histórias do Antigo e Novo Testamento</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#EE7E60] shrink-0 mt-0.5" />
                    <span className="font-semibold text-emerald-600">Envio para o seu WhatsApp e E-mail</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#EE7E60] shrink-0 mt-0.5" />
                    <span>Guia de Brincadeiras Criativas</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#EE7E60] shrink-0 mt-0.5" />
                    <span>Garantia irrestrita de 7 dias</span>
                  </div>
                  
                  {/* Divider for bonuses */}
                  <div className="border-t border-dashed border-gray-200 my-2 pt-2 text-[10px] uppercase font-bold text-[#EE7E60]/95 tracking-wider">
                    INCLUI TODOS OS 5 BÔNUS EXCLUSIVOS:
                  </div>

                  <div className="flex items-start gap-2.5 text-left">
                    <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span className="text-purple-950 font-medium font-semibold">BÔNUS 1 — 15 Quebra-Gelos Rápidos de WhatsApp</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-left">
                    <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span className="text-purple-950 font-medium">BÔNUS 2 — Calendário Cristão de Aulas: 52 Temas</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-left">
                    <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span className="text-purple-950 font-medium">BÔNUS 3 — Bíblia para os Pequenos: 30 Atividades</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-left">
                    <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span className="text-purple-950 font-medium font-semibold">BÔNUS 4 — Mural da Memória: 20 Versículos Ilustrados</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-left">
                    <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span className="text-purple-950 font-medium">BÔNUS 5 — 10 Roteiros de Emergência Rápidos</span>
                  </div>
                </div>

              </div>

              {/* Button action */}
              <div className="pt-8 space-y-2">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setSelectedPlan("premium");
                    window.open(checkoutLinkPremium, "_blank");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedPlan("premium");
                      window.open(checkoutLinkPremium, "_blank");
                    }
                  }}
                  className="bg-[#EE7E60] hover:bg-[#D45E44] text-white py-4 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg glow-btn animate-pulse-slow select-none"
                >
                  <span>Garantir Tudo por R$ 17,90</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                
                <div className="text-center pt-1 flex items-center justify-center gap-1 text-[10px] text-gray-500 font-medium">
                  <span>👥 +1.253 pessoas escolheram e receberam no WhatsApp</span>
                </div>
              </div>

            </div>

            {/* CARD 2: VERSÃO BÁSICA (R$ 8,90) */}
            <div className={`bg-white text-[#2B2B2B] rounded-3xl p-6 sm:p-8 border-4 ${selectedPlan === "basic" ? "border-[#0B2A4A] shadow-2xl scale-[1.02]" : "border-gray-200/80 shadow-md"} flex flex-col justify-between relative transform hover:scale-[1.01] transition duration-200`}>
              
              <div className="space-y-6">
                
                {/* Title & Sub */}
                <div className="text-center pb-4 border-b border-gray-100 space-y-1">
                  <h3 className="text-xl font-black font-sans text-[#0B2A4A] uppercase tracking-wide">Coleção Básica</h3>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-mono">SEM OS BÔNUS EXCLUSIVOS</span>
                </div>

                {/* Pricing inside card */}
                <div className="text-center py-2 space-y-1 select-none">
                  <span className="text-xl sm:text-2xl font-bold text-gray-400 line-through block">R$ {anchoredPriceBasic}</span>
                  <div className="flex items-baseline justify-center gap-0.5">
                    <span className="text-lg font-bold text-gray-400">R$</span>
                    <span className="text-5xl font-black font-serif text-[#0B2A4A] tracking-tight">8</span>
                    <span className="text-xl font-bold text-[#0B2A4A]">,90</span>
                  </div>
                  <span className="text-[10px] font-extrabold text-[#0B2A4A] uppercase tracking-wider block">PAGAMENTO ÚNICO</span>
                </div>

                {/* Features list */}
                <div className="space-y-3.5 text-xs text-gray-600 font-sans">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-semibold text-gray-700">+1000 Atividades completas para imprimir</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Histórias do Antigo e Novo Testamento</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-semibold text-emerald-600">Envio para o seu WhatsApp e E-mail</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Guia de Brincadeiras Criativas</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Garantia irrestrita de 7 dias</span>
                  </div>
                  
                  {/* Divider for bonuses - NOT INCLUDED */}
                  <div className="border-t border-dashed border-gray-200 my-2 pt-2 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                    BÔNUS NÃO INCLUSOS NESTA VERSÃO:
                  </div>

                  <div className="flex items-start gap-2.5 text-left opacity-45">
                    <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-gray-500 line-through">BÔNUS 1 — 15 Quebra-Gelos Rápidos de WhatsApp</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-left opacity-45">
                    <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-gray-500 line-through">BÔNUS 2 — Calendário Cristão de Aulas: 52 Temas</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-left opacity-45">
                    <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-gray-500 line-through">BÔNUS 3 — Bíblia para os Pequenos: 30 Atividades</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-left opacity-45">
                    <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-gray-500 line-through">BÔNUS 4 — Mural da Memória: 20 Versículos Ilustrados</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-left opacity-45">
                    <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-gray-500 line-through">BÔNUS 5 — 10 Roteiros de Emergência Rápidos</span>
                  </div>
                </div>

              </div>

              {/* Button action */}
              <div className="pt-8 space-y-2">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setSelectedPlan("basic");
                    setShowDiscountModal(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedPlan("basic");
                      setShowDiscountModal(true);
                    }
                  }}
                  className="w-full bg-[#0B2A4A] hover:bg-[#14416E] text-white py-4 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg select-none"
                >
                  <span>Comprar Versão Básica (R$ 8,90)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                
                <div className="text-center pt-1 flex items-center justify-center gap-1 text-[10px] text-gray-500 font-medium">
                  <span>🔒 Pagamento avulso seguro e sem assinatura</span>
                </div>
              </div>

            </div>

          </div>

          {/* Secure purchase assurances */}
          <div className="flex justify-center items-center gap-4 text-[10px] text-gray-400 pt-6 font-mono">
            <span>✓ Pagamento 100% Seguro</span>
            <span>•</span>
            <span>✓ Liberação no WhatsApp</span>
            <span>•</span>
            <span>✓ PDFs em Alta Resolução</span>
          </div>

        </div>
      </section>

      {/* 15. PIX / GATEWAY INTERACTIVE SIMULATOR (Sandbox checkout experience) */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full max-h-[92vh] overflow-y-auto shadow-2xl text-[#2B2B2B] border border-gray-100 flex flex-col justify-between"
            >
              
              {/* Header */}
              <div className="bg-[#0B2A4A] text-white px-6 py-4 flex justify-between items-center">
                <div>
                  <h4 className="font-serif font-bold text-base">Checkin Seguro da Coleção</h4>
                  <span className="text-[10px] text-[#E6C75A] tracking-wider uppercase block">Simulação de recebimento</span>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setIsCheckoutOpen(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setIsCheckoutOpen(false);
                    }
                  }}
                  className="p-1 rounded-full bg-white/10 hover:bg-white/25 text-white transition focus:outline-none cursor-pointer select-none"
                >
                  <X className="w-5 h-5" />
                </div>
              </div>

              {/* Main Content Areas */}
              <div className="p-6">
                
                {checkoutStep === "form" && (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <p className="text-xs text-gray-600 leading-relaxed mb-1 bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 text-left">
                      <strong>✨ Plano Selecionado: Coleção Aula Pronta Cristã (Com os 5 Bônus inclusos!)</strong>. Todo o material e os 5 bônus de suporte exclusivos serão enviados de forma imediata e automatizada diretamente no seu <strong>WhatsApp</strong> de entrega e no e-mail cadastrado!
                    </p>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Nome Completo:</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Maria Alice Castro"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-gray-300 text-xs focus:ring-1 focus:ring-[#EE7E60] focus:border-[#EE7E60] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Seu E-mail principal:</label>
                      <input
                        type="email"
                        required
                        placeholder="Ex: mariacastro@gmail.com"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-gray-300 text-xs focus:ring-1 focus:ring-[#EE7E60] focus:border-[#EE7E60] outline-none"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">Seu WhatsApp de Entrega:</label>
                        <span className="text-[9px] text-[#EE7E60] font-bold">● ENVIO IMEDIATO</span>
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="Ex: (11) 99888-7766 (Número ativo)"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-gray-300 text-xs focus:ring-1 focus:ring-[#EE7E60] focus:border-[#EE7E60] outline-none"
                      />
                      <span className="text-[9.5px] text-gray-400 block pt-1 leading-tight text-left">Insira um número que possua WhatsApp para que o robô de envios despache os PDFs.</span>
                    </div>

                    {/* Highly-Optimized Interactive Order Bump Trio Option */}
                    <div className="bg-[#FCFBF7] border-2 border-dashed border-[#EE7E60] p-4 rounded-xl flex flex-col gap-3.5 select-none relative overflow-hidden text-left bg-gradient-to-r from-orange-50/20 to-amber-55/20 shadow-xs">
                      <div className="absolute top-0 right-0 bg-[#EE7E60] text-white text-[8px] font-black tracking-widest px-3 py-0.5 rounded-bl-lg uppercase">
                        RECOMENDADO
                      </div>

                      <div className="flex gap-2.5 items-start">
                        <input
                          type="checkbox"
                          id="order-bump-checkbox"
                          checked={addOrderBump}
                          onChange={(e) => setAddOrderBump(e.target.checked)}
                          className="w-4.5 h-4.5 shrink-0 mt-0.5 cursor-pointer text-[#EE7E60] focus:ring-[#EE7E60] border-gray-400 rounded transition-colors"
                        />
                        <label htmlFor="order-bump-checkbox" className="cursor-pointer space-y-1">
                          <span className="text-[11px] font-black text-amber-950 uppercase tracking-wide flex items-center gap-1 leading-none">
                            ✨ COMPLEMENTE COM O TRIO DE SUCESSO COBIÇADO! (+R$ 9,90)
                          </span>
                          <span className="text-[9.5px] text-[#EE7E60] font-black uppercase tracking-wider block">
                            Leve mais 3 apostilas por um precinho de custo!
                          </span>
                          <span className="text-[10px] text-gray-600 block leading-relaxed">
                            Adicione o <strong>Trio Complementar</strong> no seu envio: Atividades Extras + Jogos Bíblicos + Histórias Bíblicas Ilustradas direto no seu WhatsApp!
                          </span>
                        </label>
                      </div>

                      <div className="w-full flex justify-center pt-4 pb-2 border-t border-dashed border-gray-200">
                        <div className="flex -space-x-4 items-center justify-center">
                          {/* Card 1 */}
                          <div className="w-16 h-22 rounded-md bg-emerald-600 text-white font-serif font-black text-[7px] p-1.5 shadow-md flex flex-col justify-between border border-white/20 transform -rotate-6 hover:rotate-0 transition-transform">
                            <span className="text-[5px] uppercase font-mono tracking-widest text-[#E6C75A]">Trio 1</span>
                            <span className="leading-tight block uppercase text-left">Atividades Extras</span>
                            <span className="text-[4px] text-[#E6C75A] text-left">COBIÇADO</span>
                          </div>
                          {/* Card 2 */}
                          <div className="w-18 h-24 rounded-md bg-blue-600 text-white font-serif font-black text-[8px] p-2 shadow-lg flex flex-col justify-between border border-white/20 z-10 transform scale-110 hover:-translate-y-1 transition-transform">
                            <span className="text-[5px] uppercase font-mono tracking-widest text-amber-300">Trio 2</span>
                            <span className="leading-tight block uppercase text-left">Jogos Bíblicos</span>
                            <span className="text-[4px] text-amber-300 text-left">EXCLUSIVO</span>
                          </div>
                          {/* Card 3 */}
                          <div className="w-16 h-22 rounded-md bg-purple-600 text-white font-serif font-black text-[7px] p-1.5 shadow-md flex flex-col justify-between border border-white/20 transform rotate-6 hover:rotate-0 transition-transform">
                            <span className="text-[5px] uppercase font-mono tracking-widest text-pink-300">Trio 3</span>
                            <span className="leading-tight block uppercase text-right">Histórias Bíblicas</span>
                            <span className="text-[4px] text-pink-300 text-right">ILUSTRADAS</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {formError && (
                      <div className="p-2.5 bg-red-50 border border-red-200 text-red-800 text-[11px] rounded-lg font-medium text-center">
                        ⚠️ {formError}
                      </div>
                    )}

                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCheckoutSubmit(e);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleCheckoutSubmit(e as any);
                        }
                      }}
                      style={{ backgroundColor: selectedPlan === "premium" ? "#EE7E60" : "#0B2A4A" }}
                      className="w-full text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition hover:opacity-95 shadow-md cursor-pointer select-none text-center justify-center"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Gerar Pix & Receber no WhatsApp</span>
                    </div>
                    
                    <span className="text-[10px] text-gray-400 block text-center">
                      🔐 Seus dados estão simulados do lado do navegador e não serão vendidos.
                    </span>
                  </form>
                )}

                {checkoutStep === "pix" && (
                  <div className="text-center space-y-4 py-2">
                    <p className="text-xs text-gray-700 font-medium">
                      Simulamos do código a geração de Chave PIX Estática. Clique no botão abaixo para aprovar o pagamento simulado de <strong className="text-[#0B2A4A]">R$ {(actualPrice + (addOrderBump ? 9.90 : 0)).toFixed(2).replace('.', ',')}</strong> e receber seu material de teste imediatamente no celular!
                    </p>

                    <div className="bg-[#E6C75A]/10 border-2 border-[#C9A227] p-4 rounded-xl inline-block">
                      <div className="w-32 h-32 bg-gray-100 mx-auto flex items-center justify-center border border-gray-300 font-mono text-[10px] font-bold">
                        [PIX QRCODE SIMULADO]
                      </div>
                      <span className="text-[10px] text-gray-500 block mt-2">Chave: colecao-aula-pronta-crista@pix.com</span>
                    </div>

                    <div className="space-y-2">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={simulatedPaymentApproval}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            simulatedPaymentApproval();
                          }
                        }}
                        style={{ backgroundColor: selectedPlan === "premium" ? "#EE7E60" : "#0B2A4A" }}
                        className="w-full text-white font-bold py-2.5 rounded-lg text-xs hover:opacity-95 transition cursor-pointer select-none text-center justify-center"
                      >
                        Aprovar Pagamento Simulado (Testar Recebimento por WhatsApp!)
                      </div>
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => setCheckoutStep("form")}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setCheckoutStep("form");
                          }
                        }}
                        className="text-[10px] text-[#14416E] underline hover:text-[#C9A227] block mx-auto font-mono cursor-pointer select-none text-center"
                      >
                        Voltar para Editar Dados
                      </div>
                    </div>
                  </div>
                )}

                {checkoutStep === "success" && (
                  <div className="text-center space-y-4 py-4 text-emerald-950">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#0B2A4A]">Parabéns, {fullname}!</h3>
                    <p className="text-xs leading-relaxed text-gray-700">
                      O pagamento simulado foi reconhecido com sucesso! <strong className="text-emerald-700">Enviamos agora mesmo</strong> toda a Coleção em arquivos PDF e seus bônus exclusivos diretamente no seu celular <strong className="text-[#0b2a4a]">{phoneNumber}</strong> via <strong>WhatsApp</strong>! Uma cópia em alta resolução também foi enviada ao e-mail <strong className="text-[#0b2a4a]">{emailAddress}</strong>.
                    </p>

                    <div className="bg-amber-50 p-3.5 rounded-lg text-left border border-amber-200">
                      <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block mb-1">📝 Material Completo Enviado (Simulado):</span>
                      <ul className="text-[10.5px] text-gray-700 space-y-1">
                        <li>• <strong>Enviado no WhatsApp:</strong> PDF +1000 Atividades Completo (Acesso Imediato)</li>
                        {selectedPlan === "premium" && (
                          <>
                            <li>• <strong>Enviado no WhatsApp:</strong> Bônus 1 — 15 Quebra-Gelos Bíblicos Rápidos</li>
                            <li>• <strong>Enviado no WhatsApp:</strong> Bônus 2 — Calendário Cristão de Aulas (52 Temas)</li>
                            <li>• <strong>Enviado no WhatsApp:</strong> Bônus 3 — 30 Atividades para Não Leitores</li>
                            <li>• <strong>Enviado no WhatsApp:</strong> Bônus 4 — Mural da Memória (20 Versículos)</li>
                            <li>• <strong>Enviado no WhatsApp:</strong> Bônus 5 — 10 Roteiros Prontos de Emergência</li>
                          </>
                        )}
                        {addOrderBump && (
                          <>
                            <li className="text-emerald-700 font-bold">• <strong>Enviado no WhatsApp:</strong> [Trio Extra] Atividades Extras Que Ensinam (PDF)</li>
                            <li className="text-emerald-700 font-bold">• <strong>Enviado no WhatsApp:</strong> [Trio Extra] Jogos Bíblicos Que Transformam (PDF)</li>
                            <li className="text-emerald-700 font-bold">• <strong>Enviado no WhatsApp:</strong> [Trio Extra] Histórias Bíblicas Ilustradas (PDF)</li>
                          </>
                        )}
                      </ul>
                    </div>

                    <p className="text-[11px] text-[#EE7E60] font-bold">
                      Abra o seu WhatsApp para acessar e começar a aplicar hoje mesmo!
                    </p>

                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setIsCheckoutOpen(false)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setIsCheckoutOpen(false);
                        }
                      }}
                      className="bg-gray-100 hover:bg-gray-200 text-[#0B2A4A] font-bold py-1.5 px-4 rounded text-xs transition animate-pulse cursor-pointer select-none inline-block"
                    >
                      Fechar Visualizador de Teste
                    </div>
                  </div>
                )}

              </div>

              {/* Secure checkout footer lock */}
              <div className="bg-gray-50 px-6 py-2.5 text-center text-[10px] text-gray-500 border-t border-gray-100 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-[#C9A227]" />
                <span>Compra simulator cryptographed SSL premium 256 bits</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 16. DETAILED FOOTER (Rodapé with legal support information) */}
      <footer className="bg-[#071F36] text-white py-12 px-4 border-t border-white/5 pb-20 sm:pb-12 text-center text-xs space-y-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left space-y-1">
            <span className="font-serif font-bold text-base text-white tracking-wide">Coleção Aula Pronta Cristã</span>
            <p className="text-[11px] text-gray-400">© 2026 Coleção Aula Pronta Cristã. Todos os direitos reservados.</p>
            <p className="text-[10px] text-gray-500">Transformando o ensino bíblico infantil com leveza e a sã doutrina.</p>
            <div className="pt-2 text-[10.5px] text-gray-400 space-y-0.5 border-t border-white/5 mt-2">
              <p className="font-semibold text-white flex items-center gap-1"><span className="text-[#EE7E60]">🕒</span> Horário do Suporte:</p>
              <p>• Segunda a Sexta: 9h às 19h</p>
              <p>• Sábados: 10h às 17h</p>
            </div>
          </div>

          <div className="flex gap-4 text-gray-400">
            <a href="#comprar" className="hover:text-[#C9A227] transition">Comprar Coleção</a>
            <span>•</span>
            <span className="cursor-pointer hover:text-white transition" onClick={() => setInfoModal({ title: "Política de Privacidade", text: "As políticas de privacidade fictícias seguem os Termos de Uso de materiais pedagógicos de formação cristã. Todos os PDFs baixados são destinados a uso individual na sua igreja local ou lar doméstico, sendo proibida a revenda comercial." })}>Política de Privacidade</span>
            <span>•</span>
            <span className="cursor-pointer hover:text-white transition" onClick={() => setInfoModal({ title: "Contato de Suporte", text: "Precisa de ajuda ou tem alguma dúvida comercial sobre o material? Envie-nos um e-mail fictício para: contato@aulaprontacrista.com.br. Retornamos em até 24 horas úteis. Nosso horário de funcionamento é de Segunda a Sexta-feira das 9h às 19h, e aos Sábados das 10h às 17h." })}>Contato de Suporte</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto pt-6 border-t border-white/5 text-[10px] text-gray-500 leading-relaxed text-center">
          Este site é de caráter demonstrativo. Os preços exibidos (R$ 8,90 e R$ 17,90) e materiais descritos são simulações reais inspiradas no escopo do projeto da Coleção Aula Pronta. Certifique-se de preencher dados verídicos ao comercializar em plataformas oficiais.
        </div>
      </footer>

      {/* 17. REAL-TIME PURCHASE SOCIAL PROOF TOAST (Matches top right request 4 & 5) */}
      <AnimatePresence>
        {purchaseNotification && (
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 sm:top-18 right-4 bg-white border border-[#E6C75A]/40 rounded-xl p-2.5 shadow-xl z-50 flex items-center gap-2 max-w-[210px] sm:max-w-[240px]"
          >
            <div className="relative shrink-0">
              <img
                src={purchaseNotification.avatar}
                alt={purchaseNotification.name}
                className="w-7 h-7 rounded-full object-cover border border-[#C9A227]/30"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 text-white rounded-full p-0.5 text-[6px]">
                <Check className="w-1.5 h-1.5 stroke-[4]" />
              </span>
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 leading-none">
                <span className="text-[10px] font-bold text-[#0B2A4A] truncate">
                  {purchaseNotification.name}
                </span>
                <span className="text-[7px] text-[#C9A227] font-bold uppercase tracking-wider bg-[#C9A227]/10 px-1 py-0.2 rounded shrink-0">
                  {purchaseNotification.location.split(" — ")[1] || purchaseNotification.location}
                </span>
              </div>
              <p className="text-[9px] text-gray-600 leading-tight mt-1">
                {purchaseNotification.message}
              </p>
              <span className="text-[8px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping shrink-0" />
                há poucos minutos
              </span>
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setPurchaseNotification(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setPurchaseNotification(null);
                }
              }}
              className="text-gray-400 hover:text-gray-600 self-start p-0.5 transition shrink-0 cursor-pointer select-none"
            >
              <X className="w-2.5 h-2.5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shared Informative Popup Modal (Alternative to alert) */}
      <AnimatePresence>
        {showDiscountModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-left rounded-3xl max-w-lg w-full shadow-2xl text-[#2B2B2B] border border-gray-150 overflow-hidden"
            >
              {/* Header Badge Accent */}
              <div className="bg-[#0B2A4A] text-white px-6 py-4.5 text-center relative">
                <span className="text-[10px] font-black tracking-widest uppercase text-[#E6C75A] bg-white/10 px-3 py-1 rounded-full border border-white/10">
                  🎁 PRESENTE EXCLUSIVO LIBERADO!
                </span>
                <h4 className="font-serif font-black text-lg sm:text-xl mt-3 text-white">
                  Oportunidade Especial para Mães e Tias
                </h4>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setShowDiscountModal(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setShowDiscountModal(false);
                    }
                  }}
                  className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer select-none"
                  aria-label="close"
                >
                  <X className="w-5 h-5" />
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 text-center">
                <div className="bg-orange-50/70 border border-orange-100 rounded-2xl p-5 sm:p-6 text-left space-y-3">
                  <p className="text-[#0B2A4A] font-serif font-black text-base sm:text-lg leading-relaxed text-center">
                    Você ganhou um cupom de desconto na oferta Coleção + 5 Bônus, ela está saindo pra você por apenas <span className="text-[#EE7E60] underline underline-offset-4 decoration-2">R$ 11,90</span>.
                  </p>
                  <div className="border-t border-orange-200/50 pt-3 text-[11px] text-gray-500 font-medium text-center">
                    ✓ Garanta o acervo completo hoje de R$ 149,90 por R$ 11,90
                  </div>
                </div>

                <div className="flex flex-col gap-3.5 pt-2">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      window.open("https://pay.hotmart.com/P106544601D?off=evkh8rql&checkoutMode=10", "_blank");
                      setShowDiscountModal(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        window.open("https://pay.hotmart.com/P106544601D?off=evkh8rql&checkoutMode=10", "_blank");
                        setShowDiscountModal(false);
                      }
                    }}
                    className="w-full bg-[#EE7E60] hover:bg-[#D45E44] text-white py-4.5 px-6 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wider transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-98 glow-btn animate-pulse-slow select-none"
                  >
                    <span>QUERO APROVEITAR A PROMOÇÃO DE 11,90</span>
                    <ArrowRight className="w-4.5 h-4.5 shrink-0 stroke-[3]" />
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      window.open(checkoutLinkBasic, "_blank");
                      setShowDiscountModal(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        window.open(checkoutLinkBasic, "_blank");
                        setShowDiscountModal(false);
                      }
                    }}
                    className="text-gray-500 hover:text-[#0B2A4A] transition text-center font-bold text-xs sm:text-sm underline cursor-pointer select-none py-1 block"
                  >
                    Quero ainda comprar a coleção básica por 8,90.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Shared Informative Popup Modal (Alternative to alert) */}
      <AnimatePresence>
        {infoModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border text-left rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-[#2B2B2B]"
            >
              <div className="flex justify-between items-center pb-2 border-b border-gray-150">
                <h4 className="font-serif font-bold text-base text-[#0B2A4A]">{infoModal.title}</h4>
                <div 
                  role="button"
                  tabIndex={0}
                  onClick={() => setInfoModal(null)} 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setInfoModal(null);
                    }
                  }}
                  className="text-gray-400 hover:text-gray-600 font-bold p-1 text-sm focus:outline-none cursor-pointer select-none"
                  aria-label="close"
                >
                  ✕
                </div>
              </div>
              <p className="text-xs leading-relaxed text-gray-600">{infoModal.text}</p>
              <div className="text-right">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setInfoModal(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setInfoModal(null);
                    }
                  }}
                  className="bg-[#C9A227] hover:bg-[#E6C75A] text-[#0B2A4A] font-black py-2 px-5 rounded-lg text-xs transition cursor-pointer active:scale-95 select-none text-center inline-block"
                >
                  Entendido
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
