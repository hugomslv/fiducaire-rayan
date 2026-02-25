import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getMessages, isValidLocale, defaultLocale, type Locale } from '@/lib/i18n'
import { services, BG } from '@/lib/siteData'
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
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <Image
            src="/images/hero-section-image.png"
            alt=""
            fill
            className="object-cover object-right-bottom"
            priority
          />
          <div className="absolute inset-0 bg-navy/80" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-navy to-transparent" />
        </div>
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

      {/* ── Grille 4 domaines avec illustrations ── */}
      <Section bg="cream" slant="right" slantFill={BG.navy}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <article
              key={s.id}
              className="group bg-white rounded-2xl border border-black/[0.05] shadow-card flex flex-col overflow-hidden hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Illustration */}
              <div className="relative h-52 bg-primary-50/40 overflow-hidden">
                <Image
                  src={`/images/services/${s.id}.png`}
                  alt={t.services.items[i].title}
                  fill
                  sizes="(max-width: 640px) 92vw, 45vw"
                  className="object-contain p-6"
                  priority={i < 2}
                />
              </div>

              {/* Contenu */}
              <div className="flex flex-col gap-4 p-7 flex-1">
                {/* En-tête : icône + titre */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gold/[0.08] text-gold flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-gold/[0.14]">
                    <Icon name={s.icon} size={18} strokeWidth={1.5} />
                  </div>
                  <h2 className="font-body text-lg font-semibold text-ink leading-snug">
                    {t.services.items[i].title}
                  </h2>
                </div>

                {/* Résumé */}
                <p className="font-body text-sm text-muted leading-relaxed">
                  {t.services.items[i].shortDesc}
                </p>

                {/* CTA */}
                <div className="mt-auto pt-2 border-t border-black/[0.05]">
                  <Link
                    href={`/${validLocale}/services/${s.id}`}
                    className="inline-flex items-center gap-2 font-body text-sm font-semibold text-gold hover:gap-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                  >
                    {t.services.discoverCta}
                    <Icon name="arrow" size={14} strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ── Promesse ─────────────────────────── */}
      <Section bg="stone" slant="left" slantFill={BG.cream}>
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
