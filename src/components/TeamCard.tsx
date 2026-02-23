interface TeamCardProps {
  name: string
  role: string
  bio: string
  initials: string
  quote?: string
}

export function TeamCard({ name, role, bio, initials, quote }: TeamCardProps) {
  return (
    <div>
      {/* Avatar — cercle minimaliste, grandes initiales */}
      <div
        className="w-20 h-20 rounded-full bg-primary-50 border border-primary-100 text-primary-500 flex items-center justify-center font-display text-2xl font-light mb-6"
        aria-hidden="true"
      >
        {initials}
      </div>

      <h3 className="font-body text-xl font-semibold text-navy mb-1">{name}</h3>
      <p className="font-body text-xs text-gold font-medium tracking-wide mb-4">{role}</p>
      <p className="font-body text-sm text-muted leading-relaxed mb-5">{bio}</p>

      {/* Citation personnelle */}
      {quote && (
        <blockquote className="border-l-2 border-gold/40 pl-4">
          <p className="font-display italic text-[0.875rem] text-muted/80 leading-relaxed">
            &ldquo;{quote}&rdquo;
          </p>
        </blockquote>
      )}
    </div>
  )
}
