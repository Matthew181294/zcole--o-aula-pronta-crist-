/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { BookOpen, Check, Eye, HelpCircle, Palette, Search, Shuffle, Sparkles } from "lucide-react";
import { ActivitySample } from "../types";

const SAMPLES: ActivitySample[] = [
  {
    id: " Noah-3-5",
    title: "A Grande Arca de Noé — Colorir e Contar",
    category: "Desenho",
    ageGroup: "3-5 anos",
    theme: "Gênesis 6",
    description: "Atividade lúdica para fixação da história dos animais e a promessa do arco-íris, com traços grossos ideais para as mãozinhas pequeninas.",
    points: ["Desenhos grandes de animais em pares", "Instruções cantadas para a professora aplicar", "Contagem guiada de 1 a 7 com estrelas da promessa"]
  },
  {
    id: "David-6-8",
    title: "Davi e Golias — Caça-Palavras da Coragem",
    category: "Caça-Palavras",
    ageGroup: "6-8 anos",
    theme: "1 Samuel 17",
    description: "Ache as palavras chaves da vitória de Davi contra o gigante: FÉ, PEDRA, DEUS, CORAGEM e FUNDA.",
    points: ["Grelha de letras amigável de alta legibilidade", "Perguntas de fixação para responder em classe", "Ilustração do escudo do exército de Israel"]
  },
  {
    id: "Fruit-9-12",
    title: "O Labirinto do Fruto do Espírito",
    category: "Labirinto",
    ageGroup: "9-12 anos",
    theme: "Gálatas 5:22",
    description: "Guie o personagem pelo caminho dos valores corretos (Amor, Alegria, Paz, Paciência) até chegar à Videira Verdadeira, desviando de caminhos de egoísmo.",
    points: ["Labirinto desafiador e educativo", "Caixas de reflexão sobre comportamento e virtudes", "Desafio bíblico cronometrado para dinâmicas em grupo"]
  },
  {
    id: "Armor-6-8",
    title: "A Armadura de Deus em Ação",
    category: "Dinâmica",
    ageGroup: "6-8 anos",
    theme: "Efésios 6",
    description: "Atividade prática com recorte da armadura (capacete da salvação, escudo da fé e espada do espírito) para vestir em bonecos de papel.",
    points: ["Instrução de montagem passo-a-passo ilustrada", "Aplicação prática sobre como usar a fé nas dificuldades", "Memorização do versículo chave em conjunto"]
  },
  {
    id: "Miracles-9-12",
    title: "Os Milagres de Jesus — Charadas e Quiz",
    category: "Perguntas",
    ageGroup: "9-12 anos",
    theme: "Evangelhos",
    description: "Fichamento interativo com 10 perguntas rápidas e dinâmicas sobre os milagres mais conhecidos de Jesus, estimulando o raciocínio rápido.",
    points: ["Perguntas de múltipla escolha com gabarito ilustrado", "Perguntas de verdadeiro ou falso bem explicativas", "Desafio bônus para aprofundar em casa com a família"]
  }
];

