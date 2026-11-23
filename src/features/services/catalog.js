// Precios finales de partida en CLP. Referencias para revisar los alcances:
// Web y tiendas: https://www.milaweb.cl/
// Apps: https://www.rew.cl/servicios/desarrollo-de-aplicaciones-moviles
// Chatbots y agentes: https://www.etagency.cl/servicios/desarrollo-agentes-ia-chile
// Sistemas multiagente: https://alvaromaureira.cl/servicios-agentes-ia/
// Talleres por equipo: https://vertexb2b.cl/taller-ia-aplicada/
export const services = [
  { slug: 'e-commerce', price: 990000 },
  { slug: 'pagina-web', price: 490000 },
  { slug: 'chatbots', price: 940000 },
  { slug: 'apps', price: 2490000 },
  { slug: 'agentes', price: 1690000 },
  { slug: 'sistemas-agenticos', price: 4990000 },
  { slug: 'capacitaciones-ia', price: 350000, workshop: true },
]

export function formatPrice(service, language) {
  return new Intl.NumberFormat(language === 'es' ? 'es-CL' : 'en-US', {
    style: 'currency',
    currency: 'CLP',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  }).format(service.price)
}
