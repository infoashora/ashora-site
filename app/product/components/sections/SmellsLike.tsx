type FragranceNote = {
  label: string;
  name: string;
};

type SmellsLikeProps = {
  eyebrow?: string;
  heading: string;
  notes: FragranceNote[];
  paragraphs: string[];
};

export default function SmellsLike({
  eyebrow = "Smells Like",
  heading,
  notes,
  paragraphs,
}: SmellsLikeProps) {
  return (
    <section
      id="smells-like"
      className="scroll-mt-28 border-y border-white/10 bg-[#161616] text-[#F8F5EF]"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#D7BD82]">
              {eyebrow}
            </p>

            <h2 className="mt-5 max-w-xl font-cormorant text-4xl font-medium leading-tight tracking-[-0.02em] text-[#F8F5EF] sm:text-5xl">
              {heading}
            </h2>

            <div className="mt-8 h-px w-24 bg-[#B99752]" />
          </div>

          <div>
            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
              {notes.map((note) => (
                <article
                  key={`${note.label}-${note.name}`}
                  className="min-h-52 bg-[#161616] p-6 transition duration-300 hover:bg-[#1D1D1D] sm:p-8"
                >
                  <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#D7BD82]">
                    {note.label}
                  </p>

                  <h3 className="mt-10 font-cormorant text-3xl font-medium leading-tight text-[#F8F5EF] sm:text-4xl">
                    {note.name}
                  </h3>

                  <div className="mt-8 h-px w-10 bg-[#B99752]" />
                </article>
              ))}
            </div>

            <div className="mt-12 max-w-3xl space-y-7">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-8 text-[#D8D3CA] sm:text-lg sm:leading-9"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}