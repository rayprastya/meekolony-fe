import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Listing from '../../../components/Listing';
import SearchBar from '../../../components/SearchBar';
import Pagination from '../../../components/Pagination';

export default function Marketplace() {
  const router = useRouter();
  const { collectionSymbol } = router.query;
  const [collectionName, setCollectionName] = useState('');
  const [listingCount, setListingCount] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [listing, setListing] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14; 

  const fetchData = useCallback(async () => {
    if (collectionSymbol) {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_IP}/collection/${collectionSymbol}/listing`;
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const result = await response.json();
        setCollectionName(result.collectionInfo.collectionName);
        setListingCount(result.collectionInfo.listingCount);
        setListing(result.listings);
        setFilteredData(result.listings);
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    }
  }, [collectionSymbol]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    let data = listing;

    if (searchTerm) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(data);
  }, [searchTerm, listing]);

  const totalPages = Math.ceil(listingCount / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto p-6 relative">
        <div className="user-card absolute top-0 left-0 p-4 bg-gray-800 rounded-lg shadow-lg flex items-center space-x-4 z-10">
          <div className="ml-4">
            <p className="text-white font-semibold">{collectionName}</p>
          </div>
        </div>

        <div className="flex flex-col mb-6 max-w-md mx-auto mt-20">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        {currentItems.length > 0 ? (
          <>
            <div className="listings">
              {currentItems.map((item) => (
                <Listing
                  key={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  listStatus={item.listStatus}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <h1 className="text-center font-bold text-2xl text-gray-400">No Items</h1>
            <h3 className="text-center text-xl text-gray-600">
              You can start looking for some collections
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
