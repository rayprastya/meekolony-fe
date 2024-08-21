import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SearchBar from '../../../components/SearchBar';
import Pagination from '../../../components/Pagination';
import HolderTable from '../../../components/HolderTable';

export default function TopHolder() {
  const router = useRouter();
  const { collectionSymbol, holderBy } = router.query;

  const [listings, setListings] = useState([]);
  const [topByVolumeHolders, setTopByVolumeHolders] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (holderBy === 'volume') {
          const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_IP}/collection/${collectionSymbol}/holder-by-volume`;
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const result = await response.json();
          setTopByVolumeHolders(result);
        } else {
          const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_IP}/collection/${collectionSymbol}/holder-stats`;
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const result = await response.json();
          setListings(result.topHolders);
        }
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    };

    if (collectionSymbol) {
      fetchData();
    }
  }, [collectionSymbol, holderBy]);

  useEffect(() => {
    let data = holderBy === 'volume' ? topByVolumeHolders : listings;

    if (searchTerm) {
      data = data.filter(item =>
        item.owner.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(data);
  }, [searchTerm, listings, topByVolumeHolders, holderBy]);

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

        <div className="mb-6">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        <HolderTable
          title={holderBy === 'volume' ? 'Top Holders by Volume' : 'Top Holders'}
          holders={paginatedData}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
