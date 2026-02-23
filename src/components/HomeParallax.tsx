'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Parallax effects for the Home page.
 * Renders null — purely behavioral (no DOM output).
 *
 * Effects applied via data attributes on static server-rendered elements:
 *   [data-parallax="hero-img"]  → hero building image drifts upward on scroll
 *
 * Automatically disabled when prefers-reduced-motion: reduce is set.
 */
export function HomeParallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // ── Hero image — slow upward drift as user scrolls out ──────────────
      const heroImg = document.querySelector<HTMLElement>('[data-parallax="hero-img"]')
      if (heroImg) {
        gsap.set(heroImg, { scale: 1.08, transformOrigin: 'center center' })
        gsap.to(heroImg, {
          y: -32,
          ease: 'none',
          scrollTrigger: {
            trigger: document.querySelector('[data-section="hero"]'),
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return null
}
