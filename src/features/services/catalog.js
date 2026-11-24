// Precios finales de partida en CLP. Referencias para revisar los alcances:
// Web y tiendas: https://www.milaweb.cl/
// Apps: https://www.rew.cl/servicios/desarrollo-de-aplicaciones-moviles
// Chatbots y agentes: https://www.etagency.cl/servicios/desarrollo-agentes-ia-chile
// Sistemas multiagente: https://alvaromaureira.cl/servicios-agentes-ia/
// Talleres por equipo: https://vertexb2b.cl/taller-ia-aplicada/
export const services = [
  { slug: 'e-commerce', price: 350000 },
  { slug: 'pagina-web', price: 250000 },
  { slug: 'chatbots', price: 350000 },
  { slug: 'apps', price: 1490000, launchOffer: true },
  { slug: 'juegos' },
  { slug: 'agentes', price: 890000, launchOffer: true },
  { slug: 'sistemas-agenticos' },
  { slug: 'capacitaciones-ia', price: 15000, workshop: true },
]

export function formatPrice(service, language) {
  return new Intl.NumberFormat(language === 'es' ? 'es-CL' : 'en-US', {
    style: 'currency',
    currency: 'CLP',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  }).format(service.price)
}
