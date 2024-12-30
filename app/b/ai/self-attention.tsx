'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Token {
  text: string;
  attention: number[];
}

const tokens: Token[] = [
  { text: 'The', attention: [0.1, 0.1, 0.1, 0.1, 0.1] },
  { text: 'dog', attention: [0.1, 0.4, 0.2, 0.1, 0.1] },
  { text: 'chased', attention: [0.1, 0.3, 0.4, 0.1, 0.1] },
  { text: 'the', attention: [0.1, 0.1, 0.3, 0.4, 0.1] },
  { text: 'cat', attention: [0.1, 0.1, 0.1, 0.3, 0.4] },
  { text: 'because', attention: [0.1, 0.1, 0.2, 0.3, 0.3] },
  { text: 'it', attention: [0.1, 0.1, 0.2, 0.4, 0.2] },
  { text: 'was', attention: [0.1, 0.1, 0.1, 0.3, 0.4] },
  { text: 'scared', attention: [0.1, 0.1, 0.1, 0.3, 0.4] },
];

const SelfAttention: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % tokens.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-8 bg-white border border-gray-200 rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Self-Attention Mechanism</h2>
      <div className="w-full mb-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tokens.map((token, index) => (
            <motion.div
              key={index}
              className={`text-lg md:text-xl font-mono p-2 rounded ${
                index === step ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
              animate={{
                scale: index === step ? 1.1 : 1,
                transition: { duration: 0.3 },
              }}
            >
              {token.text}
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center space-x-2">
          {tokens.map((token, index) => (
            <motion.div
              key={index}
              className="w-4 bg-blue-500 rounded"
              initial={{ height: 0 }}
              animate={{ height: `${token.attention[step] * 100}px` }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center text-lg font-semibold"
        >
          Attention for "{tokens[step].text}": {tokens[step].attention.map((a) => a.toFixed(2)).join(', ')}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default SelfAttention;

