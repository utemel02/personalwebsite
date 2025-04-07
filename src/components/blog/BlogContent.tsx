"use client";

import React from "react";

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  // Convert markdown-style content to JSX
  // This is a simplified renderer - a real app would use a proper markdown parser
  const renderContent = (content: string) => {
    const parts = content.split('```');
    
    return parts.map((part, index) => {
      // Code blocks
      if (index % 2 === 1) {
        const [language, ...code] = part.split('\n');
        return (
          <pre key={index} className="bg-stone-800 text-amber-100 p-4 rounded-md overflow-x-auto my-4">
            <code className={`language-${language}`}>
              {code.join('\n')}
            </code>
          </pre>
        );
      }
      
      // Regular text with some basic formatting
      return (
        <div key={index} className="prose prose-amber dark:prose-invert max-w-none">
          {part.split('\n').map((line, lineIndex) => {
            // Headers
            if (line.startsWith('# ')) {
              return <h1 key={lineIndex} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>;
            }
            if (line.startsWith('## ')) {
              return <h2 key={lineIndex} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>;
            }
            if (line.startsWith('### ')) {
              return <h3 key={lineIndex} className="text-xl font-semibold mt-5 mb-3">{line.substring(4)}</h3>;
            }
            
            // Images
            if (line.match(/!\[.*?\]\(.*?\)/)) {
              const altMatch = line.match(/!\[(.*?)\]/);
              const srcMatch = line.match(/\((.*?)\)/);
              
              if (altMatch && srcMatch) {
                return (
                  <div key={lineIndex} className="my-6">
                    <img 
                      src={srcMatch[1]} 
                      alt={altMatch[1]} 
                      className="rounded-lg max-w-full mx-auto"
                    />
                  </div>
                );
              }
            }
            
            // Lists
            if (line.match(/^\d+\. /)) {
              return <li key={lineIndex} className="ml-6 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
            }
            if (line.match(/^- /)) {
              return <li key={lineIndex} className="ml-6 list-disc">{line.substring(2)}</li>;
            }
            
            // URLs - Add this section to handle URLs in text
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            if (line.match(urlRegex)) {
              return (
                <p key={lineIndex} className="my-4">
                  {line.split(urlRegex).map((text, i) => {
                    // Every odd index will be a URL
                    if (i % 2 === 1) {
                      return (
                        <a 
                          key={i} 
                          href={text} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 underline"
                        >
                          {text}
                        </a>
                      );
                    }
                    return text;
                  })}
                </p>
              );
            }
            
            // Regular paragraph
            if (line.trim() !== '') {
              return <p key={lineIndex} className="my-4">{line}</p>;
            }
            
            return null;
          })}
        </div>
      );
    });
  };

  return <div>{renderContent(content)}</div>;
} 