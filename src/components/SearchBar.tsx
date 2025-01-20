import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (location: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className={`flex w-full max-w-sm items-center space-x-2 ${className}`}>
      <Input
        type="text"
        placeholder="Enter location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit" className="">
        <Search className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline">Search</span>
      </Button>
    </form>
  );
};

export default SearchBar;

