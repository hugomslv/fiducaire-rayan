import type { Metadata } from 'next'
import Link from 'next/link'
import { getMessages, isValidLocale, defaultLocale, type Locale } from '@/lib/i18n'
import { BG } from '@/lib/siteData'
import { Section } from '@/components/Section'
import { PremiumHeading, Accent } from '@/components/PremiumHeading'
import { ContactBlock } from '@/components/ContactBlock'
import { Footer } from '@/components/Footer'
import { Icon } from '@/lib/icons'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getMessages(isValidLocale(locale) ? locale : defaultLocale)
  return {
    title: t.meta.adminTitle,
    description: t.meta.adminDescription,
    openGraph: { title: t.meta.adminTitle, description: t.meta.adminDescription },
  }
}

export default async function GestionAdministrativePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale
  const t = getMessages(validLocale)
  const service = t.services.items[2]

  const navItems = [
    { label: t.nav.home,     href: `/${validLocale}` },
    { label: t.nav.services, href: `/${validLocale}/services` },
    { label: t.nav.whoWeAre, href: `/${validLocale}/qui-sommes-nous` },
    { label: t.nav.contact,  href: `/${validLocale}/contact` },
  ]

  return (
    <>
      {/* ── Hero ───────────────────────────── */}
      <section className="relative bg-navy overflow-hidden pt-36 pb-20 sm:pt-48 sm:pb-24">
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" aria-hidden="true">
          <div
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
        <div className="absolute -top-20 right-0 w-72 h-72 rounded-full border border-gold/8 pointer-events-none" aria-hidden="true" />
        <div className="container-main relative z-10 text-center">
          <Link
            href={`/${validLocale}/services`}
            className="inline-flex items-center gap-1.5 font-body text-xs text-white/40 hover:text-white/70 transition-colors duration-200 mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
          >
            <Icon name="chevron" size={12} strokeWidth={2.5} className="-rotate-90" />
            {t.nav.services}
          </Link>
          <span className="block section-label text-gold/70 mb-2">{t.services.pageOverline}</span>
          <PremiumHeading as="h1" size="page" color="light" className="mb-6">
            {service.heroTitle1} <Accent>{service.heroTitle2}</Accent>
          </PremiumHeading>
          <div className="flex justify-center mb-6">
            <div className="w-12 h-px bg-gold/40" />
          </div>
          <p className="font-body text-white/55 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {service.heroIntro}
          </p>
        </div>
      </section>

      {/* ── Ce que nous prenons en charge ─── */}
      <Section bg="cream" slant="right" slantFill={BG.navy}>
        <div className="max-w-3xl mx-auto">
          <span className="section-label">{t.services.pageOverline}</span>
          <h2 className="section-title mb-10">{t.services.chargeTitle}</h2>
          <ul className="flex flex-col gap-5">
            {service.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-4 bg-white rounded-xl border border-black/[0.05] shadow-card p-6">
                <div className="w-8 h-8 rounded-lg bg-gold/[0.10] text-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="check" size={16} strokeWidth={2} />
                </div>
                <span className="font-body text-base text-ink leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── Pour qui ? ─────────────────────── */}
      <Section bg="mineral" slant="left" slantFill={BG.cream}>
        <div className="max-w-3xl mx-auto">
          <span className="section-label">{t.services.pageOverline}</span>
          <h2 className="section-title mb-10">{t.services.forWhoTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.forWho.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-white rounded-xl border border-black/[0.05] shadow-card p-5"
              >
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" aria-hidden="true" />
                <span className="font-body text-sm text-muted leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CTA ────────────────────────────── */}
      <Section bg="cream" slant="right" slantFill={BG.mineral}>
        <div className="max-w-2xl mx-auto text-center">
          <span className="section-label">{t.cta.overline}</span>
          <h2 className="section-title mb-4">
            {t.cta.titleMain} <span className="italic text-gold">{t.cta.titleAccent}</span>
          </h2>
          <p className="section-subtitle mx-auto text-center mb-8">{t.cta.subtitle}</p>
          <Link href={`/${validLocale}/contact`} className="btn-primary">
            {t.cta.button}
            <Icon name="arrow" size={16} strokeWidth={2} />
          </Link>
        </div>
      </Section>

      {/* ── Contact ────────────────────────── */}
      <ContactBlock bg="stone" slant="left" slantFill={BG.cream} t={t.contact.form} />

      {/* ── Footer ─────────────────────────── */}
      <Footer locale={validLocale} t={t} navItems={navItems} slantFill={BG.stone} />
    </>
  )
}
