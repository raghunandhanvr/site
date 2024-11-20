'use client'

import { useState } from 'react'
import { metaData } from "../config"

export function NameTransition() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <h1 
      className="font-medium text-3xl transition-element"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="sr-only">{metaData.title}</span>
      <span aria-hidden="true" className="block overflow-hidden">
        <span 
          className={`inline-block transition-all duration-300 ease-in-out ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        >
          {metaData.title}
        </span>
        <span 
          className={`inline-block absolute left-0 transition-all duration-300 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          {metaData.name}
        </span>
      </span>
    </h1>
  )
}