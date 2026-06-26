import React, { useState, useEffect } from "react";
import { BookOpen, Sparkles, Check, ArrowRight, ShieldCheck, Heart } from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    key: string;
    text: string;
  }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Você é mãe de filhos em qual faixa de idade?",
    options: [
      { key: "A", text: "Bebês e crianças pequenas (0 a 3 anos)" },
      { key: "B", text: "Crianças em fase pré-escolar (4 a 6 anos)" },
      { key: "C", text: "Crianças em idade escolar (7 a 10 anos)" },
      { key: "D", text: "Tenho filhos em mais de uma faixa de idade ao mesmo tempo" }
    ]
  },
  {
    id: 2,
    question: "Com que frequência você tenta ensinar algo sobre a Bíblia para o seu filho?",
    options: [
      { key: "A", text: "Quase todo dia — faz parte da nossa rotina" },
      { key: "B", text: "Algumas vezes por semana, quando lembro ou dá tempo" },
      { key: "C", text: "Nas datas especiais como Natal e Páscoa" },
      { key: "D", text: "Raramente — quero muito fazer isso, mas ainda não comecei de verdade" }
    ]
  },
  {
    id: 3,
    question: "Quando você pensa em ensinar a Bíblia para o seu filho, o que mais te trava?",
    options: [
      { key: "A", text: "Não sei como explicar de um jeito que ele entenda na idade dele" },
      { key: "B", text: "Não tenho material — fico pesquisando na internet e nunca acho nada bom" },
      { key: "C", text: "Falta tempo — quando sobra um momento, estou sem energia para criar algo" },
      { key: "D", text: "Fico com medo de ensinar errado ou de ele se dispersar logo" }
    ]
  },
  {
    id: 4,
    question: "Quando você tenta fazer uma atividade bíblica em casa com o seu filho, o que costuma acontecer?",
    options: [
      { key: "A", text: "Ele se dispersa rápido e eu não sei como prender a atenção dele" },
      { key: "B", text: "A atividade fica muito na teoria — falta algo concreto para fazer junto" },
      { key: "C", text: "Consigo às vezes, mas é raro ter material adequado para a idade dele" },
      { key: "D", text: "Quase nunca consigo colocar em prática — fica só na intenção" }
    ]
  },
  {
    id: 5,
    question: "Quanto tempo você consegue dedicar para preparar algo educativo sobre a Bíblia para o seu filho?",
    options: [
      { key: "A", text: "Tenho tempo, mas não sei como usar bem — me perco na internet sem achar algo bom" },
      { key: "B", text: "Menos de 10 minutos por vez — precisa ser rápido ou não acontece" },
      { key: "C", text: "Depende do dia — às vezes tenho tempo, às vezes não tenho nada" },
      { key: "D", text: "Honestamente, quase nenhum — a rotina não deixa espaço" }
    ]
  },
  {
    id: 6,
    question: "Como você se sente quando passa uma semana sem ter ensinado nada sobre a Bíblia para o seu filho?",
    options: [
      { key: "A", text: "Com culpa — sinto que estou falhando com ele como mãe cristã" },
      { key: "B", text: "Preocupada — o tempo está passando e ele não está aprendendo" },
      { key: "C", text: "Frustrada — quero tanto fazer isso, mas a rotina sempre vence" },
      { key: "D", text: "As três coisas ao mesmo tempo" }
    ]
  },
  {
    id: 7,
    question: "Você sente que a responsabilidade de ensinar a fé ao seu filho é principalmente sua?",
    options: [
      { key: "A", text: "Sim — sei que a família é a primeira escola e quero cumprir esse papel" },
      { key: "B", text: "Parcialmente — a igreja ajuda, mas sei que em casa sou eu quem faz a diferença" },
      { key: "C", text: "Sim, e isso me pesa muito porque não sei como fazer isso bem" },
      { key: "D", text: "Sim, e quero muito começar — só preciso de um ponto de partida" }
    ]
  },
  {
    id: 8,
    question: "Você já pensou que pode estar perdendo a fase mais importante para plantar a fé no coração do seu filho?",
    options: [
      { key: "A", text: "Sim — sei que a infância é o melhor momento e não quero deixar passar" },
      { key: "B", text: "Esse pensamento me assusta muito e me motiva ao mesmo tempo" },
      { key: "C", text: "Às vezes — e quando penso nisso me bate um peso enorme" },
      { key: "D", text: "Sim, e é por isso que estou aqui agora procurando uma solução" }
    ]
  },
  {
    id: 9,
    question: "Se você tivesse tudo resolvido, como seria ensinar a Bíblia para o seu filho?",
    options: [
      { key: "A", text: "Teria atividades prontas para cada fase da idade dele — só escolher e fazer junto" },
      { key: "B", text: "Teria um plano do ano inteiro com temas bíblicos, para nunca ficar perdida" },
      { key: "C", text: "Teria material que prende a atenção dele — colorir, recortar, jogar e aprender" },
      { key: "D", text: "Tudo isso — atividades prontas, organizadas, que ele amasse fazer" }
    ]
  },
  {
    id: 10,
    question: "O que você precisa hoje para começar a ensinar a Bíblia para o seu filho de verdade?",
    options: [
      { key: "A", text: "Material pronto e organizado, que eu não precise criar do zero" },
      { key: "B", text: "Atividades que prendam a atenção dele e sejam adequadas para a idade" },
      { key: "C", text: "Confiança de que vou conseguir fazer isso sem ser professora formada" },
      { key: "D", text: "Um jeito simples, rápido e que dê pra encaixar na rotina do dia a dia" }
    ]
  }
];

