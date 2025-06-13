'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Token {
  text: string;
  attention: number[];
}

const tokens: Token[] = [
  { text: 'The', attention: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1] },
  { text: 'dog', attention: [0.1, 0.4, 0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1] },
  { text: 'chased', attention: [0.1, 0.3, 0.4, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1] },
  { text: 'the', attention: [0.1, 0.1, 0.3, 0.4, 0.1, 0.1, 0.1, 0.1, 0.1] },
  { text: 'cat', attention: [0.1, 0.1, 0.1, 0.3, 0.4, 0.1, 0.1, 0.1, 0.1] },
  { text: 'because', attention: [0.1, 0.1, 0.2, 0.3, 0.3, 0.4, 0.2, 0.1, 0.1] },
  { text: 'it', attention: [0.1, 0.1, 0.2, 0.4, 0.2, 0.3, 0.4, 0.1, 0.1] },
  { text: 'was', attention: [0.1, 0.1, 0.1, 0.3, 0.4, 0.2, 0.3, 0.4, 0.1] },
  { text: 'scared', attention: [0.1, 0.1, 0.1, 0.3, 0.4, 0.1, 0.2, 0.3, 0.4] },
];

const SelfAttention: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % tokens.length);
    }, 2000 / speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const renderAttentionGraph = () => {
    const canvasWidth = 580;
    const canvasHeight = 200;
    const centerY = canvasHeight / 2;
    const scale = 0.9;
    const nodeRadius = 12;
    const xGap = 60;
    const startX = 30;

    return (
      <svg
        width={canvasWidth}
        height={canvasHeight}
        viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
      >
        <g
          transform={`scale(${scale}) translate(${
            ((1 - scale) * canvasWidth) / 2 / scale
          }, ${((1 - scale) * canvasHeight) / 2 / scale})`}
        >
          {tokens.map((token, index) => {
            const x = startX + index * xGap;
            return (
              <g key={index}>
                <motion.circle
                  cx={x}
                  cy={centerY}
                  r={nodeRadius}
                  fill={index === step ? 'rgb(37, 99, 235)' : '#93c5fd'}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
                <text
                  x={x}
                  y={centerY + nodeRadius * 2}
                  textAnchor="middle"
                  className="text-xs"
                >
                  {token.text}
                </text>
                <motion.rect
                  x={x - nodeRadius / 2}
                  y={centerY - 70}
                  width={nodeRadius}
                  height={60}
                  fill="rgb(37, 99, 235)"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: token.attention[step] * 2.5 }}
                  transition={{ duration: 0.5 }}
                />
              </g>
            );
          })}
        </g>
      </svg>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 relative bg-white border border-gray-200 rounded-md">
      <div className="text-lg mb-2 text-center text-gray-700">Self-Attention Mechanism</div>
      <div className="flex flex-col items-center">
        <div className="h-[200px] w-full flex items-center justify-center">
          <AnimatePresence mode="wait">{renderAttentionGraph()}</AnimatePresence>
        </div>
        <div className='mb-15'>
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center text-sm text-gray-600"
            >
              Attention for "{tokens[step].text}": {tokens[step].attention.map((a) => a.toFixed(2)).join(', ')}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center space-x-1">
        <button
          className="p-[2px] rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6"
              />
            </svg>
          ) : (
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
            </svg>
          )}
        </button>
        {[0.5, 1, 1.5, 2].map((s) => (
          <button
            key={s}
            className={`px-2 py-1 text-xs rounded ${speed === s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
            onClick={() => setSpeed(s)}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelfAttention;

