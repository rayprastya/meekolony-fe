import Image from 'next/image';
import Link from 'next/link';

export default function HolderTable({ title, holders, pageUrl }) {

  const hasTotalVol = holders.length > 0 && holders[0].totalVol !== undefined;

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mx-auto max-w-3xl mt-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Avatar</th>
            <th className="px-4 py-2">Owner</th>
            <th className="px-4 py-2">{hasTotalVol ? "Total Volume" : "Tokens"}</th>
          </tr>
        </thead>
        <tbody>
          {holders.map((holder, index) => (
            <tr key={index} className="border-t border-gray-700">
              <td className="px-4 py-2">
                <div className="relative h-10 w-10">
                  <Image
                    src={holder.avatarMintImg || "/default-avatar.png"}
                    alt="Avatar"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
              </td>
              <td className="px-4 py-2">{holder.ownerDisplay?.sol || holder.owner}</td>
              <td className="px-4 py-2">{holder.tokens || holder.totalVol}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {pageUrl && (
        <div className="mt-4 text-center">
          <Link
            href={pageUrl}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600"
          >
            See Full Data
          </Link>
        </div>
      )}
    </div>
  );
}
