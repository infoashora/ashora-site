import Image from "next/image";

type EditorialLifestyleProps = {
  image: string;
  alt: string;
};

export default function EditorialLifestyle({
  image,
  alt,
}: EditorialLifestyleProps) {
  return (
    <section
      aria-label="Editorial candle imagery"
      className="mx-auto w-full max-w-7xl px-6 pb-20 pt-8 sm:pb-24 sm:pt-10 lg:pb-28 lg:pt-12"
    >
      <div className="relative overflow-hidden">
        <div className="relative h-[420px] sm:h-[500px] lg:h-[600px] xl:h-[640px]">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1400px) 92vw, 1320px"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}