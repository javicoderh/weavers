import { workshopiaPath } from '../features/projects/catalog'
import { services } from '../features/services/catalog'

export const publicPaths = ['/', '/about', workshopiaPath, ...services.map(({ slug }) => '/' + slug)]
export const languages = ['es', 'en']

export function languageFromPath(pathname) {
  return /^\/en(?:\/|$)/.test(pathname) ? 'en' : 'es'
}

export function localizedPath(path, language) {
  return language === 'en' ? (path === '/' ? '/en' : '/en' + path) : path
}
