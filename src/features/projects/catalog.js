import penguinCampaignCover from './esmasqueunpinguino-cover.webp'
import nicolasZamaraCover from './nicolaszamara-cover.webp'
import salvemosQuirillucaCover from './salvemosquirilluca-cover.webp'
import workshopiaCover from './workshopia-cover.webp'

export const workshopiaPath = '/trabajos/workshopia'

// Display order follows this array. Each type matches a service slug.
// Localized copy lives under projects.<id>.
export const projects = [
  {
    id: 'esmasqueunpinguino',
    types: ['pagina-web'],
    url: 'https://www.esmasqueunpinguino.cl/',
    image: penguinCampaignCover,
  },
  {
    id: 'nicolaszamara',
    types: ['pagina-web', 'chatbots'],
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
    id: 'workshopia',
    types: ['sistemas-agenticos'],
    url: workshopiaPath,
    image: workshopiaCover,
  },
]
