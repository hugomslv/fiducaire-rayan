# PROJECT_UPDATES

## 2026-02-19 — Refactor Hero Overlay (premium multi-couche)

### Résumé
Remplacement de l'overlay hero plat (`.hero-building-fade` + `.hero-glow`) par un système unifié propre, reposant sur des tokens CSS.

### Fichiers modifiés
| Fichier | Changement |
|---------|-----------|
| `src/app/globals.css` | Ajout de `--primary-950-rgb` et `--primary-900-rgb` dans `:root`. Suppression de `.hero-building-fade` et `.hero-glow`. Remplacement par `.hero-overlay` (gradient multi-stop + radiale focale) et `.hero-bottom-fade` mis à jour avec `var()`. |
| `src/app/[locale]/page.tsx` | L3 renommée `.hero-overlay`, div L4 `.hero-glow` supprimée. |

### Architecture `.hero-overlay`
```css
/* Desktop : horizontal */
background:
  radial-gradient(ellipse 52% 75% at 16% 55%, primary-900@26%, transparent),
  linear-gradient(90deg, primary-950@95% → @90% → @75% → @40% → @10% → 0%);

/* Mobile : vertical */
background: linear-gradient(180deg, primary-950@72% → @58% → @72%);
```

---

## 2026-02-19 — Mise à jour des coordonnées officielles SRD Partners

### Résumé
Centralisation et mise à jour de toutes les coordonnées de contact selon les infos officielles confirmées.

### Infos appliquées
- **Contact principal :** Cremilde Hirschi — Administration · Finance · RH
- **Email :** cremilde.hirschi@srdpartners.ch
- **Téléphone :** +41 32 857 24 19
- **Adresse :** Les Vernets 2, 2035 Corcelles NE, Suisse
- **Site :** https://www.srdpartners.ch

### Fichiers modifiés

| Fichier | Changement |
|---------|-----------|
| `src/lib/siteData.ts` | Mise à jour de `contactInfo` : nouvel email, téléphone, site web, adresse unique (Corcelles NE). Ajout de `contact` (nom) et `role`. Suppression du bureau Lausanne. |
| `src/app/[locale]/layout.tsx` | Import de `contactInfo`. `metadataBase` pointe sur `contactInfo.website`. Ajout d'un bloc JSON-LD `AccountingService` (schema.org) avec adresse + téléphone + email + url. |
| `src/messages/fr.json` | Suppression de `contact.lausanneOfficeLabel`. Mise à jour de `footer.tagline`, `meta.homeTitle`, `meta.homeDescription`, `meta.contactDescription`. |
| `src/messages/en.json` | Idem + `brand.legal` aligné sur "SRD Partners Sàrl" + `meta.contactTitle` corrigé. |
| `src/messages/pt.json` | Idem. |
| `src/components/Footer.tsx` | `addressLabels` réduit à `[t.contact.mainOfficeLabel]` (1 seul bureau). |
| `src/app/[locale]/contact/page.tsx` | `addressLabels` réduit à `[t.contact.mainOfficeLabel]`. |

### Variables exportées (`siteData.ts`)

```ts
contactInfo.contact   // 'Cremilde Hirschi'
contactInfo.role      // 'Administration · Finance · RH'
contactInfo.email     // 'cremilde.hirschi@srdpartners.ch'
contactInfo.phone     // '+41 32 857 24 19'  (display)
contactInfo.website   // 'https://www.srdpartners.ch'
contactInfo.addresses[0].street  // 'Les Vernets 2'
contactInfo.addresses[0].city    // '2035 Corcelles NE'
```

> `href tel:` → utiliser `contactInfo.phone.replace(/\s/g, '')` → `+41328572419`

### Notes
- `contact.lausanneOfficeLabel` supprimé des 3 fichiers JSON et du code (clé inutilisée).
- Le JSON-LD est injecté une seule fois dans `[locale]/layout.tsx` (toutes les pages le reçoivent).
- TypeScript strict : `npx tsc --noEmit` → 0 erreur.
