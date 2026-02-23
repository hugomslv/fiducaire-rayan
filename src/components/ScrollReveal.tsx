'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  /** Délai entre chaque enfant (secondes). Défaut : 0.08 */
  stagger?: number
  /** Distance de départ verticale (px). Défaut : 24 */
  distance?: number
  /** Durée de l'animation (secondes). Défaut : 0.75 */
  duration?: number
}

/**
 * Révèle les enfants directs au scroll avec un stagger GSAP.
 * Utilise autoAlpha (opacity + visibility) pour éviter les flash SSR.
 * gsap.context() garantit le cleanup complet des tweens à la navigation.
 */
export function ScrollReveal({
  children,
  className,
  stagger = 0.08,
  distance = 24,
  duration = 0.75,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const items = Array.from(container.children) as HTMLElement[]
    let observer: IntersectionObserver

    // gsap.context() trace tous les tweens créés ici pour un revert() propre
    const ctx = gsap.context(() => {
      gsap.set(items, { autoAlpha: 0, y: distance })

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return

          gsap.to(items, {
            autoAlpha: 1,
            y: 0,
            duration,
            stagger,
            ease: 'power2.out',
            clearProps: 'transform',
          })

          observer.disconnect()
        },
        { threshold: 0.08 },
      )

      observer.observe(container)
    })

    return () => {
      // ctx.revert() tue tous les tweens GSAP (set + to en cours)
      ctx.revert()
      // L'observer est déconnecté séparément car hors du scope GSAP
      observer?.disconnect()
    }
  }, [stagger, distance, duration])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
