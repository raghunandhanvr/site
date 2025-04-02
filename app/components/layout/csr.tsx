'use client';

import { LoadingComponent } from '@/app/components/ui/loader';

import dynamic from 'next/dynamic';

export const Tokenization = dynamic(() => import('@/app/b/ai/tokenization'), {
  loading: LoadingComponent,
  ssr: false
});

export const SelfAttention = dynamic(() => import('@/app/b/ai/self-attention'), {
  loading: LoadingComponent,
  ssr: false
});

export const NeuralNetwork = dynamic(() => import('@/app/b/ai/neural-network'), {
  loading: LoadingComponent,
  ssr: false
});

export const ContextAwareResponse = dynamic(() => import('@/app/b/ai/context-aware-response'), {
  loading: LoadingComponent,
  ssr: false
});

export const Transformer = dynamic(() => import('@/app/b/ai/transformer'), {
  loading: LoadingComponent,
  ssr: false
}); 