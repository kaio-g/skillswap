import React from 'react';
import { Download, Sparkles, ArrowRightLeft } from 'lucide-react';

interface ConceptIllustrationProps {
  className?: string;
  showCaption?: boolean;
}

export const ConceptIllustration: React.FC<ConceptIllustrationProps> = ({
  className = '',
  showCaption = true,
}) => {
  return (
    <div className={`relative rounded-3xl overflow-hidden border border-[#D5CABB] bg-[#FAF7F2] shadow-sm ${className}`}>
      {/* Top Banner Tag */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-[#183B2B]/90 backdrop-blur-xs text-[#FAF7F2] text-[11px] font-semibold">
        <ArrowRightLeft className="w-3.5 h-3.5 text-[#D95D39]" />
        <span>Direct Skill Exchange • The Cashless Model</span>
      </div>

      {/* Download SVG Link */}
      <a
        href="/skill-exchange-concept.svg"
        download="skill-exchange-concept.svg"
        className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 hover:bg-white text-[#183B2B] text-[11px] font-semibold border border-[#D5CABB] shadow-2xs transition cursor-pointer"
        title="Download high-resolution vector SVG"
      >
        <Download className="w-3.5 h-3.5 text-[#D95D39]" />
        <span>Download SVG</span>
      </a>

      {/* SVG Image Embedded */}
      <div className="w-full aspect-16/9 overflow-hidden">
        <img
          src="/skill-exchange-concept.svg"
          alt="Illustration symbolizing reciprocal skill exchange without money: two community members sharing spreadsheet and language lessons across a wooden table"
          className="w-full h-full object-cover sm:object-contain select-none"
          loading="lazy"
        />
      </div>

      {/* Optional Caption Description */}
      {showCaption && (
        <div className="p-4 sm:p-5 bg-[#F6EFE3] border-t border-[#DDD3C0] text-xs text-[#43514A] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="leading-relaxed">
            <strong>Symbolism:</strong> Two peers connected by a reciprocal exchange loop. One shares spreadsheet mastery; the other shares conversational fluency and music. No currency—equal time and shared curiosity.
          </p>
          <span className="text-[11px] font-mono text-[#6A7871] shrink-0">
            1h Teach ⇄ 1h Learn
          </span>
        </div>
      )}
    </div>
  );
};
