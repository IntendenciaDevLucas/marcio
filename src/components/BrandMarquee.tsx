import { useId, useState } from 'react'
import type { CSSProperties } from 'react'
import { brands } from '../data/brands'
import { asset } from '../config/company'
import './BrandMarquee.css'

function BrandLogo({ name, logo }: (typeof brands)[number]) {
  const [unavailable, setUnavailable] = useState(false)
  return unavailable ? <span className="brand-marquee__fallback">{name}</span> : (
    <img src={asset(logo)} alt={name} width={104} height={44}
      decoding="async" onError={() => setUnavailable(true)} />
  )
}

export default function BrandMarquee() {
  const titleId = useId()
  if (!brands.length) return null

  return (
    <section className="brand-marquee" aria-labelledby={titleId}
      style={{ '--brand-count': brands.length } as CSSProperties}>
      <div className="container">
        <div className="brand-marquee__heading">
          <h2 id={titleId}>MARCAS QUE ATENDEMOS</h2>
        </div>
        <div className="brand-marquee__viewport" tabIndex={0}
          role="region" aria-label="Marcas automotivas atendidas">
          <div className="brand-marquee__track">
            {/* Grupos idênticos e sem gap: -50% corresponde exatamente a um ciclo. */}
            {[false, true].map(duplicate => (
              <ul className="brand-marquee__group" key={String(duplicate)}
                aria-hidden={duplicate ? true : undefined}>
                {brands.map(brand => (
                  <li className="brand-marquee__item" key={brand.name}>
                    <BrandLogo {...brand} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
