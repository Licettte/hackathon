import { Workbox } from 'workbox-window'

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js', { scope: '/' })

  wb.addEventListener('waiting', () => {
    wb.messageSW({ type: 'SKIP_WAITING' }).then(() => window.location.reload())
  })

  wb.register()
}

let deferredPrompt: any
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  deferredPrompt = e
  // expose for UI
  // @ts-ignore
  window.__deferredPrompt = deferredPrompt
  window.dispatchEvent(new CustomEvent('pwa:install-available'))
})