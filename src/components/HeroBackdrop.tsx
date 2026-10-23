import { asset, company } from '../config/company'

export default function HeroBackdrop() {
  const src = asset(company.images.hero)
  return <div className="hero-backdrop">
    <img className="hero-backdrop__ambience" src={src} alt="" aria-hidden="true" decoding="async" />
    <img className="hero-backdrop__photo" src={src}
      alt="Márcio segurando uma chave automotiva, com o logo completo do Chaves Chaveiro"
      fetchPriority="high" decoding="async" />
  </div>
}
