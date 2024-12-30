'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Token {
  text: string;
  value: string;
}

interface Step {
  id: number;
  text?: string;
  description: string;
  tokens?: (string | Token)[];
  tensor?: number[];
}

const steps: Step[] = [
  {
    id: 1,
    text: 'Who is Raghu?',
    description: 'Original Text',
  },
  {
    id: 2,
    text: 'Who_is_Raghu?',
    description: 'Replace Spaces with Underscores',
  },
  {
    id: 3,
    tokens: ['_Who', '_is', '_Ra', '_ghu', '?'],
    description: 'Split into Subwords',
  },
  {
    id: 4,
    tokens: [
      { text: '_Who', value: '1001' },
      { text: '_is', value: '2002' },
      { text: '_Ra', value: '3003' },
      { text: '_ghu', value: '4004' },
      { text: '?', value: '5005' },
    ],
    description: 'Map Subwords to IDs',
  },
  {
    id: 5,
    tensor: [1001, 2002, 3003, 4004, 5005],
    description: 'Create Tensor',
  },
];

const Tokenization: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [speed, setSpeed] = React.useState(1);

  React.useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev === steps.length ? 1 : prev + 1));
    }, 3000 / speed);

    return () => clearInterval(timer);
  }, [isPlaying, speed]);

  const renderStep = () => {
    const step = steps[currentStep - 1];

    if (currentStep === 1 || currentStep === 2) {
      return (
        <motion.div
          key={step.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-2xl sm:text-3xl md:text-4xl font-mono text-center"
        >
          {step.text}
        </motion.div>
      );
    }

    if (currentStep === 3) {
      return (
        <motion.div
          key={step.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {step.tokens?.map((token, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="border-2 border-blue-600 rounded p-2 text-lg sm:text-xl md:text-2xl font-mono"
            >
              {typeof token === 'string' ? token : token.text}
            </motion.div>
          ))}
        </motion.div>
      );
    }

    if (currentStep === 4) {
      return (
        <motion.div
          key={step.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {step.tokens?.map((token, index) => (
              <div
                key={typeof token === 'string' ? `${token}-${index}` : token.value}
                className="flex flex-col items-center"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-lg sm:text-xl md:text-2xl font-mono mb-2 border-2 border-blue-600 rounded p-2"
                >
                  {typeof token === 'string' ? token : token.text}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.1 }}
                  className="text-blue-600"
                >
                  ↓
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.2 }}
                  className="text-base sm:text-lg md:text-xl font-mono text-blue-600"
                >
                  {typeof token === 'string' ? token : token.value}
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      );
    }

    if (currentStep === 5) {
      return (
        <motion.div
          key={step.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl font-mono text-center flex flex-col sm:flex-row gap-y-1 sm:gap-y-0 items-center justify-center"
          >
            <svg
              className="w-6 h-6 mr-2 min-w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
            Tensor{' '}
            <span className="text-blue-600 ml-2">
              [ {step.tensor?.join(', ')} ]
            </span>
          </motion.div>
        </motion.div>
      );
    }
  };

  return (
    <div className="w-full max-w-[60ch] mx-auto p-4 sm:p-8 relative bg-white border border-gray-200 rounded-md">
      <div className="flex flex-col items-center space-y-12">
        <div className="h-48 flex items-center justify-center">
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-4 left-4">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-sm text-gray-600"
        >
          {steps[currentStep - 1].description}
        </motion.div>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center space-x-1">
        <button
          className="p-[2px] rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg
              className="w-5 h-5"
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
              className="w-5 h-5"
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
            key={`speed-${s}`}
            className={`px-2 py-1 text-xs rounded ${
              speed === s
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            } hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
            onClick={() => setSpeed(s)}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
}

export default Tokenization;