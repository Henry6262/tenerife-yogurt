import { useEffect, useRef } from 'react';
import { X, Clock, Tag, Calendar } from 'lucide-react';
import { marked } from 'marked';
import type { Article } from '@/data/articles';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [article]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!article) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 pt-16 pb-8 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header image */}
        <div className="relative h-56 sm:h-72">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary mb-2">
              {article.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Meta */}
        <div className="px-6 sm:px-8 py-4 border-b border-border flex flex-wrap items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {article.datePublished}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {article.readTime}
          </span>
          <span className="flex items-center gap-1.5">
            <Tag size={14} />
            {article.keywords.slice(0, 3).join(', ')}
          </span>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-6 max-h-[50vh] overflow-y-auto">
          <div
            className="prose prose-lg max-w-none text-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: marked.parse(article.content, { async: false }) as string }}
          />
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-4 border-t border-border bg-background/50">
          <p className="text-sm text-muted">
            Por <span className="font-medium text-foreground">{article.author}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
