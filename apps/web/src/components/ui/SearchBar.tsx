import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SearchBar({ placeholder = 'Search...', value, onChange, className }: SearchBarProps) {
  return (
    <div className={`relative max-w-xl mx-auto ${className}`}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white
                   focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400
                   text-gray-700 placeholder-gray-400 shadow-sm"
      />
    </div>
  );
}
