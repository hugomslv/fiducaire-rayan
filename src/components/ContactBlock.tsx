'use client'

import { Section } from './Section'
import { ContactForm } from './ContactForm'
import type { Messages } from '@/lib/i18n'

interface ContactBlockProps {
  bg?: 'cream' | 'stone'
  slant?: 'left' | 'right' | false
  slantFill?: string
  t: Messages['contact']['form']
}

export function ContactBlock({ bg = 'stone', slant = false, slantFill, t }: ContactBlockProps) {
  return (
    <Section id="contact" bg={bg} slant={slant} slantFill={slantFill}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label">{t.overline}</span>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-subtitle mx-auto text-center mt-4">{t.subtitle}</p>
          <p className="font-body text-[10.5px] tracking-[0.10em] uppercase text-muted/50 mt-4">
            {t.trustLine}
          </p>
        </div>
        <ContactForm t={t} variant="premium" />
      </div>
    </Section>
  )
}
