import Header from '../components/Header';
import CollectionOverall from '../components/CollectionOverall';
import Histogram from '../components/Histogram';
import HolderTable from '../components/HolderTable';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [collectionData, setcollectionData] = useState({});
  const [histogramData, setHistogramData] = useState([]);
  const [distributionData, setDistributionData] = useState({});
  const [topHolders, setTopHolders] = useState([]);
  const [topByVolumeHolders, setTopByVolumeHolders] = useState([]);

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_IP}/collection/meekolony`;
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setcollectionData(result);
      })
      .catch((error) => {
        console.error('Error fetching API data:', error);
      });
  }, []);

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_IP}/collection/meekolony/holder-stats`;
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setHistogramData(result.tokenHistogram.bars);
        setTopHolders(result.topHolders.slice(0, 10));
        setDistributionData({
          uniqueHolders: result.uniqueHolders,
          totalSupply: result.totalSupply,
        });
      })
      .catch((error) => {
        console.error('Error fetching API data:', error);
      });
  }, []);

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_IP}/collection/meekolony/holder-by-volume`;
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setTopByVolumeHolders(result.slice(0, 10));
      })
      .catch((error) => {
        console.error('Error fetching API data:', error);
      });
  }, []);

  const holderPageUrl = '/marketplace/meekolony/top-holder';
  const volumeHolderPageUrl = '/marketplace/meekolony/top-holder?holderBy=volume';

  return (
    <div className="bg-gray-900 text-white">
      <Header />
      <CollectionOverall data={collectionData} />
      <Histogram data={histogramData} supply={distributionData} />
      <HolderTable
        title="Top 10 Holders"
        holders={topHolders}
        pageUrl={holderPageUrl}
      />
      <HolderTable
        title="Top 10 by Volume Holders"
        holders={topByVolumeHolders}
        pageUrl={volumeHolderPageUrl}
      />
    </div>
  );
}
