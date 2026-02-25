import Image from 'next/image'
import Link from 'next/link'
import { contactInfo, BG } from '@/lib/siteData'
import { Section } from '@/components/Section'
import { PremiumHeading, Accent } from '@/components/PremiumHeading'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { Icon } from '@/lib/icons'
import type { Locale, Messages } from '@/lib/i18n'

interface NavItem {
  label: string
  href: string
}

interface ServicePageProps {
  locale: Locale
  t: Messages
  serviceIndex: number
  navItems: NavItem[]
}

function parseLine(text: string) {
  const sep = text.indexOf(' — ')
  return sep >= 0
    ? { title: text.slice(0, sep), desc: text.slice(sep + 3) }
    : { title: text, desc: '' }
}

export function ServicePage({ locale, t, serviceIndex, navItems }: ServicePageProps) {
  const service = t.services.items[serviceIndex]

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-16">

        {/* Photo immeuble — plein fond, focus bas-droite, fondu gauche fort */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <Image
            src="/images/hero-section-image.png"
            alt=""
            fill
            className="object-cover object-right-bottom"
            priority
          />
          {/* Dégradé : navy opaque à gauche (texte lisible) → image visible à droite */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy from-[45%] via-navy/80 to-navy/20" />
          {/* Fondu bas pour transition douce avec la section suivante */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-navy to-transparent" />
        </div>

        <div className="container-main relative z-10">
          <div className="max-w-lg">

            {/* Retour services */}
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-1.5 font-body text-xs text-white/40 hover:text-white/65 transition-colors duration-200 mb-8 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
            >
              <Icon name="chevron" size={12} strokeWidth={2.5} className="-rotate-90" />
              {t.nav.services}
            </Link>

            <span className="block section-label text-gold/70 mb-3">{t.services.pageOverline}</span>

            <PremiumHeading as="h1" size="page" color="light" className="mb-5">
              {service.heroTitle1} <Accent>{service.heroTitle2}</Accent>
            </PremiumHeading>

            <p className="font-body text-white/60 text-base sm:text-lg leading-relaxed mb-8">
              {service.heroIntro}
            </p>

            {/* CTA — inline-flex autonome, aucun wrapper flex parent */}
            <Link href={`/${locale}/contact`} className="btn-primary">
              {t.cta.button}
              <Icon name="arrow" size={16} strokeWidth={2} aria-hidden="true" />
            </Link>

          </div>
        </div>
      </section>

      {/* ── Ce que nous prenons en charge ────────────────── */}
      <Section bg="cream" slant="right" slantFill={BG.navy}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <span className="section-label">{t.services.pageOverline}</span>
            <h2 className="section-title">{t.services.chargeTitle}</h2>
          </div>

          <div>
            {service.bullets.map((bullet, i) => {
              const { title, desc } = parseLine(bullet)
              return (
                <div
                  key={i}
                  className="flex items-start gap-6 py-6 border-b border-primary-100/50 last:border-b-0"
                >
                  <span
                    className="font-body text-[11px] font-semibold tracking-[0.12em] text-gold/60 mt-0.5 w-5 shrink-0 select-none"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-body font-semibold text-navy text-base leading-snug">{title}</h3>
                    {desc && (
                      <p className="font-body text-sm text-muted leading-relaxed mt-1">{desc}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Section>

      {/* ── Pour qui ─────────────────────────────────────── */}
      <Section bg="stone" slant="left" slantFill={BG.cream}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <span className="section-label">{t.services.pageOverline}</span>
            <h2 className="section-title">{t.services.forWhoTitle}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-0">
            {service.forWho.map((item, i) => {
              const { title, desc } = parseLine(item)
              return (
                <div
                  key={i}
                  className="py-5 border-b border-primary-200/40 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
                >
                  <h3 className="font-body font-semibold text-navy text-sm mb-1">{title}</h3>
                  {desc && (
                    <p className="font-body text-xs text-muted leading-relaxed">{desc}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </Section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <Section bg="cream" slant="right" slantFill={BG.stone}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="section-title mb-4">
            {t.cta.titleMain}{' '}
            <span className="italic text-gold">{t.cta.titleAccent}</span>
          </h2>
          <p className="font-body text-muted text-base leading-relaxed mb-8 max-w-sm mx-auto">
            {t.cta.subtitle}
          </p>
          <Link href={`/${locale}/contact`} className="btn-primary">
            {t.cta.button}
            <Icon name="arrow" size={16} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </Section>

      {/* ── Contact ───────────────────────────────────────── */}
      <Section bg="stone" slant="left" slantFill={BG.cream} id="contact">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_272px] gap-10 lg:gap-16 items-start">

          {/* Formulaire */}
          <div>
            <div className="mb-8">
              <span className="section-label">{t.contact.form.overline}</span>
              <h2 className="section-title">{t.contact.form.title}</h2>
              <p className="font-body text-sm text-muted mt-3 leading-relaxed max-w-md">
                {t.contact.form.subtitle}
              </p>
            </div>
            <ContactForm t={t.contact.form} variant="compact" />
          </div>

          {/* Sidebar coordonnées */}
          <aside className="lg:pt-[6.5rem]">
            <div className="space-y-7">

              <div>
                <p className="font-body text-[10px] tracking-[0.14em] uppercase font-semibold text-muted/55 mb-3">
                  {t.contact.directContact}
                </p>
                <p className="font-body font-semibold text-navy text-sm">{contactInfo.contact}</p>
                <p className="font-body text-xs text-muted mt-0.5">{contactInfo.role}</p>
              </div>

              <div className="w-8 h-px bg-primary-200/60" aria-hidden="true" />

              <div>
                <p className="font-body text-[10px] tracking-[0.14em] uppercase font-semibold text-muted/55 mb-1.5">
                  {t.contact.phoneLabel}
                </p>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="font-body text-sm text-navy hover:text-gold transition-colors duration-150"
                >
                  {contactInfo.phone}
                </a>
              </div>

              <div>
                <p className="font-body text-[10px] tracking-[0.14em] uppercase font-semibold text-muted/55 mb-1.5">
                  {t.contact.emailLabel}
                </p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="font-body text-sm text-navy hover:text-gold transition-colors duration-150 break-all"
                >
                  {contactInfo.email}
                </a>
              </div>

              <div className="w-8 h-px bg-primary-200/60" aria-hidden="true" />

              <div>
                <p className="font-body text-[10px] tracking-[0.14em] uppercase font-semibold text-muted/55 mb-1.5">
                  {t.contact.responseDelay}
                </p>
                <p className="font-body text-xs text-muted leading-relaxed">{t.contact.form.trustLine}</p>
                <p className="font-body text-xs text-muted mt-1">{t.contact.hours}</p>
              </div>

            </div>
          </aside>
        </div>
      </Section>

      {/* ── Footer ───────────────────────────────────────── */}
      <Footer locale={locale} t={t} navItems={navItems} slantFill={BG.stone} />
    </>
  )
}
