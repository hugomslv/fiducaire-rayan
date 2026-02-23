interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  initials: string
}

export function TestimonialCard({ quote, author, role, initials }: TestimonialCardProps) {
  return (
    <article
      className="group relative flex flex-col gap-6 bg-white rounded-[28px] p-9 sm:p-10
                 shadow-premium overflow-hidden
                 transition-all duration-300 ease-out
                 hover:-translate-y-1.5 hover:shadow-premium-hover"
    >
      {/* Guillemet décoratif géant — derrière le texte */}
      <span
        className="absolute -top-3 -left-1 font-display text-[9rem] leading-none text-gold/[0.07] select-none pointer-events-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Citation */}
      <blockquote className="relative flex-1">
        <p className="font-display font-light italic text-[1.0625rem] text-ink/75 leading-[1.74]">
          {quote}
        </p>
      </blockquote>

      {/* Trait doré — s'allonge au hover */}
      <div
        className="h-px w-8 bg-gold/35 rounded-full transition-all duration-500 ease-out
                   group-hover:w-14 group-hover:bg-gold/60"
        aria-hidden="true"
      />

      {/* Auteur */}
      <footer className="flex items-center gap-3.5">
        <div
          className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center
                     font-body text-[11px] font-semibold tracking-[0.08em] flex-shrink-0"
          aria-hidden="true"
        >
          {initials}
        </div>
        <div>
          <p className="font-body text-sm font-semibold text-navy leading-snug">{author}</p>
          <p className="font-body text-xs text-muted mt-0.5">{role}</p>
        </div>
      </footer>
    </article>
  )
}