interface QuizProps {
  onComplete: (answers: Record<number, string>) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMiddleLoading, setIsMiddleLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [loadingText, setLoadingText] = useState<string>("Analisando suas respostas...");

  // Progress texts during analysis simulation
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          const next = prev + 1;
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              onComplete(answers);
            }, 500);
            return 100;
          }
          
          // Dynamic subtitle changes
          if (next === 20) setLoadingText("Identificando faixas etárias ideais...");
          if (next === 45) setLoadingText("Mapeando principais desafios e barreiras...");
          if (next === 65) setLoadingText("Selecionando bônus exclusivos e materiais extras...");
          if (next === 85) setLoadingText("Estruturando seu diagnóstico pedagógico personalizado...");
          
          return next;
        });
      }, 35); // 3.5 seconds total loading
      return () => clearInterval(interval);
    }
  }, [isLoading, answers, onComplete]);

  const handleOptionSelect = (optionKey: string) => {
    const updatedAnswers = { ...answers, [currentIdx + 1]: optionKey };
    setAnswers(updatedAnswers);

    if (currentIdx < quizQuestions.length - 1) {
      // Small timeout for visual confirmation of click before going to next
      setTimeout(() => {
        // If transitioning from index 3 (Question 4) to index 4 (Question 5)
        if (currentIdx === 3) {
          setIsMiddleLoading(true);
          setTimeout(() => {
            setIsMiddleLoading(false);
            setCurrentIdx(4);
          }, 2000);
        } else {
          setCurrentIdx((prev) => prev + 1);
        }
      }, 200);
    } else {
      setTimeout(() => {
        setIsLoading(true);
      }, 200);
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const currentQuestion = quizQuestions[currentIdx];
  const progressPercent = ((currentIdx + 1) / quizQuestions.length) * 100;

  if (isMiddleLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 sm:px-6">
        <header className="absolute top-0 left-0 w-full bg-white border-b border-gray-100 py-4 px-6 flex justify-center items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5.5 h-5.5 text-[#EE7E60]" />
            <span className="font-serif font-black text-sm sm:text-base text-[#0B2A4A] tracking-wider uppercase">
              Coleção Aula Pronta Cristã
            </span>
          </div>
        </header>

        <div className="w-full max-w-lg text-center space-y-8 mt-16 px-4">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-orange-50 text-[#EE7E60] animate-spin">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-black text-[#0B2A4A] leading-tight max-w-md mx-auto">
              Estamos ajustando as perguntas com base nas suas respostas...
            </h2>
            <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">
              Por favor, aguarde um instante
            </p>
          </div>
          <div className="flex justify-center gap-1.5 pt-2">
            <span className="w-3 h-3 rounded-full bg-[#EE7E60] animate-bounce [animation-delay:-0.3s]" />
            <span className="w-3 h-3 rounded-full bg-[#E6C75A] animate-bounce [animation-delay:-0.15s]" />
            <span className="w-3 h-3 rounded-full bg-[#0B2A4A] animate-bounce" />
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 sm:px-6">
        {/* Simple elegant top header */}
        <header className="absolute top-0 left-0 w-full bg-white border-b border-gray-100 py-4 px-6 flex justify-center items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#EE7E60]" />
            <span className="font-serif font-black text-sm sm:text-base text-[#0B2A4A] tracking-wider uppercase">
              Coleção Aula Pronta Cristã
            </span>
          </div>
        </header>

        <div className="w-full max-w-md text-center space-y-8 mt-16">
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-orange-50 text-[#EE7E60] animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-[#0B2A4A]">
              Montando seu material personalizado
            </h2>
            <p className="text-sm text-gray-500 font-medium h-6 animate-pulse">
              {loadingText}
            </p>
          </div>

          {/* Loading bar */}
          <div className="space-y-2">
            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#EE7E60] to-[#E6C75A] h-full rounded-full transition-all duration-75 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-[#EE7E60] block">
              {loadingProgress}% concluído
            </span>
          </div>

          <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100 text-left space-y-2 max-w-sm mx-auto">
            <div className="flex items-center gap-2 text-xs font-bold text-[#EE7E60] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Garantia de Envio Seguro</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Nosso sistema está preparando sua sugestão de atividades com base nas respostas enviadas. O acesso será enviado imediatamente ao final de seu diagnóstico.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#2B2B2B] font-sans flex flex-col justify-between">
      
      {/* 1. HEADER (Toda branca com "Coleção Aula Pronta Cristã" no topo - centralizado) */}
      <header className="bg-white border-b border-gray-100 py-4 sm:py-5 px-4 sm:px-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-1.5 text-center">
          <div className="flex items-center justify-center gap-2">
            <BookOpen className="w-5.5 h-5.5 text-[#EE7E60]" />
            <span className="font-serif font-black text-sm sm:text-base text-[#0B2A4A] tracking-wider uppercase">
              Coleção Aula Pronta Cristã
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-gray-400 bg-gray-50 px-2.5 py-0.5 rounded-full border border-gray-100 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span>DIAGNÓSTICO ATIVO</span>
          </div>
        </div>
      </header>

      {/* 2. BODY CONTENT */}
      <main className="flex-1 flex flex-col justify-center py-8 sm:py-12 px-4">
        <div className="max-w-3xl mx-auto w-full space-y-8">
          
          {/* Prominent intro title layout with generous whitespace */}
          <div className="text-center space-y-4">
            <h1 className="text-sm sm:text-base md:text-lg font-black text-[#EE7E60] tracking-widest uppercase bg-orange-50/70 py-2.5 px-4 rounded-2xl border border-orange-100/50 inline-block">
              ⚡ Faça agora o <span className="underline decoration-[#0B2A4A] decoration-2 underline-offset-2">diagnóstico</span> pra receber um material personalizado
            </h1>
          </div>

          {/* QUIZ INTERACTIVE CONTAINER */}
          <div className="bg-white border-2 border-[#E6C75A] rounded-3xl p-5 sm:p-8 shadow-2xl shadow-amber-100/35 space-y-6 relative overflow-hidden">
            
            {/* Top progress metadata */}
            <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
              <span>Pergunta {currentIdx + 1} de {quizQuestions.length}</span>
              <span className="text-[#EE7E60] font-mono">{Math.round(progressPercent)}%</span>
            </div>

            {/* Micro progress indicator bar */}
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="bg-[#EE7E60] h-full rounded-full transition-all duration-300" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>

            {/* Question Text */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-extrabold text-[#EE7E60] uppercase tracking-widest font-mono">PASSO DE SELEÇÃO</span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-[#0B2A4A] leading-tight">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options list in custom brand colors */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((option) => {
                const isSelected = answers[currentQuestion.id] === option.key;
                return (
                  <button
                    key={option.key}
                    onClick={() => handleOptionSelect(option.key)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-3.5 group cursor-pointer ${
                      isSelected
                        ? "border-[#EE7E60] bg-orange-50/40 text-[#0B2A4A]"
                        : "border-gray-100 hover:border-gray-200 bg-white hover:bg-slate-50/50 text-[#2B2B2B]"
                    }`}
                  >
                    {/* Circle Letter badge with dynamic coloring */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                      isSelected
                        ? "bg-[#EE7E60] text-white"
                        : "bg-gray-100 group-hover:bg-gray-200 text-gray-500 group-hover:text-gray-700"
                    }`}>
                      {option.key}
                    </div>
                    
                    <span className={`text-xs sm:text-sm font-medium leading-relaxed flex-1 ${
                      isSelected ? "text-[#0B2A4A] font-bold" : "text-[#2B2B2B]"
                    }`}>
                      {option.text}
                    </span>
                    
                    {/* Check icon or subtle arrow on hover */}
                    <div className="shrink-0">
                      {isSelected ? (
                        <Check className="w-4 h-4 text-[#EE7E60] stroke-[3]" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer with Back Button */}
            {currentIdx > 0 && (
              <div className="pt-2 border-t border-gray-100 flex justify-start">
                <button
                  onClick={handleBack}
                  className="text-xs font-bold text-gray-400 hover:text-[#0B2A4A] transition py-2 px-3 hover:bg-gray-50 rounded-xl"
                >
                  ← Voltar para a pergunta anterior
                </button>
              </div>
            )}
          </div>

          {/* Social Proof badge beneath quiz */}
          <div className="flex justify-center items-center gap-2 text-[11px] text-gray-400 font-medium">
            <Heart className="w-3.5 h-3.5 text-[#EE7E60] fill-current" />
            <span>Mais de 2.400 mães e tias cristãs já completaram este diagnóstico</span>
          </div>

        </div>
      </main>

      {/* 3. FOOTER */}
      <footer className="bg-slate-50 border-t border-gray-100 py-6 text-center text-[11px] text-gray-400">
        <div className="max-w-4xl mx-auto px-4">
          <p>© 2026 Coleção Aula Pronta Cristã. Todos os direitos reservados.</p>
          <p className="mt-1 text-[10px] text-gray-300">
            Material simulado e adaptado para capacitação e auxílio no desenvolvimento ministerial infantil doméstico.
          </p>
        </div>
      </footer>

    </div>
  );
}
