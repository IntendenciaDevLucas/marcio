import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react'
import { asset, whatsappUrl } from '../config/company'
import type { Service } from '../data/services'

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return <article className="service-card service-card--photo">
    <Link to={`/servicos/${service.id}`} className="service-card__details" aria-label={`Ver detalhes e fotos: ${service.title}`}>
      <div className="service-visual">
        <img src={asset(service.image)} alt={service.imageAlt} loading="lazy" decoding="async"
          width={640} height={480} style={{ objectPosition: service.imagePosition }} />
        <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="service-category">{service.automotive ? 'AUTOMOTIVO' : 'SUA CASA'}</span>
      </div>
      <div className="service-content">
        <div className="service-title"><h3>{service.title}</h3><ArrowUpRight size={23} /></div>
        <p>{service.description}</p>
        <span className="service-discover">Ver detalhes e fotos <ArrowRight size={15} /></span>
      </div>
    </Link>
    <a className="service-card__quote" href={whatsappUrl(service.title)} target="_blank" rel="noopener noreferrer"
      aria-label={`Solicitar orçamento: ${service.title}`}><MessageCircle size={15} /> Solicitar orçamento <ArrowUpRight size={15} /></a>
  </article>
}
