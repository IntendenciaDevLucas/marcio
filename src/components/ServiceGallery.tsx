import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { asset } from '../config/company'
import type { ServicePhoto } from '../data/services'

export default function ServiceGallery({ photos, title }: { photos: ServicePhoto[]; title: string }) {
  const [selected, setSelected] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const photo = photos[selected]
  const change = (direction: number) => setSelected(index => (index + direction + photos.length) % photos.length)

  useEffect(() => {
    if (!expanded) return
    const element = dialog.current
    const previousOverflow = document.body.style.overflow
    element?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      element?.close()
      document.body.style.overflow = previousOverflow
    }
  }, [expanded])

  if (!photo) return null
  return <div className="service-gallery" aria-label={`Fotos: ${title}`}>
    <figure className="service-gallery__figure">
      <button type="button" className="service-gallery__open" onClick={() => setExpanded(true)} aria-label={`Ampliar foto: ${photo.caption}`}>
        <img src={asset(photo.src)} alt={photo.alt} width={1200} height={1200} decoding="async" />
        <span className="service-gallery__expand"><Expand size={16} /> Ampliar foto</span>
      </button>
      <figcaption aria-live="polite"><span>{photo.caption}</span><span>{selected + 1} / {photos.length}</span></figcaption>
    </figure>
    {photos.length > 1 && <div className="service-gallery__thumbnails" aria-label="Escolher foto">
      {photos.map((item, index) => <button key={item.src} type="button" aria-pressed={index === selected}
        aria-label={`Ver foto ${index + 1}: ${item.caption}`} onClick={() => setSelected(index)}>
        <img src={asset(item.thumbnail)} alt="" loading="lazy" width={80} height={80} />
      </button>)}
    </div>}
    <dialog ref={dialog} className="service-lightbox" aria-label={`Foto ampliada: ${title}`} onClose={() => setExpanded(false)}
      onClick={event => { if (event.target === event.currentTarget) setExpanded(false) }}
      onKeyDown={event => {
        if (event.key === 'ArrowRight') { event.preventDefault(); change(1) }
        if (event.key === 'ArrowLeft') { event.preventDefault(); change(-1) }
      }}>
      <div className="service-lightbox__content">
        <button type="button" className="service-lightbox__close" onClick={() => setExpanded(false)} aria-label="Fechar foto ampliada"><X /></button>
        {expanded && <img src={asset(photo.src)} alt={photo.alt} />}
        <div className="service-lightbox__footer">
          {photos.length > 1 && <button type="button" onClick={() => change(-1)} aria-label="Foto anterior"><ChevronLeft /></button>}
          <p aria-live="polite">{photo.caption}<span>{selected + 1} / {photos.length}</span></p>
          {photos.length > 1 && <button type="button" onClick={() => change(1)} aria-label="Próxima foto"><ChevronRight /></button>}
        </div>
      </div>
    </dialog>
  </div>
}
