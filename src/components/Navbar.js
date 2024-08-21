import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex items-center justify-between relative z-10">
      <Link href="/" className="text-xl font-bold">
        Magic Eden | Tatsumeeko
      </Link>
      <div className="relative group">
        <button className="flex items-center text-lg hover:text-purple-500">
          Meekolony
          <svg
            className="w-3 h-3 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l4 4 4-4"
            />
          </svg>
        </button>
        <div className="absolute right-0 top-full mt-2 bg-gray-800 text-white rounded-lg shadow-lg w-48 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:visible z-20">
          <ul className="py-2">
            <li>
              <Link href="/marketplace/meekolony" className="block px-4 py-2 hover:bg-gray-700">
                Listings
              </Link>
            </li>
            <li>
              <Link href="/marketplace/meekolony/top-holder" className="block px-4 py-2 hover:bg-gray-700">
                Top Holders
              </Link>
            </li>
            <li>
              <Link href="/marketplace/meekolony/top-holder?holderBy=volume" className="block px-4 py-2 hover:bg-gray-700">
                Top Holders By Volume
              </Link>
            </li>
            <li>
              <Link href="/marketplace/meekolony/attribute" className="block px-4 py-2 hover:bg-gray-700">
                Attribute
              </Link>
            </li>
            <li>
              <Link href="/marketplace/meekolony/activity" className="block px-4 py-2 hover:bg-gray-700">
                Sale Activity
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex space-x-6">
        <Link href="/u/find-user" className="hover:text-purple-500">
          Find User
        </Link>
      </div>
      <div className="text-sm">| USER Placeholder |</div>
    </nav>
  );
};

export default Navbar;
