type Review = {
  name: string;
  location?: string;
  review: string;
};

type ReviewSectionProps = {
  eyebrow?: string;
  heading: string;
  introduction?: string;
  reviews: Review[];
};

export default function ReviewSection({
  eyebrow = "Reviews",
  heading,
  introduction,
  reviews,
}: ReviewSectionProps) {
  return (
    <section
      id="reviews"
      className="scroll-mt-28 bg-[#FCFBF8]"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#B99752]">
            {eyebrow}
          </p>

          <h2 className="mt-5 font-cormorant text-4xl font-medium leading-tight tracking-[-0.02em] text-zinc-900 sm:text-5xl">
            {heading}
          </h2>

          <div className="mt-8 h-px w-24 bg-[#B99752]" />

          {introduction && (
            <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg sm:leading-9">
              {introduction}
            </p>
          )}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <article
              key={`${review.name}-${index}`}
              className="flex h-full flex-col justify-between border border-zinc-200 bg-white p-8 transition duration-300 hover:border-[#B99752]/50 hover:shadow-[0_20px_45px_rgba(24,24,27,0.06)]"
            >
              <div>
                <div className="flex items-center gap-1 text-[#B99752]">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <svg
                      key={star}
                      viewBox="0 0 24 24"
                      className="h-4 w-4 fill-current"
                      aria-hidden="true"
                    >
                      <path d="M12 2.5 14.9 8.4l6.5.9-4.7 4.6 1.1 6.5L12 17.4 6.2 20.4l1.1-6.5L2.6 9.3l6.5-.9L12 2.5Z" />
                    </svg>
                  ))}
                </div>

                <p className="mt-8 text-base leading-8 text-zinc-600">
                  “{review.review}”
                </p>
              </div>

              <div className="mt-10 border-t border-zinc-200 pt-5">
                <p className="font-cormorant text-2xl font-medium text-zinc-900">
                  {review.name}
                </p>

                {review.location && (
                  <p className="mt-1 text-sm tracking-wide text-zinc-500">
                    {review.location}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}