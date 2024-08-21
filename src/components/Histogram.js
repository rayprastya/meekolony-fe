import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function Histogram({ data, supply }) {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mx-auto max-w-3xl mt-8">
      <h2 className="text-xl font-semibold mb-4">Unique Holder Distribution</h2>
      <h2 className="text-xl font-semibold mb-4">Total Supply : {supply.totalSupply}</h2>
      <h2 className="text-xl font-semibold mb-4">Unique Holder : {supply.uniqueHolders}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="l_val" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="hight" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
