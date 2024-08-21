import Image from 'next/image';

export default function Header() {
  return (
    <div className="relative flex justify-center items-center py-4 h-16 w-full">
      <div className="relative w-48 h-16">
        <Image
          src="/assets/img/tatsumeeko-logo.png"
          alt="Logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
}
