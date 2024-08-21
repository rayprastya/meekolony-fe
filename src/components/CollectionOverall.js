export default function CollectionOverall({ data }) {
    return (
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mx-auto max-w-md mt-8">
        <h2 className="text-xl font-semibold mb-4">Tatsumeeko: Meekolony Pass</h2>
        <p>Floor Price: {data.floorPrice} Sol</p>
        <p>Listed Count: {data.listedCount}</p>
        <p>Average Price in 24hr: {data.avgPrice24hr} Sol</p>
        <p>Volume All: {data.volumeAll} Sol</p>
      </div>
    );
  }
  