import { Icon } from '@/lib/icons'
import type { IconName } from '@/lib/siteData'

interface ActivityCardProps {
  icon: IconName
  title: string
  description: string
}

export function ActivityCard({ icon, title, description }: ActivityCardProps) {
  return (
    <article className="
      group flex flex-col gap-6 p-7
      rounded-2xl
      bg-white/[0.04] border border-white/[0.08]
      transition-all duration-300
      hover:bg-white/[0.07] hover:border-white/[0.14] hover:-translate-y-1
    ">
      {/* Icône */}
      <div className="
        inline-flex items-center justify-center
        w-11 h-11 rounded-xl
        bg-gold/[0.08] border border-gold/[0.15]
        transition-colors duration-300
        group-hover:bg-gold/[0.14] group-hover:border-gold/[0.25]
      ">
        <Icon name={icon} size={20} className="text-gold" strokeWidth={1.5} />
      </div>

      {/* Texte */}
      <div className="flex flex-col gap-2.5">
        <div className="h-px w-7 bg-gold/35 rounded-full transition-all duration-500 group-hover:w-12 group-hover:bg-gold/60" />
        <h3 className="font-display text-xl font-light text-white leading-snug tracking-[-0.01em]">
          {title}
        </h3>
        <p className="font-body text-sm text-white/50 leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  )
}
