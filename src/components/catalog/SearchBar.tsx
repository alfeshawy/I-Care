import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from '@/i18n/useTranslation';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SearchBar({ value, onChange, className = '' }: SearchBarProps) {
  const { t, dir } = useTranslation();
  const [localValue, setLocalValue] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);
    
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onChange(val), 200);
  }, [onChange]);

  const handleClear = useCallback(() => {
    setLocalValue('');
    onChange('');
  }, [onChange]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className={`relative w-full sm:max-w-md ${className}`}>
      {/* Search Icon */}
      <div 
        className={`absolute top-1/2 -translate-y-1/2 pointer-events-none opacity-60 ${
          dir === 'rtl' ? 'right-3.5' : 'left-3.5'
        }`}
        style={{ color: 'var(--color-text-secondary)' }}
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <input
        type="search"
        value={localValue}
        onChange={handleChange}
        placeholder={t.product.searchPlaceholder}
        className={`w-full py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border transition-all duration-200 outline-none focus:ring-2 focus:ring-[var(--color-accent)] ${
          dir === 'rtl' ? 'pr-10.5 pl-10' : 'pl-10.5 pr-10'
        }`}
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          color: 'var(--color-text-primary)',
          borderColor: 'var(--color-border)',
        }}
        dir={dir}
        aria-label={t.product.searchPlaceholder}
      />

      {/* Clear Button */}
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className={`absolute top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-black/10 active:scale-95 transition-all cursor-pointer ${
            dir === 'rtl' ? 'left-2.5' : 'right-2.5'
          }`}
          style={{ color: 'var(--color-text-secondary)' }}
          aria-label={t.product.close}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

