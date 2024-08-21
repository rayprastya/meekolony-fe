import { useState } from 'react';
import { useRouter } from 'next/router';
import SearchBar from '../../components/SearchBar';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/u/${searchTerm}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-6">Find User by Wallet</h1>
        <form onSubmit={handleSearch}>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <button
            type="submit"
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
