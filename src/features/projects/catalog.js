import penguinCampaignCover from './esmasqueunpinguino-cover.webp'
import nicolasZamaraCover from './nicolaszamara-cover.webp'
import salvemosQuirillucaCover from './salvemosquirilluca-cover.webp'
import workshopiaCover from './workshopia-cover.webp'
import lotusEmberCover from './lotus-ember-cover.webp'
import baristaCover from './barista-cover.webp'
import casaMielCover from './casa-miel-cover.webp'
import devStashCover from './dev-stash-cover.webp'
import experimentalCover from './diseno-experimental-cover.webp'

export const workshopiaPath = '/trabajos/workshopia'

// Display order follows this array. Each type matches a service slug.
// Localized copy lives under projects.<id>.
export const projects = [
  {
    id: 'lotus-ember',
    types: ['juegos'],
    action: 'demo',
    url: 'https://escenario1.vercel.app/',
    image: lotusEmberCover,
  },
  {
    id: 'workshopia',
    types: ['agentes', 'sistemas-agenticos'],
    action: 'case',
    url: workshopiaPath,
    image: workshopiaCover,
  },
  {
    id: 'diseno-experimental',
    types: ['pagina-web'],
    url: 'https://portafolio-2026-alpha.vercel.app/experimental',
    image: experimentalCover,
  },
  {
    id: 'esmasqueunpinguino',
    types: ['pagina-web'],
    url: 'https://www.esmasqueunpinguino.cl/',
    image: penguinCampaignCover,
  },
  {
    id: 'nicolaszamara',
    types: ['pagina-web', 'chatbots', 'e-commerce'],
    url: 'https://www.nicolaszamara.com/',
    image: nicolasZamaraCover,
  },
  {
    id: 'salvemosquirilluca',
    types: ['pagina-web'],
    url: 'https://salvemosquirilluca.vercel.app/',
    image: salvemosQuirillucaCover,
  },
  {
    id: 'alma-de-barista',
    types: ['pagina-web'],
    url: 'https://cofee-nu-pearl.vercel.app/#/recetas',
    image: baristaCover,
  },
  {
    id: 'casa-miel',
    types: ['pagina-web', 'e-commerce'],
    url: 'https://honey-theta-five.vercel.app/',
    image: casaMielCover,
  },
  {
    id: 'dev-stash',
    types: ['pagina-web', 'agentes'],
    url: 'https://dev-stash-routine.vercel.app/',
    image: devStashCover,
  },
]
