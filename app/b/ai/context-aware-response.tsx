'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ContextAwareResponse: React.FC = () => {
  const [query, setQuery] = useState('Who is the GOAT?');
  const [context, setContext] = useState('cricket');
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (query === 'Who is the GOAT?') {
      switch (context) {
        case 'cricket':
          setResponse('Virat Kohli is considered the GOAT in cricket.');
          break;
        case 'football':
          setResponse('Ronaldo is often regarded as the GOAT in football.');
          break;
        case 'Tamil cinema':
          setResponse('Vijay is widely recognized as the GOAT in Tamil cinema.');
          break;
        default:
          setResponse('The GOAT depends on the specific context.');
      }
    } else {
      setResponse('Please ask "Who is the GOAT?" to see context-aware responses.');
    }
  }, [query, context]);

  return (
    <div className="w-full max-w-[60ch] mx-auto p-4 sm:p-8 bg-white border border-gray-200 rounded-md">
      <div className="mb-4">
        <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">Query:</label>
        <input
          id="query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-2">Context:</label>
        <select
          id="context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="cricket">Cricket</option>
          <option value="football">Football</option>
          <option value="Tamil cinema">Tamil Cinema</option>
        </select>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 bg-gray-100 rounded-md"
      >
        <h3 className="text-lg font-semibold mb-2">Response:</h3>
        <p>{response}</p>
      </motion.div>
    </div>
  );
};

export default ContextAwareResponse;
