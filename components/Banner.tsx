// components/Banner.tsx
import Link from 'next/link';

export default function Banner() {
  return (
    <Link href="/" passHref>
      <header className="relative bg-black overflow-hidden cursor-pointer h-[20rem] sm:h-[24rem] md:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
        <img
          src="/pictures/tinywow_autismandme_dog_83364618.jpg?v=autorefresh1"
          alt="Autism and Me banner - New Banner Dog"
          className="absolute inset-0 w-full h-full object-contain object-center"
          loading="eager"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            if (!img.dataset.fallback) {
              img.dataset.fallback = '1';
              img.src = '/pictures/neon-dog.jpg?v=autorefresh4';
            }
          }}
        />
      </header>
    </Link>
  );
}
