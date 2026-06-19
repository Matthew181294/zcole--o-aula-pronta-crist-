/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Star, ShieldCheck, Heart, MessageSquare } from "lucide-react";
import { Testimonial } from "../types";

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    name: "Débora Santos",
    role: "Professora de ED",
    location: "São Paulo — SP",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120",
    stars: 5,
    text: "Minha noite de sábado era uma aflição interminável, procurando figurinhas no Pinterest e tentando formatar no Word para imprimir. Com a coleção, escolho o tema e a aula está pronta em 5 minutos! Os desenhos de colorir e caça-palavras são lindos e as crianças prestam muita atenção."
  },
  {
    id: "t2",
    name: "Letícia Rodrigues",
    role: "Líder de Ministério",
    location: "Curitiba — PR",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120",
    stars: 5,
    text: "Eu organizo as salas do ministério infantil da minha igreja e as voluntárias viviam sobrecarregadas de preparar material. Separar as atividades por faixa etária facilitou tudo. Agora as voluntárias chegam tranquilas, com as apostilas prontas para aplicar em cada turma. Foi o melhor investimento para o nosso departamento infantil."
  },
  {
    id: "t3",
    name: "Amanda Souza",
    role: "Mãe Cristã",
    location: "Belo Horizonte — MG",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=120&h=120",
    stars: 5,
    text: "Eu queria muito fazer o culto doméstico e ensinar a Bíblia para meus filhos de 5 e 8 anos, mas não sabia por onde começar. As folhinhas ilustradas e os quebra-gelos salvaram nossos momentos! Eles competem para ver quem resolve primeiro o enigma bíblico do dia. Vale cada centavo."
  },
  {
    id: "t4",
    name: "Tia Sarah Castro",
    role: "Professora de ED",
    location: "Recife — PE",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=120&h=120",
    stars: 5,
    text: "Os roteiros de emergência bônus ('Aula Salva') já me ajudaram três vezes que estive doente ou com imprevistos no trabalho. É impressionante como o material é completo, didático e 100% de acordo com a sã doutrina cristã!"
  },
  {
    id: "t5",
    name: "Karina Alencar",
    role: "Mãe Cristã",
    location: "Goiânia — GO",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120",
    stars: 5,
    text: "Atividades que realmente conectam. Ensino meus filhos em casa (homeschooling) e as atividades de fixação facilitam muito a nossa rotina. Eles amam pintar e recortar!"
  }
];

export default function InteractiveTestimonials() {
  const [filter, setFilter] = useState<string>("Todos");

  const filteredTestimonials = TESTIMONIALS_DATA.filter((item) => {
    if (filter === "Todos") return true;
    return item.role === filter;
  });

  return (
    <div className="space-y-8">
      {/* Filters bar */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {["Todos", "Professora de ED", "Líder de Ministério", "Mãe Cristã"].map((category) => (
          <div
            key={category}
            role="button"
            tabIndex={0}
            onClick={() => setFilter(category)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setFilter(category);
              }
            }}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition cursor-pointer select-none ${
              filter === category
                ? "bg-[#C9A227] text-[#0B2A4A] shadow"
                : "bg-white text-gray-600 border border-gray-200 hover:border-[#C9A227]"
            }`}
          >
            {category === "Todos" ? "Todos os Depoimentos" : category}
          </div>
        ))}
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#E6C75A]/20 hover:border-[#C9A227]/40 rounded-2xl p-6 shadow-sm transition-all hover:shadow-md flex flex-col justify-between"
          >
            <div>
              {/* Stars & Verified */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A227] text-[#C9A227]" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Compra Confirmada
                </span>
              </div>

              {/* Text Quote */}
              <p className="text-gray-700 text-sm leading-relaxed italic mb-6">
                &ldquo;{item.text}&rdquo;
              </p>
            </div>

            {/* Author info */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <img
                src={item.avatar}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-[#C9A227]/20"
              />
              <div>
                <h4 className="text-sm font-bold text-[#0B2A4A]">{item.name}</h4>
                <div className="text-[11px] text-[#C9A227] font-semibold">{item.role}</div>
                <div className="text-[10px] text-gray-400">{item.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust reassurance notice */}
      <div className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
        <MessageSquare className="w-3.5 h-3.5 text-[#C9A227]" />
        <span>Os relatos acima refletem a experiência real de nossas assinantes. Seus resultados podem variar conforme a aplicação.</span>
      </div>
    </div>
  );
}
