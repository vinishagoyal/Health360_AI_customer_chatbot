"use client";

import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface MarkdownMessageProps {
  content: string;
  className?: string;
}

export function MarkdownMessage({ content, className }: MarkdownMessageProps) {
  return (
    <div className={cn("prose prose-sm max-w-none", className)}>
      <ReactMarkdown
        components={{
          // Customize heading styles
          h1: ({ children }) => <h1 className="text-lg font-semibold mb-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-base font-semibold mb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-sm font-semibold mb-1">{children}</h3>,
          
          // Customize paragraph styles
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          
          // Customize list styles
          ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="text-sm">{children}</li>,
          
          // Customize emphasis styles
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          
          // Customize code styles
          code: ({ children }) => (
            <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">{children}</code>
          ),
          pre: ({ children }) => (
            <pre className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto mb-2">{children}</pre>
          ),
          
          // Customize link styles
          a: ({ href, children }) => (
            <a 
              href={href} 
              className="text-primary hover:underline" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          
          // Customize blockquote styles
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-muted pl-4 italic mb-2">{children}</blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
