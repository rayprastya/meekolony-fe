import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const Modal = ({ nft, activitiesData, offersData, onClose }) => {
  const modalRef = useRef(null);
  const [activeTab, setActiveTab] = useState('details');

  if (!nft) return null;

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={modalRef} className="bg-gray-900 p-6 rounded-lg w-full max-w-6xl h-[100vh] overflow-auto text-white relative">
        <div className="flex space-x-4 mb-6">
          <button 
            className={`px-4 py-2 ${activeTab === 'details' ? 'bg-gray-800 text-white' : 'bg-gray-700 text-gray-400'}`} 
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'activities' ? 'bg-gray-800 text-white' : 'bg-gray-700 text-gray-400'}`} 
            onClick={() => setActiveTab('activities')}
          >
            Activities
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'offers' ? 'bg-gray-800 text-white' : 'bg-gray-700 text-gray-400'}`} 
            onClick={() => setActiveTab('offers')}
          >
            Offers
          </button>
        </div>

        {activeTab === 'details' && (
          <div className="flex">
            <div className="w-1/2 p-4">
              <Image 
                src={nft.image} 
                alt={nft.name} 
                width={300} 
                height={300} 
                className="rounded-lg" 
              />
            </div>

            <div className="w-1/2 p-4">
              <h2 className="text-2xl font-bold mb-4">{nft.name}</h2>
              <p className="mb-2"><strong>Owner:</strong> {nft.owner}</p>
              <p className="mb-2"><strong>Collection:</strong> {nft.collectionName}</p>
              <p className="mb-2"><strong>Price:</strong> {nft.price} SOL</p>
              <p className="mb-2"><strong>Mint Address:</strong> {nft.mintAddress}</p>

            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full table-auto bg-gray-800 rounded-lg">
              <thead>
                <tr className="bg-gray-700 text-left text-gray-300">
                  <th className="px-6 py-4">Signature</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Seller</th>
                </tr>
              </thead>
              <tbody>
                {activitiesData.map((activity, index) => (
                  <tr key={index} className="text-gray-200">
                    <td className="border-t border-gray-700 px-6 py-4">{activity.type}</td>
                    <td className="border-t border-gray-700 px-6 py-4">{activity.tokenMint}</td>
                    <td className="border-t border-gray-700 px-6 py-4">{activity.price}</td>
                    <td className="border-t border-gray-700 px-6 py-4">{activity.seller}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'offers' && (
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full table-auto bg-gray-800 rounded-lg">
              <thead>
                <tr className="bg-gray-700 text-left text-gray-300">
                  <th className="px-6 py-4">PDA Address</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Buyer</th>
                  <th className="px-6 py-4">Expiry</th>
                </tr>
              </thead>
              <tbody>
                {offersData.map((offer, index) => (
                  <tr key={index} className="text-gray-200">
                    <td className="border-t border-gray-700 px-6 py-4">{offer.pdaAddress}</td>
                    <td className="border-t border-gray-700 px-6 py-4">{offer.price}</td>
                    <td className="border-t border-gray-700 px-6 py-4">{offer.buyer}</td>
                    <td className="border-t border-gray-700 px-6 py-4">{new Date(offer.expiry * 1000).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
