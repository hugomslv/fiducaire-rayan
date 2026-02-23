import type { Messages } from '@/lib/i18n'
import { activityDomains } from '@/lib/siteData'
import { PremiumHeading } from '@/components/PremiumHeading'
import { ActivityCard } from '@/components/ActivityCard'

interface ActivityDomainsSectionProps {
  t: Messages
}

export function ActivityDomainsSection({ t }: ActivityDomainsSectionProps) {
  return (
    <section className="bg-navy rounded-3xl pt-20 sm:pt-24 pb-20 sm:pb-24 overflow-hidden">
      <div className="container-main">

        {/* ── Header 2 colonnes ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-14 lg:mb-16">

          {/* Gauche — overline + titre */}
          <div>
            <span className="section-label text-gold/80">
              {t.activity.overline}
            </span>
            <PremiumHeading as="h2" size="section" color="light">
              {t.activity.title}
            </PremiumHeading>
          </div>

          {/* Droite — description */}
          <div className="flex lg:items-end">
            <p className="font-body text-base sm:text-lg text-white/55 leading-relaxed max-w-lg">
              {t.activity.description}
            </p>
          </div>

        </div>

        {/* ── Grille 4 cards ─────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {activityDomains.map((domain) => (
            <ActivityCard
              key={domain.id}
              icon={domain.icon}
              title={t.activity.items[domain.id].title}
              description={t.activity.items[domain.id].description}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
