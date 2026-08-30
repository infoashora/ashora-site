type SectionDividerProps = {
  className?: string;
};

export default function SectionDivider({
  className = "",
}: SectionDividerProps) {
  return (
    <div
      className={`flex items-center justify-center gap-4 px-6 py-10 sm:gap-6 sm:py-12 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-20 bg-gradient-to-r from-transparent to-[#B99752]/70 sm:w-32" />

      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-[#B99752]"
        fill="none"
      >
        <path
          d="M12 3.5c.9 4.8 3.7 7.6 8.5 8.5-4.8.9-7.6 3.7-8.5 8.5-.9-4.8-3.7-7.6-8.5-8.5 4.8-.9 7.6-3.7 8.5-8.5Z"
          fill="currentColor"
        />
      </svg>

      <span className="h-px w-20 bg-gradient-to-l from-transparent to-[#B99752]/70 sm:w-32" />
    </div>
  );
}