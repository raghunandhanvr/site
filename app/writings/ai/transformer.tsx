'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { id: 1, title: 'Input', content: 'The dog chased the cat because it was scared' },
  { id: 2, title: 'Tokenization', content: ['The', 'dog', 'chased', 'the', 'cat', 'because', 'it', 'was', 'scared'] },
  { id: 3, title: 'Embedding', content: 'Word vectors' },
  { id: 4, title: 'Self-Attention', content: 'Contextual representations' },
  { id: 5, title: 'Feed-Forward', content: 'Further processing' },
  { id: 6, title: 'Output', content: 'Processed sequence' },
];

const Transformer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
    }, 3000 / speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const renderStep = () => {
    const step = steps[currentStep];
    switch (step.id) {
      case 1:
      case 6:
        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-base sm:text-lg font-mono text-center text-gray-700"
          >
            {step.content}
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {Array.isArray(step.content) ? (
              step.content.map((token, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-blue-400 rounded p-1 text-xs sm:text-sm text-gray-700"
                >
                  {token}
                </motion.div>
              ))
            ) : (
              <span>{step.content}</span>
            )}
          </motion.div>
        );
      case 3:
      case 4:
      case 5:
        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-base sm:text-lg font-mono text-gray-700"
          >
            {step.content}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              className="w-full h-12 sm:h-16 bg-blue-100 mt-2 rounded"
            />
          </motion.div>
        );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 relative bg-white border border-gray-200 rounded-md">
      <div className="text-lg mb-2 text-center text-gray-700">Transformer Architecture</div>
      <div className="w-full h-48 sm:h-56 flex items-center justify-center bg-white border border-gray-200 rounded-md mb-2">
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-center text-sm text-gray-600 mb-10 mt-5"
        >
          Step {steps[currentStep].id}: {steps[currentStep].title}
        </motion.div>
      </AnimatePresence>

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

export default Transformer;

