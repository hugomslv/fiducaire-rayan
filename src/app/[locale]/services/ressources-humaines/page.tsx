import type { Metadata } from 'next'
import { getMessages, isValidLocale, defaultLocale, type Locale } from '@/lib/i18n'
import { ServicePage } from '@/components/ServicePage'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getMessages(isValidLocale(locale) ? locale : defaultLocale)
  return {
    title: t.meta.rhTitle,
    description: t.meta.rhDescription,
    openGraph: { title: t.meta.rhTitle, description: t.meta.rhDescription },
  }
}

export default async function RessourcesHumainesPage({
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

  return <ServicePage locale={validLocale} t={t} serviceIndex={1} navItems={navItems} />
}
