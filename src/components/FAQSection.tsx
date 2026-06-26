/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Como eu recebo o material? É um livro físico?",
    answer: "Não, este é um produto 100% digital entregue formato PDF de alta resolução. Assim que o seu pagamento for aprovado (o PIX cai em menos de 1 minuto), você receberá um link automático por e-mail e WhatsApp para baixar todas as atividades no seu celular, notebook ou tablet."
  },
  {
    question: "Por quanto tempo tenho acesso às atividades?",
    answer: "O seu acesso é vitalício! Você paga uma única vez e garante o material para sempre. Pode baixar as atividades hoje, no próximo ano ou quando precisar, sem nenhuma cobrança de mensalidade."
  },
  {
    question: "Posso imprimir as folhas mais de uma vez?",
    answer: "Sim! Como os arquivos são seus para sempre, você pode salvar os PDFs no seu computador e imprimir quantas vezes desejar — seja para 10 alunos na igreja no próximo domingo, ou para os seus filhos aprenderem em casa repetidas vezes durante a semana."
  },
  {
    question: "O material é de qual doutrina cristã?",
    answer: "A Coleção foi elaborada focando no ensinamento bíblico central, de sã doutrina ecumênica e evangélica, fundamentada puramente nas Escrituras Sagradas de Gênesis a Apocalipse (ensinos morais, histórias, parábolas de Jesus e versículos chaves). Ela não aborda dogmas denominacionais específicos, podendo ser aplicada sem nenhum constrangimento em igrejas Batista, Assembleia de Deus, Presbiteriana, Quadrangular, Metodista, renovadas ou em lares católicos praticantes que prezam pelo escopo da Bíblia sagrada."
  },
  {
    question: "Serve para crianças de quais idades?",
    answer: "A coleção atende crianças de 3 a 12 anos. As folhinhas vêm catalogadas de forma inteligente e separadas em três níveis de facilidade: 3 a 5 anos (foca em desenhos grandes para colorir, contagem e lúdico), 6 a 8 anos (começa a alfabetização bíblica, caça-palavras fáceis e recortes) e 9 a 12 anos (textos, labirintos inteligentes, charadas e desafios de fixação bíblica)."
  },
  {
    question: "Tenho alguma garantia se o material não for o que eu esperava?",
    answer: "Sim! Nós oferecemos uma garantia incondicional de 7 dias, conforme determina a legislação nacional de defesa do consumidor. Se por qualquer motivo você abrir os arquivos e achar que as atividades não servem para a sua turma ou família, mande uma mensagem e devolvemos 100% do seu dinheiro, sem perguntas ou burocracia."
  },
  {
    question: "Qual o horário de atendimento do Suporte?",
    answer: "Nosso suporte funciona de Segunda a Sexta-feira das 9h às 19h, e aos Sábados das 10h às 17h. Se você tiver qualquer dúvida ou precisar de qualquer assistência com o download, envio ou impressão das atividades, nossa equipe está sempre de prontidão nesses horários para lhe atender rapidamente!"
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="bg-white border rounded-xl hover:border-[#C9A227]/40 transition duration-200 overflow-hidden"
          >
            <div
              role="button"
              tabIndex={0}
              onClick={() => toggle(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggle(index);
                }
              }}
              className="w-full text-left px-5 py-4 focus:outline-none flex items-center justify-between gap-4 transition duration-150 hover:bg-[#F7F4EC]/40 cursor-pointer select-none"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-[#C9A227] shrink-0" />
                <span className="font-serif font-semibold text-sm md:text-base text-[#0B2A4A] leading-snug">
                  {faq.question}
                </span>
              </div>
              <div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-[#0B2A4A]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#C9A227]" />
                )}
              </div>
            </div>

            {/* Answer transition */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[500px] border-t border-gray-100" : "max-h-0"
              } overflow-hidden`}
            >
              <div className="px-5 py-4 bg-[#FCFBF7] text-xs md:text-sm text-gray-700 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
