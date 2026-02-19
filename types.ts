
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}