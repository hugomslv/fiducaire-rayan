import Image from 'next/image'
import Link from 'next/link'
import { type Locale, type Messages } from '@/lib/i18n'
import { services, contactInfo, socials } from '@/lib/siteData'
import { Icon } from '@/lib/icons'

interface FooterProps {
  locale: Locale
  t: Messages
  navItems: Array<{ label: string; href: string }>
  /** Conservé pour compatibilité — non utilisé depuis le passage fond blanc. */
  slantFill?: string
}

export function Footer({ locale, t, navItems }: FooterProps) {
  const year = new Date().getFullYear()
  const addressLabels = [t.contact.mainOfficeLabel]

  return (
    <footer className="bg-white border-t border-black/[0.07]">
      <div className="container-main pt-16 sm:pt-20 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-black/[0.07]">

          {/* Colonne 1 — Brand */}
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="inline-flex mb-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg"
              aria-label={t.brand.legal}
            >
              <div className="transition-opacity duration-200 group-hover:opacity-80">
                <Image
                  src="/logo.png"
                  alt={t.brand.legal}
                  width={900}
                  height={600}
                  className="h-12 w-auto"
                />
              </div>
            </Link>
            <p className="font-body text-xs text-muted/70 tracking-wide mb-4">
              {t.footer.signature}
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex items-center justify-center w-8 h-8 rounded text-muted border border-black/[0.08] hover:text-navy hover:border-black/[0.18] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon name="linkedin" size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 — Navigation */}
          <div>
            <h3 className="font-body text-xs font-semibold text-black/30 tracking-[0.18em] uppercase mb-5">
              {t.footer.navigation}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body text-sm text-muted hover:text-gold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Services */}
          <div>
            <h3 className="font-body text-xs font-semibold text-black/30 tracking-[0.18em] uppercase mb-5">
              {t.footer.services}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {services.map((s, i) => (
                <li key={s.id}>
                  <Link
                    href={`/${locale}/services/${s.id}`}
                    className="font-body text-sm text-muted hover:text-gold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                  >
                    {t.services.items[i].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 — Contact */}
          <div>
            <h3 className="font-body text-xs font-semibold text-black/30 tracking-[0.18em] uppercase mb-5">
              {t.footer.contact}
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Icon name="mail" size={14} className="text-gold mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="font-body text-sm text-muted hover:text-gold transition-colors duration-200"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="phone" size={14} className="text-gold mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="font-body text-sm text-muted hover:text-gold transition-colors duration-200"
                >
                  {contactInfo.phone}
                </a>
              </li>
              {contactInfo.addresses.map((addr, i) => (
                <li key={addr.id} className="flex items-start gap-3">
                  <Icon name="mappin" size={14} className="text-gold mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-body text-xs text-black/30 mb-0.5">{addressLabels[i]}</p>
                    <p className="font-body text-sm text-muted">{addr.street}</p>
                    <p className="font-body text-sm text-muted">{addr.city}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Barre basse */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-7">
          <p className="font-body text-xs text-black/30">
            &copy; {year} {t.brand.legal}. {t.footer.rights}
          </p>
          <p className="font-body text-xs text-black/25">{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
