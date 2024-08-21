import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Listing from '../../components/Listing';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';

export default function UserDisplay() {
  const router = useRouter();
  const { walletAddress } = router.query;

  const [apiResponse, setApiResponse] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [user, setUser] = useState({ photo: '', walletNumber: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [selectedNFTActivity, setSelectedNFTActivity] = useState(null);
  const [selectedNFTOffer, setSelectedNFTOffer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUserData = useCallback(async () => {
    if (!walletAddress) return;
    
    try {
      const userResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/user/${walletAddress}`);
      const userData = await userResponse.json();
      setUser({
        photo: userData.profilePict,
        walletNumber: formatWalletAddress(walletAddress),
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [walletAddress]);

  const fetchUserAssets = useCallback(async () => {
    if (!walletAddress) return;

    try {
      const assetsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/user/${walletAddress}/assets`);
      const assetsData = await assetsResponse.json();
      setApiResponse(assetsData);
      setFilteredData(assetsData);
    } catch (error) {
      console.error('Error fetching user assets:', error);
    }
  }, [walletAddress]);

  const fetchNFTDetails = async (tokenAddress) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/token/${tokenAddress}`);
      const data = await response.json();
      setSelectedNFT(data);
      await fetchNFTActivities(tokenAddress);
      await fetchNFTOffers(tokenAddress);
      
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching NFT details:', error);
    }
  };

  const fetchNFTActivities = async (tokenAddress) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/token/${tokenAddress}/activities`);
      const data = await response.json();
      setSelectedNFTActivity(data);
    } catch (error) {
      console.error('Error fetching NFT details:', error);
    }
  };

  const fetchNFTOffers = async (tokenAddress) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/token/${tokenAddress}/offers`);
      const data = await response.json();
      setSelectedNFTOffer(data);
    } catch (error) {
      console.error('Error fetching NFT details:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUserAssets();
  }, [fetchUserData, fetchUserAssets]);

  useEffect(() => {
    let data = apiResponse;

    if (searchTerm) {
      data = data.filter(item =>
        item.collectionName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filter === 'meekolony') {
      data = data.filter(item => item.collection.toLowerCase() === 'meekolony');
    }

    setFilteredData(data);
  }, [searchTerm, filter, apiResponse]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData]);

  const formatWalletAddress = (address) => {
    return address.length > 14
      ? `${address.slice(0, 6)}...${address.slice(-6)}`
      : address;
  };

  const handleSearchChange = (term) => setSearchTerm(term);
  const handlePageChange = (page) => setCurrentPage(page);

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto p-6 relative">
        <div className="user-card absolute top-0 left-0 p-4 bg-gray-800 rounded-lg shadow-lg flex items-center space-x-4 z-10">
          <div className="w-16 h-16 bg-gray-600 rounded-full flex">
            <Image
              src={user.photo}
              alt="User Photo"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div className="ml-4">
            <p className="text-white font-semibold">{user.walletNumber}</p>
          </div>
        </div>

        <div className="flex flex-col mb-6 max-w-md mx-auto mt-20">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <div className="filter-buttons flex space-x-4 mb-6">
            {['all', 'meekolony'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  filter === type ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {paginatedData.length > 0 ? (
            <>
              <div className="listings">
                {paginatedData.map((item) => (
                  <Listing
                    key={item.id}
                    image={item.image}
                    name={item.collectionName}
                    price={item.price}
                    listStatus={item.listStatus}
                    onClick={() => fetchNFTDetails(item.mintAddress)}
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
            <p className="text-center text-gray-500 mt-6">No data found.</p>
          )}
        </div>
      </div>

      {showModal && <Modal nft={selectedNFT} activitiesData={selectedNFTActivity} offersData={selectedNFTOffer} onClose={() => setShowModal(false)} />}
    </div>
  );
}
