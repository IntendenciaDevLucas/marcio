export type ServicePhoto = { src: string; thumbnail: string; alt: string; caption: string }
export type Service = {
  id: string; title: string; description: string; introduction: string;
  icon: 'car' | 'house' | 'chip' | 'key' | 'lock' | 'repair';
  image: string; imageAlt: string; imagePosition: string;
  automotive: boolean; enabled: boolean; offerings: string[];
  gallery: ServicePhoto[]; note: string;
}
const photo = (name: string, alt: string, caption: string): ServicePhoto => ({
  src: `images/services/${name}.webp`, thumbnail: `images/services/${name}-thumb.webp`, alt, caption,
})
// Conteúdo confirmado nos textos da pasta LUCAS, enviados em outubro/2026.
export const services: Service[] = [
  {
    id: 'canivete', title: 'Chaves canivete', icon: 'key', automotive: true, enabled: true,
    description: 'Programação de chaves canivete para veículos nacionais e importados.',
    introduction: 'Mais praticidade na chave que acompanha você. Trabalhamos com programação de chaves canivete multimarcas para veículos com chave comum, alarme original de fábrica ou alarme instalado.',
    image: 'images/services/canivete-fiat-thumb.webp', imageAlt: 'Chaves canivete de um Fiat atendido pela empresa', imagePosition: 'center 66%',
    offerings: ['Programação de chaves canivete', 'Veículos com chave comum', 'Veículos com alarme original ou instalado', 'Atendimento multimarcas: nacionais e importados'],
    gallery: [photo('canivete-fiat', 'Duas chaves canivete em frente a um Fiat', 'Chaves canivete · Fiat'), photo('canivete-ford', 'Chaves canivete em frente a um Ford', 'Chaves canivete · Ford'), photo('canivete-kwid', 'Chave canivete em frente a um Renault Kwid', 'Chave canivete · Renault Kwid'), photo('canivete-renault', 'Chave comum e chave canivete em frente a um Renault', 'Chave comum e chave canivete · Renault'), photo('chaves-apresentacao', 'Imagem de divulgação com modelos de chaves automotivas', 'Imagem ilustrativa enviada pela empresa')],
    note: 'Informe a marca, o modelo e o ano do veículo para consultar a compatibilidade e solicitar seu orçamento.',
  },
  {
    id: 'residencial', title: 'Residencial', icon: 'house', automotive: false, enabled: true,
    description: 'Fechaduras, chaves e controles para a segurança da sua casa.',
    introduction: 'Da instalação de uma fechadura ao socorro residencial, cuidamos do acesso à sua casa. Também instalamos fechaduras digitais e programamos controles de portão.',
    image: 'images/services/residencial-fechadura-thumb.webp', imageAlt: 'Instalação de uma fechadura em porta de madeira', imagePosition: 'center 52%',
    offerings: ['Instalação de fechaduras e troca de segredo', 'Instalação de fechaduras digitais e tetra', 'Fechaduras para portas de vidro e de aço', 'Unificação de cadeados', 'Programação de controles de portão', 'Socorro residencial'],
    gallery: [photo('residencial-fechadura', 'Profissional posicionando uma fechadura em uma porta de madeira', 'Instalação de fechadura · registro do atendimento'), photo('residencial-preparacao', 'Ferramenta posicionada para instalação de fechadura em uma porta', 'Preparação da porta para instalação'), photo('residencial-instalacao', 'Ferramentas de instalação em porta de madeira', 'Instalação em andamento'), photo('fechadura-referencia', 'Modelo de fechadura convencional em uma porta', 'Referência de fechadura enviada pela empresa'), photo('fechadura-antes-depois', 'Montagem de antes e depois de uma fechadura', 'Antes e depois · imagem enviada pela empresa')],
    note: 'Envie uma foto da porta ou fechadura e conte o que você precisa. Em caso de urgência, entre em contato pelo telefone ou WhatsApp.',
  },
  {
    id: 'reparos', title: 'Reparos automotivos', icon: 'repair', automotive: true, enabled: true,
    description: 'Reparos em ignição, fechaduras e imobilizadores.',
    introduction: 'A chave não gira ou a fechadura precisa de reparo? Atendemos sistemas de ignição, fechaduras e imobilizadores, com programação de transponder e unificação de chaves.',
    image: 'images/services/ignicao-depois-thumb.webp', imageAlt: 'Chave e ignição após o reparo', imagePosition: 'center 46%',
    offerings: ['Reparo em ignição', 'Reparo em fechaduras automotivas', 'Reparo em imobilizador', 'Programação de transponder', 'Unificação de chaves', 'Reset e decode de centrais'],
    gallery: [photo('ignicao-antes', 'Conjunto de ignição desmontado antes do reparo', 'Antes · conjunto de ignição'), photo('ignicao-depois', 'Ignição montada com a chave após o reparo', 'Depois · conjunto de ignição'), photo('reparo-punto', 'Montagem de antes e depois da ignição de um Punto 2010', 'Antes e depois · Punto 2010')],
    note: 'Descreva o problema e informe marca, modelo e ano. Nossa equipe orienta sobre a avaliação e o orçamento.',
  },
  {
    id: 'presenca', title: 'Chaves de presença', icon: 'car', automotive: true, enabled: true,
    description: 'Programação de chaves para veículos com sistema Start Stop.',
    introduction: 'Atendemos também veículos com chave de presença e sistema Start Stop. Consulte a programação para o seu modelo e a compatibilidade com o alarme original ou instalado.',
    image: 'images/services/presenca-jeep-thumb.webp', imageAlt: 'Chaves de presença em frente a um Jeep', imagePosition: 'center 65%',
    offerings: ['Programação de chaves de presença', 'Veículos com sistema Start Stop', 'Consulta de compatibilidade por modelo'],
    gallery: [photo('presenca-jeep', 'Duas chaves de presença em frente a um Jeep', 'Chaves de presença · Jeep'), photo('chaves-apresentacao', 'Modelos de chaves em uma imagem de divulgação', 'Imagem ilustrativa enviada pela empresa')],
    note: 'Informe a marca, o modelo e o ano do veículo. A disponibilidade é confirmada pela equipe antes do atendimento.',
  },
  {
    id: 'centrais', title: 'Reset e decode de centrais', icon: 'chip', automotive: true, enabled: true,
    description: 'Atendimento em centrais eletrônicas da linha leve.',
    introduction: 'Realizamos reset e decode de centrais da linha leve. Conte o que está acontecendo com o veículo para receber orientação sobre a avaliação do serviço.',
    image: 'images/services/bancada-centrais-thumb.webp', imageAlt: 'Bancada de eletrônica com central e equipamentos da empresa', imagePosition: 'center',
    offerings: ['Reset de centrais da linha leve', 'Decode de centrais da linha leve', 'Avaliação conforme a central e o veículo'],
    gallery: [photo('bancada-centrais', 'Bancada de trabalho com central automotiva e equipamentos', 'Bancada de eletrônica automotiva'), photo('reparo-placa', 'Trabalho em uma placa eletrônica na bancada', 'Registro de trabalho na bancada')],
    note: 'Envie os dados do veículo e, se possível, uma foto da identificação da central para a equipe avaliar o atendimento.',
  },
  {
    id: 'paineis', title: 'Painéis e controles', icon: 'repair', automotive: true, enabled: true,
    description: 'Pequenos reparos em painéis e controles de alarme.',
    introduction: 'Cuidamos de pequenos reparos em painéis automotivos e controles de alarme. Os serviços incluem troca de LED, reparo de trilhas rompidas e troca de cabo flat.',
    image: 'images/services/painel-bancada-thumb.webp', imageAlt: 'Painel automotivo ligado na bancada de testes', imagePosition: 'center 52%',
    offerings: ['Pequenos reparos em painéis', 'Troca de LED', 'Reparo de trilhas rompidas', 'Troca de cabo flat', 'Reparo em controles de alarme'],
    gallery: [photo('painel-bancada', 'Painel de instrumentos conectado aos equipamentos de bancada', 'Painel automotivo na bancada')],
    note: 'Conte o defeito percebido e envie uma foto do painel ou controle. A equipe confirma as possibilidades de reparo.',
  },
]
