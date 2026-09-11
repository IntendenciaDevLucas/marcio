export const company = {
  name: 'Chaves Chaveiro', city: 'Matozinhos', state: 'MG',
  phone: '+5531986510530', phoneDisplay: '(31) 98651-0530', whatsapp: '5531986510530',
  instagram: '@chaveschaveiromtz',
  address: { street: 'R. Dona Balá, 49', neighborhood: 'Floresta', city: 'Matozinhos', state: 'MG', zipCode: '35720-000' },
  googleRating: 4.9, googleReviews: 200, experience: 'Quase uma década',
  businessClosingTime: '17:30', emergencyContact: true,
  serviceArea: ['Matozinhos', 'Prudente de Morais', 'Pedro Leopoldo', 'Capim Branco', 'Região'],
  // Inserir o link direto do perfil quando fornecido. Não inventar place_id.
  googleReviewsUrl: '',
  images: { logo: 'images/brand/logo.png', hero: 'images/hero/marcio.png', about: 'images/about/casal.png', automotive: 'images/services/automotivo.webp' },
}
const address = `${company.name}, ${company.address.street}, ${company.address.city}, ${company.state}`
export const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
export const reviewsUrl = company.googleReviewsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
export const whatsappUrl = (service?: string) => `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(service ? `Olá! Vim pelo site do Chaves Chaveiro e gostaria de solicitar um orçamento para ${service}.` : 'Olá! Vim pelo site do Chaves Chaveiro e preciso de atendimento.')}`
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
