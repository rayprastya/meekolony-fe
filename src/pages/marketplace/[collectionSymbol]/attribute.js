import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SearchBar from '../../../components/SearchBar';
import Pagination from '../../../components/Pagination';

export default function MarketplaceAttribute() {
  const router = useRouter();
  const { collectionSymbol } = router.query;
  const [collectionName, setCollectionName] = useState('');
  const [listings, setListings] = useState([]);
  const [collectionTypes, setCollectionTypes] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to show per page

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    if (collectionSymbol) {
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_IP}/collection/${collectionSymbol}/attribute`;
      fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((result) => {
          setCollectionName(result.collectionInfo.collectionName);
          setCollectionTypes(result.collectionInfo.collectionType);
          setListings(result.listings);
        })
        .catch((error) => {
          console.error('Error fetching API data:', error);
        });
    }
  }, [collectionSymbol]);

  useEffect(() => {
    let data = listings;

    if (selectedType) {
      data = data.filter((item) => item.attribute.trait_type === selectedType);
    }

    if (searchTerm) {
      data = data.filter((item) =>
        item.attribute.value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(data);
  }, [selectedType, searchTerm, listings]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(filteredData.slice(startIndex, endIndex));
  }, [currentPage, filteredData]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6">{collectionName}</h1>
        <div className="flex justify-between items-center mb-6">
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded-lg"
          >
            <option value="">All Types</option>
            {collectionTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        
        <table className="min-w-full table-auto bg-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-left text-gray-300">
              <th className="px-6 py-4">Attribute</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Count</th>
              <th className="px-6 py-4">Floor Price (SOL)</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((listing, index) => (
              <tr key={index} className="text-gray-200">
                <td className="border-t border-gray-700 px-6 py-4">{listing.attribute.value}</td>
                <td className="border-t border-gray-700 px-6 py-4">{listing.attribute.trait_type}</td>
                <td className="border-t border-gray-700 px-6 py-4">{listing.count}</td>
                <td className="border-t border-gray-700 px-6 py-4">{listing.floor}</td>
              </tr>
            ))}
          </tbody>
        </table>

        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