export default function InteractiveSampleSheets() {
  const [selectedAge, setSelectedAge] = useState<string>("Todos");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [activeSampleId, setActiveSampleId] = useState<string>(SAMPLES[0].id);

  // Simulated state for interactive puzzle solving
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [coloringColor, setColoringColor] = useState<string>("#C9A227");
  const [coloringSelection, setColoringSelection] = useState<string[]>([]);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [simulationAlert, setSimulationAlert] = useState<{ message: string; type: "success" | "info" | "warning" } | null>(null);

  // Auto clean active alert when changing selections
  React.useEffect(() => {
    setSimulationAlert(null);
  }, [selectedAge, selectedCategory, activeSampleId]);

  const ages = ["Todos", "3-5 anos", "6-8 anos", "9-12 anos"];
  const categories = ["Todos", "Desenho", "Caça-Palavras", "Labirinto", "Dinâmica", "Perguntas"];

  const filteredSamples = SAMPLES.filter((s) => {
    const matchAge = selectedAge === "Todos" || s.ageGroup === selectedAge;
    const matchCat = selectedCategory === "Todos" || s.category === selectedCategory;
    return matchAge && matchCat;
  });

  const currentSample = SAMPLES.find((s) => s.id === activeSampleId) || SAMPLES[0];

  const handleWordClick = (word: string) => {
    if (foundWords.includes(word)) {
      setFoundWords(foundWords.filter((w) => w !== word));
    } else {
      setFoundWords([...foundWords, word]);
    }
  };

  const handleColorArea = (area: string) => {
    if (coloringSelection.includes(area)) {
      // Modify or toggle
      setColoringSelection(coloringSelection.filter((a) => a !== area));
    } else {
      setColoringSelection([...coloringSelection, area]);
    }
  };

  return (
    <div id="atividades-preview" className="bg-[#F7F4EC] rounded-2xl border-2 border-[#E6C75A]/40 p-5 md:p-8 shadow-md">
      <div className="flex flex-col lg:flex-row items-stretch gap-8">
        
        {/* Selector Panel (Left) */}
        <div className="w-full lg:w-2/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#0B2A4A] font-semibold text-lg mb-4">
              <Sparkles className="w-5 h-5 text-[#C9A227]" />
              <h3>Simule as Atividades Prontas</h3>
            </div>
            <p className="text-sm text-[#2B2B2B] leading-relaxed mb-6">
              Veja abaixo exemplos exatos de como nossas atividades são organizadas e fáceis de aplicar. Escolha a faixa etária e a categoria para simular a experiência!
            </p>

            {/* Filter 1: Age */}
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#14416E] mb-2">Faixa Etária:</label>
              <div className="flex flex-wrap gap-2">
                {ages.map((age) => (
                  <div
                    key={age}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setSelectedAge(age);
                      // Auto select first match
                      const firstMatch = SAMPLES.find((s) => age === "Todos" || s.ageGroup === age);
                      if (firstMatch) setActiveSampleId(firstMatch.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedAge(age);
                        const firstMatch = SAMPLES.find((s) => age === "Todos" || s.ageGroup === age);
                        if (firstMatch) setActiveSampleId(firstMatch.id);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer select-none transition ${
                      selectedAge === age
                        ? "bg-[#0B2A4A] text-white"
                        : "bg-white text-[#14416E] border border-gray-200 hover:border-[#C9A227]"
                    }`}
                  >
                    {age}
                  </div>
                ))}
              </div>
            </div>

            {/* Filter 2: Category */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#14416E] mb-2">Tipo de Atividade:</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setSelectedCategory(cat);
                      const firstMatch = SAMPLES.find((s) => cat === "Todos" || s.category === cat);
                      if (firstMatch) setActiveSampleId(firstMatch.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedCategory(cat);
                        const firstMatch = SAMPLES.find((s) => cat === "Todos" || s.category === cat);
                        if (firstMatch) setActiveSampleId(firstMatch.id);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer select-none transition ${
                      selectedCategory === cat
                        ? "bg-[#0B2A4A] text-white"
                        : "bg-white text-[#14416E] border border-gray-200 hover:border-[#C9A227]"
                    }`}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>

            {/* Match List */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#14416E] mb-2">Selecione para abrir:</label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {filteredSamples.map((sample) => (
                  <div
                    key={sample.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveSampleId(sample.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveSampleId(sample.id);
                      }
                    }}
                    className={`w-full text-left p-3 rounded-lg border cursor-pointer select-none transition flex items-center justify-between ${
                      activeSampleId === sample.id
                        ? "bg-[#14416E]/10 border-[#C9A227] text-[#0B2A4A]"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-1 rounded-md bg-white text-[#C9A227] border border-gray-100">
                        {sample.category === "Desenho" && <Palette className="w-4 h-4" />}
                        {sample.category === "Caça-Palavras" && <Search className="w-4 h-4" />}
                        {sample.category === "Labirinto" && <Shuffle className="w-4 h-4" />}
                        {sample.category === "Dinâmica" && <BookOpen className="w-4 h-4" />}
                        {sample.category === "Perguntas" && <HelpCircle className="w-4 h-4" />}
                      </span>
                      <div>
                        <div className="text-xs font-bold">{sample.title}</div>
                        <div className="text-[10px] text-gray-500">{sample.theme} • {sample.ageGroup}</div>
                      </div>
                    </div>
                    <Eye className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
                {filteredSamples.length === 0 && (
                  <div className="text-xs text-gray-500 py-4 text-center">Nenhuma atividade com essa combinação de filtros. Tente redefinir.</div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-[#0B2A4A] text-white rounded-xl p-4 text-xs">
            <span className="font-bold text-[#C9A227] block mb-1">💡 SEÇÃO EM ESPÚRIO E USO LIMPO</span>
            <p className="opacity-90 leading-relaxed">
              O material original é 100% pronto para impressão em arquivos de alta resolução PDF. Use ao lado para conferir como os temas são didáticos!
            </p>
          </div>
        </div>

        {/* Dynamic Display Board (Right) */}
        <div className="w-full lg:w-3/5 flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden min-h-[460px]">
          {/* Header styled like a premium worksheet paper */}
          <div className="bg-[#0b2a4a] text-white px-5 py-4 border-b border-[#C9A227] flex justify-between items-center">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#E6C75A]">{currentSample.category} • {currentSample.ageGroup}</span>
              <h4 className="text-base font-serif font-semibold">{currentSample.title}</h4>
            </div>
            <div className="text-right text-xs text-gray-300 hidden sm:block">
              <span className="block text-white font-serif">{currentSample.theme}</span>
              <span>Coleção Aula Pronta</span>
            </div>
          </div>

          {/* Sheet Canvas Content */}
          <div className="p-4 sm:p-6 flex-1 bg-[#FDFCF7] flex flex-col justify-between">
            <div>
              <p className="text-xs sm:text-sm italic text-[#2B2B2B] mb-5 pb-3 border-b border-gray-100">
                &ldquo;{currentSample.description}&rdquo;
              </p>

              {/* Inline alert replace window.alert */}
              {simulationAlert && (
                <div className={`mb-5 p-4 rounded-xl border flex items-start gap-3 text-xs shadow-sm transition-all relative ${
                  simulationAlert.type === "success" 
                    ? "bg-emerald-50 border-emerald-300 text-emerald-950" 
                    : simulationAlert.type === "warning" 
                    ? "bg-amber-50 border-amber-300 text-amber-950" 
                    : "bg-[#14416E]/10 border-[#14416E]/20 text-[#0B2A4A]"
                }`}>
                  <div className="flex-1">
                    <strong className="block mb-0.5 font-bold uppercase tracking-wider text-[10px]">
                      {simulationAlert.type === "success" && "🎉 Sucesso!"}
                      {simulationAlert.type === "warning" && "⚠️ Atenção!"}
                      {simulationAlert.type === "info" && "💡 Simulação Ativa:"}
                    </strong>
                    <span className="leading-relaxed">{simulationAlert.message}</span>
                  </div>
                  <div 
                    role="button"
                    tabIndex={0}
                    onClick={() => setSimulationAlert(null)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSimulationAlert(null);
                      }
                    }}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 font-bold p-1 text-sm focus:outline-none cursor-pointer select-none"
                    aria-label="dismiss"
                  >
                    ×
                  </div>
                </div>
              )}

              {/* Sample-specific interactive views */}
              {currentSample.category === "Caça-Palavras" && (
                <div className="mb-6">
                  <div className="text-xs font-semibold text-gray-500 mb-3 uppercase text-center">Procure as palavras clicando nelas:</div>
                  <div className="grid grid-cols-6 gap-1 md:gap-2 max-w-full sm:max-w-xs mx-auto text-center font-mono font-bold text-gray-700 bg-white p-2 sm:p-3 rounded-lg border border-gray-200">
                    {["D", "C", "O", "R", "A", "G",
                      "E", "M", "Y", "F", "F", "E",
                      "U", "P", "E", "D", "R", "A",
                      "S", "G", "I", "G", "A", "N",
                      "L", "H", "U", "N", "D", "A",
                      "T", "D", "E", "U", "S", "K"].map((letter, i) => {
                        return (
                          <div
                            key={i}
                            className="aspect-square flex items-center justify-center border border-gray-100 rounded cursor-pointer hover:bg-[#C9A227]/30 active:scale-95 transition text-xs sm:text-sm select-none"
                            onClick={() => setSimulationAlert({ 
                              message: "Você clicou no desafio de letras bíblicas! Na folha impressa em PDF, as crianças usam lápis de cor para pintar e contornar cada palavra em classe.",
                              type: "info"
                            })}
                          >
                            {letter}
                          </div>
                        );
                      })}
                  </div>
                  <div className="mt-4 flex justify-center gap-1.5 flex-wrap">
                    {["CORAGEM", "FÉ", "PEDRA", "DEUS", "FUNDA"].map((word) => (
                      <span
                        key={word}
                        onClick={() => handleWordClick(word)}
                        className={`text-[10px] sm:text-xs px-2.5 py-1.5 rounded border cursor-pointer transition active:scale-95 select-none ${
                          foundWords.includes(word)
                            ? "bg-[#C9A227] text-[#0B2A4A] border-[#C9A227] font-semibold"
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {word} {foundWords.includes(word) ? "✓" : ""}
                      </span>
                    ))}
                  </div>
                  <div className="text-[10px] text-center text-gray-400 mt-2">Clique nas palavras acima de apoio para marcar no simulador!</div>
                </div>
              )}

              {currentSample.category === "Desenho" && (
                <div className="mb-6 text-center">
                  <div className="text-xs font-semibold text-gray-500 mb-3 uppercase">Pintura Bíblica Interativa (Selecione a cor e clique nas partes do navio)</div>
                  
                  {/* Palette selectors */}
                  <div className="flex justify-center gap-2.5 mb-4">
                    {["#C9A227", "#14416E", "#8B5A2B", "#4A825F", "#D97706"].map((color) => (
                      <div
                        key={color}
                        role="button"
                        tabIndex={0}
                        onClick={() => setColoringColor(color)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setColoringColor(color);
                          }
                        }}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition active:scale-90 cursor-pointer select-none ${
                          coloringColor === color ? "scale-110 border-gray-800" : "border-transparent"
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Selecionar cor ${color}`}
                      />
                    ))}
                  </div>

                  {/* Ship outline drawing */}
                  <div className="inline-block bg-white p-3 rounded-xl border border-gray-200 shadow-inner w-full max-w-[280px]">
                    <svg className="w-full h-auto mx-auto aspect-[5/3]" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                      {/* Rainbow */}
                      <path
                        d="M 20,100 A 80,80 0 0,1 180,100"
                        fill="none"
                        stroke={coloringSelection.includes("arco-iris") ? coloringColor : "#E2E8F0"}
                        strokeWidth="8"
                        className="cursor-pointer hover:opacity-80 transition"
                        onClick={() => handleColorArea("arco-iris")}
                      />
                      {/* Sun */}
                      <circle
                        cx="170"
                        cy="30"
                        r="12"
                        fill={coloringSelection.includes("sol") ? coloringColor : "#FFF"}
                        stroke="#94A3B8"
                        strokeWidth="2"
                        className="cursor-pointer hover:opacity-80 transition"
                        onClick={() => handleColorArea("sol")}
                      />
                      {/* Ark Hull */}
                      <path
                        d="M 40,80 L 160,80 L 140,105 L 60,105 Z"
                        fill={coloringSelection.includes("casco") ? coloringColor : "#FFF"}
                        stroke="#475569"
                        strokeWidth="2"
                        className="cursor-pointer hover:opacity-80 transition"
                        onClick={() => handleColorArea("casco")}
                      />
                      {/* Ark Cabin */}
                      <rect
                        x="70"
                        y="50"
                        width="60"
                        height="30"
                        fill={coloringSelection.includes("cabine") ? coloringColor : "#FFF"}
                        stroke="#475569"
                        strokeWidth="2"
                        className="cursor-pointer hover:opacity-80 transition"
                        onClick={() => handleColorArea("cabine")}
                      />
                      {/* Water waves */}
                      <path
                        d="M 10,105 Q 30,100 50,105 T 90,105 T 130,105 T 170,105 T 190,105"
                        fill="none"
                        stroke={coloringSelection.includes("agua") ? coloringColor : "#38BDF8"}
                        strokeWidth="3"
                        className="cursor-pointer hover:opacity-80 transition"
                        onClick={() => handleColorArea("agua")}
                      />
                      {/* Text indicator */}
                      <text x="100" y="70" fontSize="10" textAnchor="middle" fill="#64748B" className="pointer-events-none font-serif">ARCA DE NOÉ</text>
                    </svg>
                    <div className="text-[10px] text-gray-500 mt-2">Clique no arco-íris, sol, casco ou cabine para pintar!</div>
                  </div>
                </div>
              )}

              {currentSample.category === "Labirinto" && (
                <div className="mb-6 max-w-xs mx-auto text-center">
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex flex-col gap-2">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => setSimulationAlert({
                          message: "Beco sem saída! O caminho do egoísmo e de agir sem pensar gera conflitos e não alcança as promessas. Use a paciência!",
                          type: "warning"
                        })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setSimulationAlert({
                              message: "Beco sem saída! O caminho do egoísmo e de agir sem pensar gera conflitos e não alcança as promessas. Use a paciência!",
                              type: "warning"
                            });
                          }
                        }}
                        className="py-3 px-3 rounded bg-red-50 hover:bg-red-100 active:scale-[0.98] text-red-900 font-medium text-xs border border-red-200 transition text-left flex items-center justify-between cursor-pointer select-none"
                      >
                        <span>Caminho A: Agir por impulso e brigar</span>
                        <span className="text-red-500 font-bold">Becos →</span>
                      </div>
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => setSimulationAlert({
                          message: "Parabéns! O caminho do amor, do perdão e da paciência guiaram a criança com puro sucesso até as Bem-aventuranças e à Videira Verdadeira!",
                          type: "success"
                        })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setSimulationAlert({
                              message: "Parabéns! O caminho do amor, do perdão e da paciência guiaram a criança com puro sucesso até as Bem-aventuranças e à Videira Verdadeira!",
                              type: "success"
                            });
                          }
                        }}
                        className="py-3 px-3 rounded bg-emerald-50 hover:bg-emerald-100 active:scale-[0.98] text-emerald-900 font-medium text-xs border border-emerald-200 transition text-left flex items-center justify-between cursor-pointer select-none"
                      >
                        <span>Caminho B: Esperar e perdoar o amigo</span>
                        <span className="text-emerald-500 font-bold">Vitória ✓</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2">No PDF, o labirinto impresso orienta a coordenação motora e debate valores morais práticos.</p>
                </div>
              )}

              {currentSample.category === "Dinâmica" && (
                <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 max-w-md mx-auto text-left">
                  <span className="text-xs font-bold uppercase text-[#C9A227] tracking-wider block mb-1">Como usar em classe (Instrução do Líder):</span>
                  <div className="space-y-2 text-xs text-gray-700 leading-relaxed font-sans">
                    <p className="font-semibold">Passo 1: Entregue as folhas de recortes e cole com as crianças sobre o escopo da armadura de Efésios 6 (Capacete, Escudo e Espada).</p>
                    <p>Passo 2: Peça para cada criança recontar contra qual 'golias' invisível (ex: medo, desobediência) ela vai usar o escudo da fé.</p>
                    <p className="italic text-gray-500">Versículo Chave: &ldquo;Tomai também o capacete da salvação, e a espada do Espírito, que é a palavra de Deus&rdquo; (Efésios 6:17)</p>
                  </div>
                </div>
              )}

              {currentSample.category === "Perguntas" && (
                <div className="mb-6 max-w-sm mx-auto text-center">
                  <div className="text-xs font-semibold text-gray-500 mb-3 uppercase">Marque a resposta correta:</div>
                  <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 text-left">
                    <p className="text-xs font-bold text-gray-800 mb-3">Qual destes milagres Jesus realizou no mar?</p>
                    <div className="space-y-2">
                      {[
                        { id: 1, text: "A) Curou o cego de nascença" },
                        { id: 2, text: "B) Acalmou a tempestade e andou sobre as águas", correct: true },
                        { id: 3, text: "C) Multiplicou os azeites da viúva" }
                      ].map((ans) => (
                        <div
                          key={ans.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => setQuizAnswer(ans.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              setQuizAnswer(ans.id);
                            }
                          }}
                          className={`w-full text-left p-3 rounded text-xs transition border cursor-pointer select-none active:scale-[0.99] ${
                            quizAnswer === ans.id
                              ? ans.correct
                                ? "bg-emerald-50 border-emerald-400 text-emerald-800 font-bold"
                                : "bg-red-50 border-red-400 text-red-800 font-bold"
                              : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {ans.text} {quizAnswer === ans.id && (ans.correct ? "✓ (Acertou!)" : "✗ (Tente novamente!)")}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Common Details */}
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#14416E] block mb-2">Por que funciona para {currentSample.ageGroup}:</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 px-1">
                  {currentSample.points.map((pt, i) => (
                    <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Bottom print-friendly simulator label */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-2">
              <span className="text-[10px] text-gray-400 font-mono">ID: {currentSample.id} • Atividade Digital Reaplicável</span>
              <a
                href="#comprar"
                className="text-xs font-bold text-[#0B2A4A] inline-flex items-center gap-1 hover:text-[#C9A227] transition"
              >
                <span>Baixe as 1000 atividades completas</span>
                <span>→</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
