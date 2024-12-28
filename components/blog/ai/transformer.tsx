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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
            className="text-xl sm:text-2xl font-mono text-center"
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
                  className="border-2 border-blue-600 rounded p-2 text-sm sm:text-base"
                >
                  {token}
                </motion.div>
              ))
            ) : (
              <motion.div className="text-lg sm:text-xl font-mono">{step.content}</motion.div>
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
            className="text-lg sm:text-xl font-mono"
          >
            {step.title}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              className="w-full h-16 sm:h-24 bg-blue-100 mt-2 rounded"
            />
          </motion.div>
        );
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-8 bg-white border border-gray-200 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Transformer Architecture</h2>
      <div className="w-full h-64 flex items-center justify-center bg-white border border-gray-200 rounded-md mb-4">
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </div>
      <motion.div
        key={currentStep}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center text-lg font-semibold"
      >
        Step {steps[currentStep].id}: {steps[currentStep].title}
      </motion.div>
    </div>
  );
};

export default Transformer;