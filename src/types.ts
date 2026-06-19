/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Testimonial {
  id: string;
  name: string;
  role: "Professora de ED" | "Líder de Ministério" | "Mãe Cristã";
  avatar: string;
  location: string;
  text: string;
  stars: number;
}

export interface ActivitySample {
  id: string;
  title: string;
  category: "Desenho" | "Caça-Palavras" | "Labirinto" | "Dinâmica" | "Perguntas";
  ageGroup: "3-5 anos" | "6-8 anos" | "9-12 anos";
  theme: string;
  description: string;
  points: string[];
}

export interface PurchaseNotification {
  name: string;
  role: string;
  location: string;
  message: string;
  avatar: string;
}

