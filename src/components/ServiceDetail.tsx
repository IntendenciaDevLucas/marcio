import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Check, ChevronRight, MessageCircle, Phone } from 'lucide-react'
import { company, whatsappUrl } from '../config/company'
import { services } from '../data/services'
import ServiceGallery from './ServiceGallery'

export default function ServiceDetail() {
  const { serviceId } = useParams()
  const service = services.find(item => item.enabled && item.id === serviceId)
  if (!service) return <div className="inner-page"><section className="container section">
    <h1>Serviço não encontrado</h1><Link to="/servicos" className="button orange">Ver nossos serviços</Link>
  </section></div>

  return <div className="inner-page service-detail">
    <nav className="container breadcrumb" aria-label="Caminho da página"><Link to="/">Início</Link><ChevronRight size={14} /><Link to="/servicos">Serviços</Link><ChevronRight size={14} /><span>{service.title}</span></nav>
    <section className="container service-detail__grid">
      <div className="service-detail__copy">
        <div className="eyebrow">{service.automotive ? 'CUIDADO COM O SEU VEÍCULO' : 'SEGURANÇA PARA A SUA CASA'}</div>
        <h1>{service.title}</h1>
        <p className="service-detail__intro">{service.introduction}</p>
        <h2>Como podemos ajudar</h2>
        <ul className="service-detail__offerings">{service.offerings.map(item => <li key={item}><Check size={17} /><span>{item}</span></li>)}</ul>
        <div className="service-detail__contact">
          <p>{service.note}</p>
          <div className="service-detail__actions">
            <a className="button whatsapp" href={whatsappUrl(service.title)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Solicitar orçamento <ArrowUpRight size={16} /></a>
            <a className="button outline" href={`tel:${company.phone}`}><Phone size={17} /> Ligar agora</a>
          </div>
          <span>Atendimento em Matozinhos e região.</span>
        </div>
      </div>
      <ServiceGallery key={service.id} photos={service.gallery} title={service.title} />
    </section>
    <div className="container service-detail__back"><Link className="text-link" to={service.automotive ? '/servicos?categoria=automotivo' : '/servicos?categoria=residencial'}><ArrowLeft size={17} /> Explorar outros serviços</Link></div>
  </div>
}
