export type Service = { id: string; title: string; description: string; icon: 'car' | 'house' | 'chip' | 'key' | 'lock' | 'repair'; image: string; automotive: boolean; enabled: boolean }
export const services: Service[] = [
  {id:'automotivo',title:'Automotivo',description:'Cuidado e soluções para as chaves do seu carro.',icon:'car',image:'images/services/automotivo.webp',automotive:true,enabled:true},
  {id:'residencial',title:'Residencial',description:'Mais tranquilidade para entrar e sair de casa.',icon:'house',image:'images/services/residencial.webp',automotive:false,enabled:true},
  {id:'codificadas',title:'Chaves codificadas',description:'Tecnologia e atenção em cada chave.',icon:'chip',image:'images/services/codificadas.webp',automotive:true,enabled:true},
  {id:'canivete',title:'Chave canivete',description:'Praticidade que acompanha você.',icon:'key',image:'images/services/canivete.webp',automotive:true,enabled:true},
  {id:'digitais',title:'Fechaduras digitais',description:'Converse com a gente sobre sua necessidade.',icon:'lock',image:'images/services/digitais.webp',automotive:false,enabled:true},
  {id:'reparos',title:'Reparos automotivos',description:'Consulte a disponibilidade para o seu veículo.',icon:'repair',image:'images/services/reparos.webp',automotive:true,enabled:true},
  // Em validação: habilitar somente após confirmação dos serviços pela empresa.
  {id:'paineis',title:'Reparo em painéis',description:'Consulte nossa equipe.',icon:'repair',image:'images/services/paineis.webp',automotive:true,enabled:false},
]
