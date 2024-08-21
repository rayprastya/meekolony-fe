import Image from 'next/image';

const Listing = ({ image, name, price, listStatus, onClick }) => {
  return (
    <div className="listing">
      <div className="relative w-full h-32" onClick={onClick}>
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="details mt-2">
        <h4 className="text-white text-sm font-semibold">{name}</h4>
        {listStatus === 'unlisted' ? (
          <p className="text-gray-400 text-xs">{listStatus}</p>
        ) : (
          <p className="text-purple-400 text-xs">{price} SOL</p>
        )}
      </div>
    </div>
  );
};

export default Listing;
