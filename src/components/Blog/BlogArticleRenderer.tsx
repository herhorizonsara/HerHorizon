import React from 'react';
import { ExternalLink, Sparkles, Feather, CheckCircle2, ArrowRight } from 'lucide-react';

interface BlogArticleRendererProps {
  content: string;
  onNavigateToFreeGuide?: () => void;
  onNavigateToSystem?: () => void;
}

export const BlogArticleRenderer: React.FC<BlogArticleRendererProps> = ({
  content,
  onNavigateToFreeGuide,
  onNavigateToSystem,
}) => {
  // Parse markdown-like content blocks
  const blocks = content.split('\n\n');

  const renderInlineFormatted = (text: string) => {
    // Process links [text](url), bold **text**, italic *text*, code `text`
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(text)) !== null) {
      const precedingText = text.substring(lastIndex, match.index);
      if (precedingText) {
        parts.push(renderBasicStyles(precedingText, `pre-${lastIndex}`));
      }

      const linkLabel = match[1];
      const linkUrl = match[2];
      const isInternalFreeGuide = linkUrl === '/free-guide';
      const isInternalCheckout = linkUrl === '/#step-10' || linkUrl === '#step-10';

      if (isInternalFreeGuide && onNavigateToFreeGuide) {
        parts.push(
          <button
            key={`link-${match.index}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigateToFreeGuide();
            }}
            className="text-[#BD7469] hover:text-[#9E4D43] font-semibold underline decoration-[#E2B072] decoration-2 underline-offset-4 transition-colors cursor-pointer inline-flex items-center space-x-1"
          >
            <span>{linkLabel}</span>
          </button>
        );
      } else if (isInternalCheckout && onNavigateToSystem) {
        parts.push(
          <button
            key={`link-${match.index}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigateToSystem();
            }}
            className="text-[#BD7469] hover:text-[#9E4D43] font-semibold underline decoration-[#E2B072] decoration-2 underline-offset-4 transition-colors cursor-pointer"
          >
            {linkLabel}
          </button>
        );
      } else {
        const isExternal = linkUrl.startsWith('http');
        parts.push(
          <a
            key={`link-${match.index}`}
            href={linkUrl}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="text-[#BD7469] hover:text-[#9E4D43] font-semibold underline decoration-[#E2B072] decoration-2 underline-offset-4 transition-colors inline-flex items-center space-x-0.5"
          >
            <span>{linkLabel}</span>
            {isExternal && <ExternalLink className="w-3 h-3 ml-0.5 inline opacity-70" />}
          </a>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(renderBasicStyles(text.substring(lastIndex), `tail-${lastIndex}`));
    }

    return parts.length > 0 ? parts : renderBasicStyles(text, 'root');
  };

  const renderBasicStyles = (text: string, keyPrefix: string): React.ReactNode => {
    // Bold, italic, code
    const segments = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
    return segments.map((seg, idx) => {
      const key = `${keyPrefix}-${idx}`;
      if (seg.startsWith('**') && seg.endsWith('**')) {
        return (
          <strong key={key} className="font-bold text-[#2D2A26]">
            {seg.slice(2, -2)}
          </strong>
        );
      }
      if (seg.startsWith('*') && seg.endsWith('*')) {
        return (
          <em key={key} className="italic font-serif">
            {seg.slice(1, -1)}
          </em>
        );
      }
      if (seg.startsWith('`') && seg.endsWith('`')) {
        return (
          <code
            key={key}
            className="bg-[#FAF2EB] text-[#A8584D] px-1.5 py-0.5 rounded text-[13px] font-mono border border-[#EFE4DA]"
          >
            {seg.slice(1, -1)}
          </code>
        );
      }
      return seg;
    });
  };

  return (
    <article className="prose prose-neutral max-w-none text-[#3D3532] leading-relaxed font-sans space-y-6">
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Divider
        if (trimmed === '---' || trimmed === '***') {
          return (
            <div key={index} className="py-6 flex items-center justify-center">
              <div className="w-16 h-px bg-[#E2B072]/60" />
              <div className="mx-3 text-[#E2B072]">
                <Feather className="w-4 h-4" />
              </div>
              <div className="w-16 h-px bg-[#E2B072]/60" />
            </div>
          );
        }

        // Heading 2
        if (trimmed.startsWith('## ')) {
          const text = trimmed.slice(3);
          return (
            <h2
              key={index}
              className="font-serif italic text-2xl sm:text-3xl text-[#2D2A26] font-normal tracking-tight mt-10 mb-4 pt-4 border-t border-[#F2ECE4] first:border-t-0 first:pt-0"
            >
              {renderInlineFormatted(text)}
            </h2>
          );
        }

        // Heading 3
        if (trimmed.startsWith('### ')) {
          const text = trimmed.slice(4);
          return (
            <h3
              key={index}
              className="font-serif italic text-xl sm:text-2xl text-[#4A3E39] font-medium mt-7 mb-3"
            >
              {renderInlineFormatted(text)}
            </h3>
          );
        }

        // Heading 4
        if (trimmed.startsWith('#### ')) {
          const text = trimmed.slice(5);
          return (
            <h4
              key={index}
              className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#BD7469] mt-5 mb-2"
            >
              {renderInlineFormatted(text)}
            </h4>
          );
        }

        // Blockquote / Pull-Quote
        if (trimmed.startsWith('> ')) {
          const quoteLines = trimmed
            .split('\n')
            .map((l) => l.replace(/^>\s?/, ''))
            .join(' ');
          return (
            <blockquote
              key={index}
              className="my-8 pl-6 sm:pl-8 py-4 border-l-4 border-[#E2B072] bg-gradient-to-r from-[#FAF6F2] to-transparent rounded-r-2xl italic font-serif text-lg sm:text-xl text-[#3D3532] leading-relaxed shadow-2xs"
            >
              {renderInlineFormatted(quoteLines)}
            </blockquote>
          );
        }

        // Image ![alt](url)
        const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (imgMatch) {
          const altText = imgMatch[1];
          const imgUrl = imgMatch[2];
          return (
            <figure key={index} className="my-8">
              <div className="rounded-2xl overflow-hidden border border-[#E8DCD5] shadow-md bg-[#FAF7F2]">
                <img
                  src={imgUrl}
                  alt={altText}
                  className="w-full h-auto max-h-[500px] object-cover"
                  loading="lazy"
                />
              </div>
              {altText && (
                <figcaption className="text-center text-xs text-[#8C7A74] mt-2.5 font-light italic">
                  {altText}
                </figcaption>
              )}
            </figure>
          );
        }

        // Bullet list
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed.split('\n').filter((l) => l.startsWith('- ') || l.startsWith('* '));
          return (
            <ul key={index} className="my-4 space-y-2.5 pl-2 list-none">
              {items.map((item, idx) => {
                const text = item.replace(/^[-*]\s+/, '');
                return (
                  <li key={idx} className="flex items-start space-x-3 text-base text-[#4A4440] leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#E2B072] shrink-0 mt-2" />
                    <span>{renderInlineFormatted(text)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // Numbered list
        if (/^\d+\.\s/.test(trimmed)) {
          const items = trimmed.split('\n').filter((l) => /^\d+\.\s/.test(l));
          return (
            <ol key={index} className="my-4 space-y-3 pl-1 list-none">
              {items.map((item, idx) => {
                const text = item.replace(/^\d+\.\s+/, '');
                return (
                  <li key={idx} className="flex items-start space-x-3.5 text-base text-[#4A4440] leading-relaxed">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FAF3EB] border border-[#E2B072]/50 text-xs font-bold text-[#BD7469] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="flex-1">{renderInlineFormatted(text)}</span>
                  </li>
                );
              })}
            </ol>
          );
        }

        // Check if block has special callout prefix
        if (trimmed.startsWith('⚡') || trimmed.startsWith('🌿') || trimmed.startsWith('💡') || trimmed.startsWith('NOTE:')) {
          return (
            <div
              key={index}
              className="my-6 p-5 sm:p-6 bg-[#FAF6F2] border border-[#E8DCD5] rounded-2xl flex items-start space-x-3.5 shadow-2xs"
            >
              <div className="w-8 h-8 rounded-full bg-[#E2B072]/20 border border-[#E2B072]/40 text-[#BD7469] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-sm sm:text-base text-[#4A4440] leading-relaxed">
                {renderInlineFormatted(trimmed)}
              </div>
            </div>
          );
        }

        // Standard Paragraph
        return (
          <p
            key={index}
            className="text-base sm:text-[17px] leading-[1.8] text-[#3D3532] font-normal"
          >
            {renderInlineFormatted(trimmed)}
          </p>
        );
      })}
    </article>
  );
};
