import type { Metadata } from 'next'
import Link from 'next/link'
import { getMessages, isValidLocale, defaultLocale, type Locale } from '@/lib/i18n'
import { services, BG } from '@/lib/siteData'
import { Section } from '@/components/Section'
import { PremiumHeading, Accent } from '@/components/PremiumHeading'
import { ScrollReveal } from '@/components/ScrollReveal'
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
    title: t.meta.servicesTitle,
    description: t.meta.servicesDescription,
    openGraph: { title: t.meta.servicesTitle, description: t.meta.servicesDescription },
  }
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale
  const t = getMessages(validLocale)

  const navItems = [
    { label: t.nav.home,     href: `/${validLocale}` },
    { label: t.nav.services, href: `/${validLocale}/services` },
    { label: t.nav.whoWeAre, href: `/${validLocale}/qui-sommes-nous` },
    { label: t.nav.contact,  href: `/${validLocale}/contact` },
  ]

  return (
    <>
      {/* ── Hero page ──────────────────────── */}
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
        <div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full border border-gold/8 pointer-events-none"
          aria-hidden="true"
        />
        <div className="container-main relative z-10 text-center">
          <span className="section-label text-gold/70">{t.services.pageOverline}</span>
          <PremiumHeading as="h1" size="page" color="light" className="mt-2 mb-6">
            {t.services.pageTitle1}{' '}
            <Accent>{t.services.pageTitle2}</Accent>
          </PremiumHeading>
          <div className="flex justify-center mb-6">
            <div className="w-12 h-px bg-gold/40" />
          </div>
          <p className="font-body text-white/55 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t.services.pageSubtitle}
          </p>
        </div>
      </section>

      {/* ── Grille 4 domaines ─────────────── */}
      <Section bg="mineral" slant="right" slantFill={BG.navy}>
        <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <article
              key={s.id}
              className="group bg-white rounded-2xl border border-black/[0.05] shadow-card p-8 sm:p-10 flex flex-col gap-6 hover:-translate-y-1 hover:shadow-premium transition-all duration-300"
            >
              {/* En-tête */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/[0.08] text-gold flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-gold/[0.14]">
                  <Icon name={s.icon} size={22} strokeWidth={1.5} />
                </div>
                <h2 className="font-body text-xl font-semibold text-ink leading-snug pt-1">
                  {t.services.items[i].title}
                </h2>
              </div>

              {/* Séparateur */}
              <div className="h-px bg-black/[0.06]" />

              {/* Bullets */}
              <ul className="flex flex-col gap-3">
                {t.services.items[i].bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" aria-hidden="true" />
                    <span className="font-body text-sm text-muted leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-auto">
                <Link
                  href={`/${validLocale}/services/${s.id}`}
                  className="inline-flex items-center gap-2 font-body text-sm font-semibold text-gold hover:gap-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                >
                  {t.services.discoverCta}
                  <Icon name="arrow" size={14} strokeWidth={2} />
                </Link>
              </div>
            </article>
          ))}
        </ScrollReveal>
      </Section>

      {/* ── Promesse ─────────────────────────── */}
      <Section bg="stone" slant="left" slantFill={BG.mineral}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="section-label">{t.services.promiseOverline}</span>
          <h2 className="section-title">{t.services.promiseTitle}</h2>
          <p className="section-subtitle mx-auto text-center mt-4">{t.services.promiseText}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link href={`/${validLocale}/contact`} className="btn-primary">
              {t.services.promiseCta1}
              <Icon name="arrow" size={16} strokeWidth={2} />
            </Link>
            <Link href={`/${validLocale}/qui-sommes-nous`} className="btn-outline">
              {t.services.promiseCta2}
            </Link>
          </div>
        </div>
      </Section>

      {/* ── Contact ──────────────────────────── */}
      <ContactBlock bg="cream" slant="right" slantFill={BG.stone} t={t.contact.form} />

      {/* ── Footer ───────────────────────────── */}
      <Footer locale={validLocale} t={t} navItems={navItems} slantFill={BG.cream} />
    </>
  )
}
